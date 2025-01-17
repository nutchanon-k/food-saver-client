import React from 'react'
import { Star ,Heart  } from 'lucide-react';

const PromoCard = () => {
  return (
    <div>
 <div className="w-[350px] rounded-lg overflow-hidden shadow-lg bg-white">
                    <div className="relative">
                        <img className="w-full" src="https://i.postimg.cc/43yx0vSC/t7st-listing.jpg" alt="Grilled meat with vegetables and potatoes on a plate" />
                        <div className="absolute top-8 left-4 bg-[#F24822] text-white text-base font-bold px-4 py-1">PROMO</div>
                        <div className="absolute -bottom-3 -right-12 transform -translate-x-1/2 bg-[#332C45] text-white text-sm font-semibold px-3 py-2 rounded-full">4% off your order</div>
                    </div>
                    <div className="px-4 py-4">
                        <div className="font-bold text-lg mb-2">Pizza Hut</div>
                        <div className="text-gray-600 text-sm flex items-center">
                            <span>1.5 km</span>
                            <span className="mx-2">|</span>
                            <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500"/> 
                            <span className="text-yellow-500">4.8</span>
                            </div>
                            <span className="text-gray-400 ml-1">(1.2k)</span>
                            <span className="ml-auto text-[#ff5722]"><Heart  /></span>
                        </div>
                    </div>
                </div>

    </div>
  )
}

export default PromoCard