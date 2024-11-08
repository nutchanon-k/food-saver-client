import React from 'react'

const NearMe = () => {
  return (
    <div>
        <div className="p-6">
                    <div className="flex items-center mb-4">
                        <h1 className="text-xl font-bold mr-2">ร้านใกล้ฉัน</h1>
                        <i className="fas fa-chevron-right"></i>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border rounded-lg overflow-hidden">
                            <img src="https://placehold.co/400x300" alt="Interior of Elisandra Restaurant with wooden furniture" className="w-full h-48 object-cover"/>
                            <div className="p-4">
                                <h2 className="text-lg font-bold">Elisandra Restaurant</h2>
                                <p className="text-gray-500"><i className="fas fa-map-marker-alt"></i> Elisandra Restaurant</p>
                            </div>
                        </div>
                        <div className="border rounded-lg overflow-hidden">
                            <img src="https://placehold.co/400x300" alt="Interior of Elisandra Restaurant with kitchen view" className="w-full h-48 object-cover"/>
                            <div className="p-4">
                                <h2 className="text-lg font-bold">Elisandra Restaurant</h2>
                                <p className="text-gray-500"><i className="fas fa-map-marker-alt"></i> Elisandra Restaurant</p>
                            </div>
                        </div>
                        <div className="border rounded-lg overflow-hidden">
                            <img src="https://placehold.co/400x300" alt="Interior of Elisandra Restaurant with green plants" className="w-full h-48 object-cover"/>
                            <div className="p-4">
                                <h2 className="text-lg font-bold">Elisandra Restaurant</h2>
                                <p className="text-gray-500"><i className="fas fa-map-marker-alt"></i> Elisandra Restaurant</p>
                            </div>
                        </div>
                    </div>
                </div>
    </div>
  )
}

export default NearMe