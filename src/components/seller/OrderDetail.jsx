import { div } from 'framer-motion/client'
import React from 'react'

const OrderDetail = () => {
  return (
    <div>
 <div className="w-[900px] mx-auto bg-white border border-gray-300 shadow-lg ">
                    <div className="bg-[#5abd4f] text-white p-4 ">
                        <h1 className="text-xl font-bold">Order Detail</h1>
                    </div>
                    <div className="p-4 border-b border-gray-300 flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-semibold">Order#00001</h2>
                            <p>1 พ.ย. 2567 17:00 น.</p>
                            <p>ช่องทางการชำระเงิน : พร้อมเพย์</p>
                        </div>
                        <div className="flex items-center">
                            <img src="https://placehold.co/50x50" alt="Profile picture of the customer" className="w-16 h-16 rounded-full mr-2"/>
                            <div>
                                <p className="font-bold">Fname Lname</p>
                                <p>เบอร์ : 099-999-9999</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-10 pb-4 relative">

                   
                        {[
                            { img: "https://i.postimg.cc/R0FhMXx0/bqna-listing.jpg", name: "ชื่ออาหาร", price: "$7.02" },
                            { img: "https://i.postimg.cc/R0FhMXx0/bqna-listing.jpg", name: "ชื่ออาหาร", price: "$7.02" },
                            { img: "https://i.postimg.cc/R0FhMXx0/bqna-listing.jpg", name: "ชื่ออาหาร", price: "$7.02" },
                            { img: "https://i.postimg.cc/R0FhMXx0/bqna-listing.jpg", name: "ชื่ออาหาร", price: "$7.02" },
                            { img: "https://i.postimg.cc/R0FhMXx0/bqna-listing.jpg", name: "ชื่ออาหาร", price: "$7.02" },
                            { img: "https://i.postimg.cc/R0FhMXx0/bqna-listing.jpg", name: "ชื่ออาหาร", price: "$7.02" },
                          
                        ].map((item, index) => (
                            <div key={index} className="flex items-center mb-6">
                                
                                <div className='relative'>
                                <div className="bg-[#5abd4f] font-semibold  text-lg text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 
                                absolute left-[-14px] top-[-14px]">
                                    2x
                                </div>
                                <img src={item.img} alt={`Food item ${index + 1}`} className="w-[130px] h-[75px] rounded mr-4"/>
                                </div>
                                <div className="flex-1">
                                    
                                    <p className="font-semibold">{item.name}</p>
                                </div>
                                <div className="text-right font-semibold">
                                    <p>{item.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 border-t border-gray-300">
                        <div className="flex justify-between mb-2">
                            <p className='font-bold text-xl'>Quantity (4 items)</p>
                            <p className="font-bold text-xl">$23</p>
                        </div>
                        <div className="flex justify-between">
                            <p className='font-bold text-xl'>Total payment</p>
                            <p className="text-[#ff5722] font-bold text-3xl">$23</p>
                        </div>
                    </div>
                    <div className="p-4 border-t border-gray-300 flex justify-end gap-10">
                        <button className="bg-[#ff5722] text-white font-semibold py-2 px-4 rounded-3xl">Reject Order</button>
                        <button className="bg-[#5abd4f] text-white font-semibold py-2 px-4 rounded-3xl">Accept Order</button>
                    </div>
                </div>

    </div>
  )
}

export default OrderDetail