import React from 'react'
import { ChevronRight,ClipboardList ,Search  } from 'lucide-react';

const OrderList = () => {

    const orders = [
        { id: 1, number: '00001', date: '1 พ.ย. 2567', time: '17:00 น.', amount: 230.00, isHighlighted: false },
        { id: 2, number: '00001', date: '1 พ.ย. 2567', time: '17:00 น.', amount: 230.00, isHighlighted: false },
        { id: 3, number: '00001', date: '1 พ.ย. 2567', time: '17:00 น.', amount: 230.00, isHighlighted: false },
        { id: 4, number: '00001', date: '1 พ.ย. 2567', time: '17:00 น.', amount: 230.00, isHighlighted: true },
        { id: 5, number: '00001', date: '1 พ.ย. 2567', time: '17:00 น.', amount: 230.00, isHighlighted: false },
        { id: 6, number: '00001', date: '1 พ.ย. 2567', time: '17:00 น.', amount: 230.00, isHighlighted: false },
        { id: 7, number: '00001', date: '1 พ.ย. 2567', time: '17:00 น.', amount: 230.00, isHighlighted: false },
        { id: 8, number: '00001', date: '1 พ.ย. 2567', time: '17:00 น.', amount: 230.00, isHighlighted: false },
        { id: 9, number: '00001', date: '1 พ.ย. 2567', time: '17:00 น.', amount: 230.00, isHighlighted: false },
        { id: 10, number: '00001', date: '1 พ.ย. 2567', time: '17:00 น.', amount: 230.00, isHighlighted: false },
        { id: 11, number: '00001', date: '1 พ.ย. 2567', time: '17:00 น.', amount: 230.00, isHighlighted: false },
        { id: 12, number: '00001', date: '1 พ.ย. 2567', time: '17:00 น.', amount: 230.00, isHighlighted: false },
        
    ];

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
                                <div className={`text-xl font-semibold ${order.isHighlighted ? 'text-[#ff5722]' : 'text-[#5abd4f]'}`}>${order.amount.toFixed(2)}</div>
                                <button className='bg-[#5abd4f] text-white rounded mr-2'><ChevronRight/></button>
                            </div>
                        ))}
                    </div>
                </div>

    </div>
  )
}

export default OrderList