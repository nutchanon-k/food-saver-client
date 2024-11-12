import React, { useEffect, useState } from 'react'
import { ChevronRight,ClipboardList ,Search  } from 'lucide-react';
import useOrderStore from '../../stores/OrderStore';
import useUserStore from '../../stores/userStore'


const OrderList = () => {

    const [orders,setOrders] = useState([])
    const [filterOrders,setFilterOrders] = useState(null)
    const [selectedOrderId, setSelectedOrderId] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')



    const user = useUserStore((state)=>state.user)
    const getSellerOrder = useOrderStore((state)=>state.getSellerOrder)
    const setStateData = useOrderStore((state)=>state.setStateData)
    const sellerId = user.id







    useEffect(()=>{
        getOrderData()
        console.log(sellerId)
    },[])


    

    const getOrderData = async() =>{
        const result = await getSellerOrder(sellerId)


        const groupedOrders = result.data.orderItems.reduce((acc, item) => {
            const existingOrder = acc.find(order => order.orderId === item.orderId);
            
            if (existingOrder) {
              existingOrder.items.push({
                ...item,
                product: item.product
              });
              existingOrder.totalItems += item.quantity;
            } else {
              acc.push({
                orderId: item.orderId,
                items: [{
                  ...item,
                  product: item.product
                }],
                totalItems: item.quantity,
                createdAt: item.order.createdAt,
                totalPrice: item.order.totalPrice,
                paymentStatus: item.order.paymentStatus,
                paymentMethod: item.order.paymentMethod,
                isPickUpped: item.order.isPickUpped,
                user: item.order.user
              });
            }
            
            return acc;
          }, []);
      
          setOrders(groupedOrders); 
    }

    const filterSearch = (searchValue) => {

        setSearchTerm(searchValue);
        
        if (!searchValue.trim()) {
            setFilterOrders(orders);
            return;
        }

        const searchLower = searchValue.toLowerCase();
        const filtered = orders.filter(order => 
            // Search by order ID
            order.orderId.toString().includes(searchLower) ||
            // Search by payment status
            order.paymentStatus.toLowerCase().includes(searchLower) ||
            // Search by payment method
            order.paymentMethod.toLowerCase().includes(searchLower) ||
            // Search by product names
            order.items.some(item => 
                item.product.name.toLowerCase().includes(searchLower)
            )


        
        );
        setFilterOrders(filtered)
    }
 


    useEffect(()=>{console.log(orders)},[orders])

    const hdlOnClick = (id,data) => {
        setSelectedOrderId(id)


        console.log(data)
        setStateData(data)

    }
    
    


    

  return (
    <div>
 <div className="w-[360px] mx-auto bg-white  shadow-md overflow-hidden ml-[5%] p-2">
                    <div className="p-4 flex items-center">
                        <ClipboardList  className="text-[#5abd4f]" />
                        <h1 className="text-[#5abd4f] text-xl font-bold ml-">Order in</h1>
                    </div>
                    <div className="p-4">
                        <div className="relative">
                        <Search className='text-gray-400 absolute top-2.5 left-4' />
                            <input type="text" 
                            value={searchTerm}
                            onChange={(e)=>filterSearch(e.target.value)}
                            placeholder="Search Order" className="pl-12 pr-4 py-2 w-full border rounded-full focus:outline-none focus:ring-2 focus:ring-[#5abd4f]" />
                        </div>
                    </div>
                    <div className={`divide-y divide-gray-200 `}>
                    {filterOrders?.map((order, index) => (
                        <div
                            key={index}
                            onClick={() => hdlOnClick(order.orderId, order)}
                            className={`flex items-center justify-between p-4 hover:bg-green-50 cursor-pointer ${selectedOrderId === order.orderId ? 'bg-green-200' : ''}`}
                        >
                            <div>
                                <div className="text-xl font-semibold mr-6">Order {order.orderId}</div>
                                <div className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleString()}</div>
                                <div className="text-sm text-gray-500">
                                    {order.items.map(item => item.product.name).join(', ')}
                                </div>
                            </div>
                            <div className='flex items-center gap-2'>
                                <div className='text-xl font-semibold'>${order.totalPrice}</div>
                                <button className='bg-[#5abd4f] text-white rounded mr-2'>
                                    <ChevronRight />
                                </button>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>

    </div>
  )
}

export default OrderList