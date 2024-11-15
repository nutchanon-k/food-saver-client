import React from 'react'

const NotificationsCard = () => {
  return (
    <div>

<div className="bg-white rounded-lg shadow-lg p-4 flex items-center space-x-4 max-w-md">
                    <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Company logo" className="w-10 h-10 rounded-full"/>
                    <div className="flex-1">
                        
                        <div className="text-black font-bold">GONNA SLEEP</div>
                        <div className="text-gray-700">แจ้งเตือนใหม่ <span className="text-gray-500">ร้านค้า GONNA SLEEP สมัครเข้าใช้บริการ Food Saver</span></div>
                    </div>
                    <div className="text-gray-500 text-sm">now</div>
                </div>


<div className="bg-white rounded-lg shadow-lg p-4 flex items-center space-x-4 max-w-md">
                    <img src="https://randomuser.me/api/portraits/men/2.jpg" alt="Company logo" className="w-10 h-10 rounded-full"/>
                    <div className="flex-1">
                        
                        <div className="text-black font-bold">Nusakorn Gang</div>
                        <div className="text-gray-700">แจ้งเตือนใหม่ <span className="text-gray-500">ร้านค้า Nusakorn Gang ส่งเอกสารยืนยันการเปิดร้าน</span></div>
                    </div>
                    <div className="text-gray-500 text-sm">now</div>
                </div>
    </div>
  )
}

export default NotificationsCard