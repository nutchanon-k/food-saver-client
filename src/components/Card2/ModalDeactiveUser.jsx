import React from 'react'

const ModalDeactiveUser = () => {
  return (
    <div>
         <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md mx-auto">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">บัญชีของคุณถูกระงับการใช้งานชั่วคราว</h1>
                    <div className="mb-4">
                        <img src="https://i.postimg.cc/pLxvwQyG/4067568-1.png" alt="No access icon" className="mx-auto"/>
                    </div>
                    <p className="text-gray-600 mb-6">บัญชี 111@gmail.com อาจมีการทำบางสิ่งซึ่งละเมิดข้อตกลงด้านการบริการจาก Food Saver</p>
                    <p className="text-gray-900 font-bold mb-6">โปรดติดต่อฝ่ายบริการลูกค้า</p>
                    <button className="bg-orange-500 text-white py-2 px-6 rounded-full font-bold">ดำเนินการต่อ</button>
                </div>
    </div>
  )
}

export default ModalDeactiveUser