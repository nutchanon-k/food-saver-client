import React from 'react'

const SearchFilterPage = () => {


{/* <script src="https://unpkg.com/react/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></link>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet"></link> */}

  return (
    <div>
         <div className="bg-gray-100 p-4">
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <div className="relative">
                            <img src="https://placehold.co/800x200" alt="Map with location markers" className="w-full h-48 object-cover rounded-lg" />
                            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-50 rounded-lg">
                                <h1 className="text-white text-3xl font-bold mb-4">Explore restaurants around you</h1>
                                <button className="bg-green-500 text-white px-6 py-2 rounded-full flex items-center">
                                    <i className="fas fa-map-marker-alt mr-2"></i> Show Map
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex items-center">
                        <input type="text" placeholder="ค้นหาร้านอาหาร ประเภทและเมนูอาหาร" className="w-full p-2 rounded-lg border border-gray-300" />
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                        <h2 className="text-xl font-bold mb-4">ร้านค้าแนะนำ</h2>
                        <div className="flex space-x-4 overflow-x-auto">
                            {['Beyond Bread', 'Tiengna', 'Citysuper', 'Tops', 'Cookie Dept', 'Frenchies', 'Kale'].map((store, index) => (
                                <div key={index} className="flex-shrink-0">
                                    <img src={`https://placehold.co/100x100?text=${store}`} alt={`${store} logo`} className="w-24 h-24 object-cover rounded-lg" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                        <h2 className="text-xl font-bold mb-4">ร้านอร่อยใกล้คุณ</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {Array(6).fill().map((_, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <img src="https://placehold.co/300x200" alt="Delicious food" className="w-full h-32 object-cover" />
                                    <div className="p-4">
                                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">PROMO</span>
                                        <h3 className="text-lg font-bold mt-2">Pizza Hut</h3>
                                        <p className="text-gray-500 text-sm">1.5 km • 4.3 (324)</p>
                                        <p className="text-green-500 font-bold mt-2">4% off your order</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <h2 className="text-xl font-bold mb-4">ร้านทั้งหมด</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {Array(12).fill().map((_, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <img src="https://placehold.co/300x200" alt="Delicious food" className="w-full h-32 object-cover" />
                                    <div className="p-4">
                                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">PROMO</span>
                                        <h3 className="text-lg font-bold mt-2">Pizza Hut</h3>
                                        <p className="text-gray-500 text-sm">1.5 km • 4.3 (324)</p>
                                        <p className="text-green-500 font-bold mt-2">4% off your order</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
    </div>
  )
}

export default SearchFilterPage