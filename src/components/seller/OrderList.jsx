import React, { useEffect, useState } from 'react'
import { ChevronRight,ClipboardList ,Search  } from 'lucide-react';
import useOrderStore from '../../stores/OrderStore';
import useUserStore from '../../stores/userStore'


const OrderList = () => {

    const [orders,setOrders] = useState([])

    const user = useUserStore((state)=>state.user)
    const getSellerOrder = useOrderStore((state)=>state.getSellerOrder)
    const sellerId = user.id







    useEffect(()=>{
        getOrderData()
        console.log(sellerId)
    },[])


    const getOrderData = async() =>{
        const result = await getSellerOrder(sellerId)
        console.log('getOrderData',result.data.orderItems)
        setOrders(result.data.orderItems)
    }
 

    

  return (
    <div>
 <div className="w-[360px] mx-auto bg-white  shadow-md overflow-hidden">
                    <div className="p-4 flex items-center">
                        <ClipboardList  className="text-[#5abd4f]" />
                        <h1 className="text-[#5abd4f] text-xl font-bold ml-">Order in</h1>
                    </div>
                    <div className="p-4">
                        <div className="relative">
                        <Search className='text-gray-400 absolute top-2.5 left-4' />
                            <input type="text"  placeholder="Search Order" className="pl-12 pr-4 py-2 w-full border rounded-full focus:outline-none focus:ring-2 focus:ring-[#5abd4f]" />
                        </div>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {orders.map(order => (
                            <div key={order.id} className={`flex items-center justify-between p-4 ${order.isHighlighted ? 'bg-green-100' : ''}`}>
                                <div>
                                    <div className="text-xl font-semibold mr-6">Order #{order.number}</div>
                                    <div className="text-xs text-gray-400">{order.date} {order.time}</div>
                                </div>
                                <div className={`text-xl font-semibold ${order.isHighlighted ? 'text-[#ff5722]' : 'text-[#5abd4f]'}`}>${order.amount}</div>
                                <button className='bg-[#5abd4f] text-white rounded mr-2'><ChevronRight/></button>
                            </div>
                        ))}
                    </div>
                </div>

    </div>
  )
}

export default OrderList