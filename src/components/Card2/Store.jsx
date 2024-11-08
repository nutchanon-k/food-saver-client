import React from 'react'

const Store = () => {
  return (
    <div><div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
    <div className="relative">
        <img src="https://placehold.co/800x400" alt="French fries and a burger" className="w-full h-64 object-cover"/>
    </div>
    <div className="p-6">
        <h1 className="text-3xl font-semibold mb-2">ชื่อร้านอาหาร</h1>
        <p className="text-gray-600 mb-4">ที่อยู่ร้าน 35 อาคารวรรณสรณ์ ถ. พญาไท แขวงถนนพญาไท เขตราชเทวี กรุงเทพมหานคร 10400</p>
        <div className="flex items-center mb-4">
            <span className="text-green-600 font-semibold mr-2">Opening</span>
            <span className="text-gray-600">10:00 - 19:00</span>
        </div>
        <div className="flex items-center mb-4">
            <span className="text-yellow-500 mr-2"><i className="fas fa-star"></i> 4.8 (1.2k)</span>
            <span className="text-gray-600 mr-2">99+ orders</span>
            <a href="#" className="text-blue-500">Reviews</a>
        </div>
        <button className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center">
            <i className="fas fa-heart mr-2"></i> เพิ่มเป็นรายการโปรด
        </button>
        <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">รายละเอียดร้าน</h2>
            <p className="text-gray-600">Ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lo</p>
        </div>
    </div>
    <div className="px-6 py-4">
        <div className="flex space-x-2 overflow-x-auto">
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full">โปรโมชัน</button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full">จานเดี่ยว</button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full">อาหารชุด</button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full">น้ำ</button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full">เครื่องดื่ม</button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full">อาหารว่าง</button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full">อาหารหวาน</button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full">อาหารจานด่วน</button>
        </div>
    </div>
    <div className="px-6 py-4">
        <h2 className="text-xl font-semibold mb-4">โปรโมชัน</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <img src="https://placehold.co/400x200" alt="Dish 1" className="w-full h-32 object-cover"/>
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">ชื่ออาหาร</h3>
                    <p className="text-gray-600 mb-2">รายละเอียดอาหาร</p>
                    <div className="flex items-center justify-between">
                        <span className="text-green-600 font-semibold">50.00฿</span>
                        <span className="text-gray-500 line-through">70.00฿</span>
                        <span className="text-gray-600">เหลือ 10 ชิ้น</span>
                    </div>
                </div>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <img src="https://placehold.co/400x200" alt="Dish 2" className="w-full h-32 object-cover"/>
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">ชื่ออาหาร</h3>
                    <p className="text-gray-600 mb-2">รายละเอียดอาหาร</p>
                    <div className="flex items-center justify-between">
                        <span className="text-green-600 font-semibold">50.00฿</span>
                        <span className="text-gray-500 line-through">70.00฿</span>
                        <span className="text-gray-600">เหลือ 10 ชิ้น</span>
                    </div>
                </div>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <img src="https://placehold.co/400x200" alt="Dish 3" className="w-full h-32 object-cover"/>
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">ชื่ออาหาร</h3>
                    <p className="text-gray-600 mb-2">รายละเอียดอาหาร</p>
                    <div className="flex items-center justify-between">
                        <span className="text-green-600 font-semibold">50.00฿</span>
                        <span className="text-gray-500 line-through">70.00฿</span>
                        <span className="text-gray-600">เหลือ 10 ชิ้น</span>
                    </div>
                </div>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <img src="https://placehold.co/400x200" alt="Dish 4" className="w-full h-32 object-cover"/>
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">ชื่ออาหาร</h3>
                    <p className="text-gray-600 mb-2">รายละเอียดอาหาร</p>
                    <div className="flex items-center justify-between">
                        <span className="text-green-600 font-semibold">50.00฿</span>
                        <span className="text-gray-500 line-through">70.00฿</span>
                        <span className="text-gray-600">เหลือ 10 ชิ้น</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div></div>
  )
}

export default Store