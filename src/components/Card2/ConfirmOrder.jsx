import React from 'react'
import { Store } from 'lucide-react';

const ConfirmOrder = () => {
  return (
    <div><div className="w-[850px] mx-auto p-4">
    <h1 className="text-2xl font-bold bg-[#ECF1F6] p-4">Confirm Order</h1>
    <div className="bg-white shadow-md overflow-hidden mb-4">
        <img src="https://i.postimg.cc/nr8YdhTm/image-116.png" alt="Map showing the location of the restaurant" className="w-full"/>
        <div className="p-4">
            <div className="flex items-center ml-4 mb-4">
                <Store className=" text-[#5abd4f] w-12 h-12 mr-4"/>
                <div>
                    <div className='flex flex-row'><p className='font-bold w-32'>รับอาหารได้ที่ :</p> <p>35 อาคารวรรณสรณ์ ถ. พญาไท แขวงถนนพญาไท เขตราชเทวี กรุงเทพมหานคร 10400</p></div>
                    <div className='flex flex-row'><p className='font-bold w-32'>เบอร์โทรร้าน :</p> <p>099-999-9999</p></div>
                    <div className='flex flex-row'><p className='font-bold w-40'>รับอาหารได้ถึงเวลา :</p> <p>19:00 น.</p></div>
                </div>
            </div>
            <div className="border-t border-gray-200">
                {[...Array(4)].map((_, i) => (
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <div className="flex items-center relative">
                        <div className="bg-[#5abd4f] text-white text-md font-bold px-2 py-1 rounded-full mr-2 
                            absolute -top-3 -left-3">2x</div>
                            <img src="https://i.postimg.cc/R0FhMXx0/bqna-listing.jpg" alt="food name" className="w-24 h-16 rounded mr-4"/>
                            
                            
                            <div>
                                {/* <span className="bg-[#5abd4f] text-white text-xs font-bold px-2 py-1 rounded-full mr-2">2x</span> */}
                                <span className='font-bold'>ชื่ออาหาร</span>
                            </div>
                        </div>
                        <span className='font-semibold'>$7.02</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <h2 className="text-xl font-bold mb-4">Checkout detail</h2>
        <div className="flex justify-between mb-2">
            <span className='font-semibold'>Quantity (4 items)</span>
            <span className=" font-bold text-xl">$23</span>
        </div>
        <div className="flex justify-between mb-2">
            <span className='font-semibold'>Total payment</span>
            <span className="text-[#ff5722] font-bold text-2xl ">$23</span>
        </div>
    </div>
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 ">
        <div className="flex justify-between items-center mb-4 font-bold">
            <span>ช่องทางการชำระเงิน</span>
            <span className="bg-gray-200 text-gray-700 px-2 py-1 font-bold rounded">พร้อมเพย์</span>
        </div>
        <div className="mb-2">
            <span className='font-bold'>รหัสออเดอร์</span>
            <span className="float-right font-semibold">D0000001</span>
        </div>
        <div className="mb-2">
            <span className='font-bold'>ชื่อผู้สั่งอาหาร</span>
            <span className="float-right font-semibold">คุณ User</span>
        </div>
        <div className="mb-2">
            <span className='font-bold'>Phone number</span>
            <span className="float-right font-semibold">0123456789</span>
        </div>
    </div>
    <button className="bg-[#5abd4f] text-white text-lg font-bold py-2 px-4 rounded-3xl w-full">Confirm Order</button>
</div></div>
  )
}

export default ConfirmOrder