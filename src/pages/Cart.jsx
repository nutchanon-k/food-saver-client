import { ChevronLeft, Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import useUserStore from '../stores/userStore';
import useCartStore from '../stores/cartStore';

const Cart = () => {
    const getCartData = useCartStore((state) => state.getCartData)
    const ChangeQuantityItem = useCartStore((state) => state.ChangeQuantityItem)
    const DeleteCartItem = useCartStore((state) => state.DeleteCartItem)
    const token = useUserStore((state) => state.token)
    const [resultGetCartData, setResultGetCartData] = useState([])


    // const [newCartItem , setNewCartItem ] = useState(300000)
    // let countdownTime = 300
    // const countDownCart = () => {

    //     setInterval(()=>{
    //         countdownTime
    //         console.log(countdownTime)
    //         clearInterval()
            
            
    //     },1000)
        
    // }
    // const timeToDeleteCart = () => {
    //     setTimeout(()=>{
            
    //     },300000)
    // }


    useEffect(() => {
        CurrentCart(token)
        // timeToDeleteCart()
        // countDownCart()
        


    }, [])

    
      

    


    useEffect(() => {
        console.log(resultGetCartData)


    }, [resultGetCartData])

    const CurrentCart = async (token) => {
        try {
            console.log('Fetching cart data...')
            const response = await getCartData(token)
            console.log('API Response:', response) // เช็คข้อมูลที่ได้จาก API

            if (response) {
                setResultGetCartData(response) // เก็บข้อมูลทั้ง object
                console.log('Data set to state:', response)
            }
        } catch (err) {
            console.error('Error fetching cart:', err)
        }
    }
    const DecreaseCartItem = async (itemId, quantity) => {

        if (quantity > 0) {
            quantity = quantity - 1
        }
        // console.log(itemId)
        // console.log(quantity)

        const result = await ChangeQuantityItem(itemId, quantity)
        console.log('cartItem decrease', result)
        CurrentCart()
        calculateTotals()

    }
    const IncreaseCartItem = async (itemId, quantity, storeQuantity) => {
        if (quantity <= storeQuantity - 1) {

            quantity = quantity + 1
        }
        console.log(itemId)
        console.log(quantity)

        const result = await ChangeQuantityItem(itemId, quantity)
        console.log('cartItem Inecrease', result)
        CurrentCart()
        calculateTotals()


    }

    const hdlDeleteCartItem = async (itemId) => {
        console.log(itemId)
        const result = await DeleteCartItem(itemId)
        console.log('deleteSuccess ', result)
        CurrentCart()
        calculateTotals()

    }



    const calculateTotals = () => {
        const originalTotal = resultGetCartData.data?.reduce((sum, item) => {
            return sum + (item.product.originalPrice * item.quantity);
        }, 0);

        const discount = resultGetCartData.data?.reduce((sum, item) => {
            return sum + ((item.product.originalPrice * item.quantity) - (item.product.salePrice * item.quantity))
        }, 0); // สมมติว่าส่วนลดคงที่ 100 บาท
        const finalTotal = resultGetCartData.data?.reduce((sum, item) => {
            return sum + (item.product.salePrice * item.quantity)
        }, 0)
        return {
            original: originalTotal,
            discount: discount,
            final: finalTotal
        };
    };

    const totals = calculateTotals();




    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="px-4 py-4 flex items-center border-b">
                <button className="p-2">
                    <ChevronLeft className="w-6 h-6 text-gray-600" />
                </button>
                <h1 className="text-xl font-medium flex-1 text-center mr-8">Cart</h1>
            </div>

            {/* Cart Item */}
            {resultGetCartData?.data?.map((item, index) => {
                return <div key={item.id} className="flex items-center space-x-4 border-b pb-4 px-4">
                    {/* Food Image */}
                    <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-20 h-20 rounded-lg object-cover"
                    />

                    {/* Food Details */}
                    <div className="flex-1">
                        <div className="flex justify-between items-start gap-2">
                            <div className="flex-1">
                                <h3 className="text-lg font-medium">{item.product.name}</h3>
                            </div>
                            <div className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-50 border border-yellow-200 rounded-md">
                                <span className="text-yellow-700 text-sm">เหลือ</span>
                                <span className="text-yellow-600 font-bold">{item.product.quantity}</span>
                                <span className="text-yellow-700 text-sm">ชิ้น</span>
                            </div>
                            <button 
                                onClick={() => hdlDeleteCartItem(item.id)}
                                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                            >
                                <Trash className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-gray-500 text-sm">{item.product.description}</p>

                        {/* Price */}
                        <div className="mt-1">
                            <span className="text-green-500">{item.product.salePrice} ฿</span>
                            <span className="text-gray-400 line-through ml-2">
                                {item.product.originalPrice} ฿
                            </span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center mt-2">
                            <button
                                onClick={() => DecreaseCartItem(item.id, item.quantity)}
                                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full"
                            >
                                -
                            </button>
                            <span className="mx-4 min-w-[2rem] text-center">
                                {item.quantity}
                            </span>
                            <button
                                onClick={() => IncreaseCartItem(item.id, item.quantity, item.product.quantity)}
                                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
            })}

            {/* Total Price Summary */}
            <div className="bg-white border-t p-4 mt-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">ราคารวม:</span>
                    <span className="text-lg font-semibold text-green-500">{totals.original} ฿</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">ส่วนลด:</span>
                    <span className="text-lg font-semibold text-red-500">{totals.discount} ฿</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-gray-800 font-medium">ยอดชำระเงินทั้งหมด:</span>
                    <span className="text-xl font-bold text-green-500">{totals.final} ฿</span>
                </div>
            </div>

            {/* Payment Button */}
            <div className="p-4">
                <button className="w-full bg-green-500 text-white py-3 rounded-lg font-medium">
                    Payment
                </button>
            </div>
        </div>
    )
}

export default Cart