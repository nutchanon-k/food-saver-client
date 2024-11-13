import React from 'react'
import { Search } from 'lucide-react';

const FilterBar = () => {
  return (
    <div>
         <div className="p-4 w-64 bg-white">
                    <div className="mb-6">
                        <h2 className="font-bold mb-2">จัดเรียงโดย</h2>
                        <div className="flex flex-col space-y-2">
                            <label className="flex items-center">
                                <input type="radio" name="sort" className="mr-2" />
                                เกี่ยวข้องกัน
                            </label>
                            <label className="flex items-center">
                                <input type="radio" name="sort" className="mr-2" />
                                คะแนนสูงสุด
                            </label>
                            <label className="flex items-center">
                                <input type="radio" name="sort" className="mr-2" />
                                ระยะทาง
                            </label>
                        </div>
                    </div>
                    <div className="mb-6">
                        <h2 className="font-bold mb-2">ประเภทอาหาร</h2>
                        <div className="relative mb-4">
                            <input type="text" placeholder="ค้นหาตามประเภทอาหาร" className="w-full p-2 border rounded-full pl-10" />
                            <Search className='absolute left-3 top-2.5 text-gray-400' />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2 border-green-500 rounded-sm text-green-500 focus:ring-green-500" />
                                หมวดหมู่อาหาร
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                หมวดหมู่อาหาร
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                หมวดหมู่อาหาร
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2" />
                                หมวดหมู่อาหาร
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2" checked />
                                หมวดหมู่อาหาร
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2" checked />
                                หมวดหมู่อาหาร
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2" checked />
                                หมวดหมู่อาหาร
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-2" checked />
                                หมวดหมู่อาหาร
                            </label>
                        </div>
                    </div>
                    <div className="mb-6">
                        <h2 className="font-bold mb-2">ราคา</h2>
                        <div className="flex items-center mb-4">
                            <input type="range" className="w-full text-[#5abd4f]" />
                        </div>
                        <div className="flex justify-between mb-4">
                            <input type="number" placeholder="$" className="w-1/2 p-2 border rounded mr-2" />
                            <input type="number" placeholder="$" className="w-1/2 p-2 border rounded ml-2" />
                        </div>
                        <button className="w-full bg-[#5abd4f] text-white py-2 rounded-3xl mb-2">ใช้ตัวกรอง</button>
                        <button className="w-full bg-[#ff5722] text-white py-2 rounded-3xl">ล้างตัวกรองทั้งหมด</button>
                    </div>
                    <div className="mb-6">
                        <h2 className="font-bold mb-2">popular</h2>
                        <div className="flex flex-wrap gap-2">
                            <span className="bg-gray-200 text-[#66707A] px-3 py-1 rounded-full">Pizza</span>
                            <span className="bg-gray-200 text-[#66707A] px-3 py-1 rounded-full">Hamberger</span>
                            <span className="bg-gray-200 text-[#66707A] px-3 py-1 rounded-full">bread</span>
                           
                        </div>
                    </div>
                    <div>
                        <h2 className="font-bold mb-2">Recent Search</h2>
                        <div className="flex flex-wrap gap-2">
                            <span className="bg-gray-200 text-[#66707A] px-3 py-1 rounded-full">Sushi</span>
                            <span className="bg-gray-200 text-[#66707A] px-3 py-1 rounded-full">Donuts</span>
                            <span className="bg-gray-200 text-[#66707A] px-3 py-1 rounded-full">Ramen</span>
                            <span className="bg-gray-200 text-[#66707A] px-3 py-1 rounded-full">Pizza</span>
                            <span className="bg-gray-200 text-[#66707A] px-3 py-1 rounded-full">Hamberger</span>
                            <span className="bg-gray-200 text-[#66707A] px-3 py-1 rounded-full">bread</span>
                            
                        </div>
                    </div>
                </div>
    </div>
  )
}

export default FilterBar