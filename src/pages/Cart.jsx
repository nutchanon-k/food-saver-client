import { ChevronLeft, Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import useUserStore from '../stores/userStore';
import useCartStore from '../stores/cartStore';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate()
    const getCartData = useCartStore((state) => state.getCartData)
    const ChangeQuantityItem = useCartStore((state) => state.ChangeQuantityItem)
    const DeleteCartItem = useCartStore((state) => state.DeleteCartItem)
    const token = useUserStore((state) => state.token)
    const [resultGetCartData, setResultGetCartData] = useState([])



    // const [durationCart, setDurationCart] = useState(2)
    // const [showTime, setShowTime] = useState('5:00')



    // const formatTime = (seconds) => {
    //     const min = Math.floor(seconds / 60)
    //     const sec = seconds % 60
    //     return `${min}:${sec < 10 ? '0' : ''}${sec}`
    // }




    // const timeToDeleteCart = async () => {
    //     try {
    //         if (resultGetCartData?.data?.length > 0) {
    //             for (const item of resultGetCartData.data) {
    //                 await DeleteCartItem(item.id);
    //             }
    //             await CurrentCart(token); // รอให้ CurrentCart ทำงานเสร็จก่อน
    //             alert('คุณไม่ได้ทำรายการในเวลาที่กำหนด(5:00) โปรดทำรายการอีกครั้ง');
    //             setResultGetCartData({ data: [] });

    //         }
    //     } catch (err) {
    //         console.error('Error clearing cart:', err);
    //         alert('Failed to clear cart');
    //     }
    // }

    // const countDownCart = () => {
    //     const intervalId = setInterval(() => {
    //         setDurationCart(prevTime => {
    //             const newTime = prevTime <= 1 ? 0 : prevTime - 1
    //             setShowTime(formatTime(newTime))
    //             console.log('เวลาที่เหลือ:', newTime)
    //             if (prevTime <= 1) {
    //                 clearInterval(intervalId)
    //             }
    //             return newTime
    //         })
    //     }, 1000)

    //     return intervalId
    // }

    // useEffect คงเดิม แต่เพิ่มการ clear interval
    useEffect(() => {
        CurrentCart(token)
        // const intervalId = countDownCart() // เก็บ intervalId ที่ได้จาก countDownCart
        // return () => {
        //     clearInterval(intervalId) // clear interval เมื่อ component unmount
        // }
    }, [])



    // useEffect(() => {
    //     if (durationCart === 0) {
    //         timeToDeleteCart();

    //     }
    // }, [durationCart]);









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
        CurrentCart(token)
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
        calculateTotals()
        setDurationCart(300)


    }

    const hdlDeleteCartItem = async (itemId) => {
        try {
            await DeleteCartItem(itemId);
            // ดึงข้อมูลใหม่หลังลบสินค้า
            const newCart = await getCartData(token);
            if(newCart){
                setResultGetCartData(newCart);

            }else{
                setResultGetCartData({data:[]})
            }
        } catch (err) {
            console.error("Error deleting item:", err);
        }
    };

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
            <div className="border-b">
                <div className="px-4 py-4 flex items-center">

                    <h1 className="text-xl font-medium flex-1 text-center mr-8">Cart</h1>
                    <div className="flex flex-col items-center mr-8">
                        {/* <h1 className="text-xl font-medium text-center">{showTime}</h1> */}
                        {/* <p className="text-sm text-red-500">กรุณาชำระเงินก่อนเวลาที่กำหนด</p> */}
                    </div>
                </div>
                <div className="px-4 py-2 bg-yellow-50">
                    <p className="text-sm text-yellow-700 text-center">
                        ⏰ กรุณาทำรายการให้เสร็จสิ้นภายในเวลาที่กำหนด
                    </p>
                </div>
            </div>

            {/* Cart Item */}
            {(!resultGetCartData?.data || resultGetCartData.data.length === 0) ? (
                <div className="text-center py-8">
                    <p className="text-gray-500">ไม่มีสินค้าในตะกร้า</p>
                </div>
            ) : (resultGetCartData?.data?.map((item, index) => {
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
            }))}

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
                <button className="w-full bg-green-500 text-white py-3 rounded-lg font-medium"
                    onClick={() => navigate('/order')}
                >
                    Payment
                </button>
            </div>
        </div>
    )
}

export default Cart