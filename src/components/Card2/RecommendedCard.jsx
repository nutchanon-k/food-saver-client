import React from "react";
import { Star, Heart } from "lucide-react";
import { useNavigateService } from "../../routers/navigateService";

const RecommendedCard = ({ store, key }) => {
  const { navigateToStore } = useNavigateService();
  return (
    <div
      className="cursor-pointer active:scale-90 transition-all duration-200"
      onClick={() => navigateToStore(store.id)}
    >
      <div key={store?.id} className="h-full">
        <div className="w-[280px] md:w-[250px] rounded-lg overflow-hidden shadow-lg h-full border bg-white flex flex-col">
          <div className="relative">
            <div className="overflow-hidden w-[280px] md:w-[250px] h-[100px] md:h-[160px]">
              <img
                className="hover:scale-105 transition-transform duration-300 w-full h-full object-cover"
                src={store?.profilePicture}
                alt={store?.storeName}
              />
            </div>
            <div className="absolute top-2 left-0 bg-[#F24822] text-white text-xs font-semibold px-2 py-1">
              PROMO
            </div>
            <div className="absolute -bottom-3 -right-14 transform -translate-x-1/2 bg-[#332C45] text-white text-[10px] px-2 py-1 rounded-full">
              4% off your order
            </div>
          </div>
          <div className="px-3 py-2 md:px-4 md:py-4 flex-1 flex flex-col">
            <div className="font-bold text-sm md:text-lg flex-1">
              {store?.storeName}
            </div>
            <div className="text-gray-600 text-xs md:text-sm flex items-center justify-end mt-2">
              <span>
                {store?.distance
                  ? `${(store?.distance * 1.609344).toFixed(2)} km | `
                  : ""}
              </span>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-500" />
                <span className="text-yellow-500">4.8</span>
              </div>
              <span className="text-gray-400 ml-1">(1.2k)</span>
              <span className="ml-auto text-[#ff5722]">
                <Heart className="w-4 h-4 md:w-5 md:h-5" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedCard;
