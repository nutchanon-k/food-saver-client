import React from 'react'

const StoreDashboard = () => {
  return (
    <div>
         <div className="container mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold">Dashboard</h1>
                        <p className="text-gray-500">Tuesday 2 Feb, 2021</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <div className="flex items-center mb-4">
                                <i className="fas fa-dollar-sign text-2xl text-purple-500"></i>
                                <span className="ml-2 text-green-500">+32.40%</span>
                            </div>
                            <h2 className="text-2xl font-bold">$10,243.00</h2>
                            <p className="text-gray-500">Total Revenue</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <div className="flex items-center mb-4">
                                <i className="fas fa-utensils text-2xl text-orange-500"></i>
                                <span className="ml-2 text-red-500">-12.40%</span>
                            </div>
                            <h2 className="text-2xl font-bold">23,456</h2>
                            <p className="text-gray-500">Total Dish Ordered</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <div className="flex items-center mb-4">
                                <i className="fas fa-users text-2xl text-blue-500"></i>
                                <span className="ml-2 text-green-500">+2.40%</span>
                            </div>
                            <h2 className="text-2xl font-bold">1,234</h2>
                            <p className="text-gray-500">Total Customer</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Order Report</h2>
                            <button className="bg-green-500 text-white px-4 py-2 rounded-lg">Filter Order</button>
                        </div>
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-gray-500">
                                    <th className="pb-2">Customer</th>
                                    <th className="pb-2">Menu</th>
                                    <th className="pb-2">Total Payment</th>
                                    <th className="pb-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-t">
                                    <td className="py-2 flex items-center">
                                        <img src="https://placehold.co/32x32" alt="Customer avatar" className="rounded-full mr-2" />
                                        Eren Jaegar
                                    </td>
                                    <td className="py-2">Spicy seasoned seafood noodles</td>
                                    <td className="py-2">$125</td>
                                    <td className="py-2 text-green-500">Completed</td>
                                </tr>
                                <tr className="border-t">
                                    <td className="py-2 flex items-center">
                                        <img src="https://placehold.co/32x32" alt="Customer avatar" className="rounded-full mr-2" />
                                        Reiner Braunn
                                    </td>
                                    <td className="py-2">Salted Pasta with mushroom sauce</td>
                                    <td className="py-2">$145</td>
                                    <td className="py-2 text-purple-500">Preparing</td>
                                </tr>
                                <tr className="border-t">
                                    <td className="py-2 flex items-center">
                                        <img src="https://placehold.co/32x32" alt="Customer avatar" className="rounded-full mr-2" />
                                        Levi Ackerman
                                    </td>
                                    <td className="py-2">Beef dumpling in hot and sour soup</td>
                                    <td className="py-2">$105</td>
                                    <td className="py-2 text-orange-500">Pending</td>
                                </tr>
                                <tr className="border-t">
                                    <td className="py-2 flex items-center">
                                        <img src="https://placehold.co/32x32" alt="Customer avatar" className="rounded-full mr-2" />
                                        Historia Reiss
                                    </td>
                                    <td className="py-2">Hot spicy fried rice with omelet</td>
                                    <td className="py-2">$45</td>
                                    <td className="py-2 text-green-500">Completed</td>
                                </tr>
                                <tr className="border-t">
                                    <td className="py-2 flex items-center">
                                        <img src="https://placehold.co/32x32" alt="Customer avatar" className="rounded-full mr-2" />
                                        Hanji Zoe
                                    </td>
                                    <td className="py-2">Hot spicy fried rice with omelet</td>
                                    <td className="py-2">$245</td>
                                    <td className="py-2 text-green-500">Completed</td>
                                </tr>
                                <tr className="border-t">
                                    <td className="py-2 flex items-center">
                                        <img src="https://placehold.co/32x32" alt="Customer avatar" className="rounded-full mr-2" />
                                        Armin Arlert
                                    </td>
                                    <td className="py-2">Hot spicy fried rice with omelet</td>
                                    <td className="py-2">$435</td>
                                    <td className="py-2 text-green-500">Completed</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">Most Ordered</h2>
                                <button className="bg-green-500 text-white px-4 py-2 rounded-lg">Today</button>
                            </div>
                            <div className="mb-4">
                                <div className="flex items-center mb-2">
                                    <img src="https://placehold.co/40x40" alt="Spicy seasoned seafood noodles" className="rounded-full mr-2" />
                                    <div>
                                        <p>Spicy seasoned seafood noodles</p>
                                        <p className="text-gray-500 text-sm">200 dishes ordered</p>
                                    </div>
                                </div>
                                <div className="flex items-center mb-2">
                                    <img src="https://placehold.co/40x40" alt="Salted pasta with mushroom sauce" className="rounded-full mr-2" />
                                    <div>
                                        <p>Salted pasta with mushroom sauce</p>
                                        <p className="text-gray-500 text-sm">120 dishes ordered</p>
                                    </div>
                                </div>
                                <div className="flex items-center mb-2">
                                    <img src="https://placehold.co/40x40" alt="Beef dumpling in hot and sour soup" className="rounded-full mr-2" />
                                    <div>
                                        <p>Beef dumpling in hot and sour soup</p>
                                        <p className="text-gray-500 text-sm">80 dishes ordered</p>
                                    </div>
                                </div>
                            </div>
                            <button className="bg-green-500 text-white px-4 py-2 rounded-lg w-full">View All</button>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">Most Type of Order</h2>
                                <button className="bg-green-500 text-white px-4 py-2 rounded-lg">Today</button>
                            </div>
                            <div className="flex justify-center">
                                <img src="https://placehold.co/200x200" alt="Pie chart showing order types" />
                            </div>
                        </div>
                    </div>
                </div>
    </div>
  )
}

export default StoreDashboard