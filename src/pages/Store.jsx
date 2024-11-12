import { ChevronRight, Clock, Heart, Info, Minus, Plus, ShoppingCart } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import useStoreForUser from '../stores/StoreforUser'
import useCartStore from '../stores/cartStore'
import { useNavigate, useParams } from 'react-router-dom'

const Store = () => {
    const { storeId } = useParams();
    const navigate = useNavigate()
    // const storeId = '1' //mock storeId
    const [storeData, setStoreData] = useState([])
    const [cartData, setCartData] = useState([])
    const getStoreData = useStoreForUser((state) => state.getStoreData)
    const addCartData = useCartStore((state) => state.addCartData)
    const ChangeQuantityItem = useCartStore((state) => state.ChangeQuantityItem)
    const getCartData = useCartStore((state) => state.getCartData)
    const DeleteCartItem = useCartStore((state)=>state.DeleteCartItem)

    useEffect(() => {
        StoreData()
        CartData()

    }, [])
    const CartData = async () => {
        try {
            console.log('Fetching cart data...')
            const result = await getCartData()
            // เพิ่ม check และดึงข้อมูลจาก result.data
            if (result?.data) {
                setCartData(result.data)  // เก็บเฉพาะส่วน data
                console.log('Cart data:', result.data)
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const StoreData = async () => {
        try {
            console.log('Fetching store data...')
            const result = await getStoreData(storeId)
            if (result?.data) {
                const targetStore = result.data.find(store => store.id === parseInt(storeId))
                if (targetStore) {
                    setStoreData(targetStore)
                    console.log('Data set to state:', targetStore)
                }
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    useEffect(() => {
        console.log(storeData)
    }, [storeData])

    // const formatTime = (timeString) => {
    //     if (!timeString) return '';

    //     // แยกเอาเฉพาะเวลาออกมา
    //     const time = timeString.split('T')[1];
    //     // แยกชั่วโมงออกมา
    //     const hour = time.split(':')[0];

    //     // แสดงในรูปแบบ HH:00
    //     return `${hour.padStart(2, '0')}:00`;
    // }


    const Increment = async (productId, quantity) => {
        try {
            if (Array.isArray(cartData)) {
                const cartItem = cartData.find(cart => cart.productId === productId);
                const currentQuantity = cartItem ? cartItem.quantity : 0;

                if (currentQuantity < quantity) {
                    if (cartItem) {
                        // ถ้ามีสินค้าในตะกร้าแล้ว ใช้ ChangeQuantityItem
                        const response = await ChangeQuantityItem(cartItem.id, currentQuantity + 1);
                    } else {
                        // ถ้ายังไม่มีสินค้าในตะกร้า ใช้ addCartData
                        const response = await addCartData(productId, 1);
                    }
                    console.log('Cart updated');
                    CartData(); // รีเฟรชข้อมูลตะกร้า
                }
            }
        } catch (err) {
            console.error('Error adding to cart:', err);
        }
    };

    const Decrement = async (productId) => {
        try {
            if (Array.isArray(cartData)) {
                const cartItem = cartData.find(cart => cart.productId === productId);


                if (cartItem && cartItem.quantity > 1) {

                    // อัพเดทจำนวนสินค้าในตะกร้า
                    const response = await ChangeQuantityItem(cartItem.id, cartItem.quantity - 1);
                    console.log('Cart updated');
                    CartData(); // รีเฟรชข้อมูลตะกร้า
                }
                if(cartItem && cartItem.quantity === 1){
                    setCartData(prevCart => prevCart.filter(item => item.id !== cartItem.id));
                    const response = await DeleteCartItem(cartItem.id);
                    console.log('Cart updated');
                    CartData(); 
                    
                }
            }
        } catch (err) {
            console.error('Error updating cart:', err);
        }
    };
   
    const mapStoreData = storeData.products?.map((item, index) => {
        const cartItem = Array.isArray(cartData) ?
        cartData.find(cart => cart.productId === item.id) : null;
            

        return <div key={item.id} className="hover:bg-gray-50 transition-colors">
            <div className="flex p-4 border-b">
                <div className="flex-1 pr-4">
                    <h3 className="font-medium text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                    <div className="mt-3 space-y-1">
                        <div className="flex items-center">
                            <span className="text-gray-500 line-through text-sm">฿{item.originalPrice}</span>
                            <span className="ml-2 text-red-500 text-lg font-semibold">฿{item.salePrice}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-xs text-gray-500">
                                เหลือ <span className="text-orange-500 font-medium">{item.quantity}</span> ชิ้น
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <div className="relative">
                        <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-24 h-24 rounded-lg object-cover shadow-sm"
                        />
                    </div>
                    <div className="flex items-center space-x-3 mt-3 bg-white rounded-full border px-2 py-1">
                        <button className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                            onClick={() => Decrement(item.id)}
                        >
                            <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="w-8 text-center font-medium">{cartItem ? cartItem.quantity : 0}</span>
                        {/* <span className="w-8 text-center font-medium">{newQuantity[item.id] || 0}</span> */}
                        <button className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                            onClick={() => Increment(item.id, item.quantity)}
                        >
                            <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    })

    console.log("storedata",storeData)
    return (
       <div className="relative h-screen flex flex-col max-w-lg mx-auto bg-white">
        <div className="flex-1 overflow-y-auto">
            {/* Restaurant Header */}
            <div className="relative h-48">
                <img
                    src={storeData.profilePicture || '/api/placeholder/400/320'}
                    alt="restaurant cover"
                    className="w-full h-full object-cover"
                />
                <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                    <Heart className="w-6 h-6 text-gray-600" />
                </button>
            </div>

            {/* Restaurant Info */}
            <div className="p-4 border-b">
                <div className="flex justify-between items-start">
                    <div className="space-y-2">
                        <h1 className="text-xl font-bold">{storeData.storeName}</h1>
                        <div className="flex flex-col space-y-1 text-sm text-gray-600">
                            <p className="text-gray-700">{storeData.storeAddress}</p>
                            <p className="text-gray-600 italic">{storeData.storeDetails}</p>
                            <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4" />
                                <span>เวลาทำการ: {storeData.timeOpen} - {storeData.timeClose} น.</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="line-clamp-1">35 กิโลเมตรจากคุณ</span>
                                <span>•</span>
                                <span>95+ orders</span>
                            </div>
                            <p className="font-medium">เบอร์โทร: {storeData.phoneNumber}</p>
                        </div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                        <Info className="w-6 h-6 text-gray-600" />
                    </button>
                </div>

                {/* Status and Rating */}
                <div className="flex items-center space-x-2 mt-4">
                    <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                        {storeData.status}
                    </span>
                    <span>•</span>
                    <span className="text-sm text-yellow-500 font-medium">4.8 (1.2k)</span>
                </div>
            </div>

            {/* Menu Items */}
            <div className="pb-24">
                {mapStoreData}
            </div>
        </div>

        {/* Fixed Cart Button */}
        <div className="sticky bottom-0 left-0 right-0 w-full bg-white border-t shadow-lg">
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-3">
                    <ShoppingCart className="w-6 h-6 text-blue-600" />
                    <div>
                        <p className="text-sm text-gray-600">จำนวนสินค้าในตะกร้า</p>
                        <p className="font-medium text-blue-600">
                            {Array.isArray(cartData) ? cartData.reduce((total, item) => total + item.quantity, 0) : 0} ชิ้น
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => navigate('/cart')}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-all transform hover:scale-105 active:scale-95 shadow-md"
                >
                    <span>ดูตะกร้า</span>
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    </div>
    )
}

export default Store


