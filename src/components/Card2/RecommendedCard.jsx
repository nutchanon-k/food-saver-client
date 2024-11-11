import React from "react";
import { Star, Heart } from "lucide-react";
import { useNavigateService } from "../../routers/navigateService";

const RecommendedCard = ({ store, key }) => {
  const { navigateToStore } = useNavigateService();
  return (
    <div className="cursor-pointer active:scale-90 transition-all duration-200" onClick={() => navigateToStore(store.id)}>
      <div key={store?.id} className="h-full">
        <div className="w-[250px] rounded-lg overflow-hidden shadow-lg h-full border bg-white">
          <div className="relative">
            <div className="overflow-hidden w-[250px] h-[160px]">
              <img
                className="hover:scale-105 transition-transform duration-300"
                src={store?.profilePicture}
                alt={store?.storeName}
              />
            </div>
            <div className="absolute top-4 left-0 bg-[#F24822] text-white text-sm font-semibold px-2 py-1">
              PROMO
            </div>
            <div className="absolute -bottom-3 -right-14 transform -translate-x-1/2 bg-[#332C45] text-white text-xs font-semibold px-3 py-1 rounded-full">
              4% off your order
            </div>
          </div>
          <div className="px-4 py-4">
            <div className="font-bold text-lg mb-2">{store?.storeName}</div>
            <div className="text-gray-600 text-sm flex items-center">
              <span>
                {store?.distance
                  ? `${(store?.distance * 1.609344).toFixed(2)} km`
                  : ""}
              </span>
              <span className="mx-2">|</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-yellow-500">4.8</span>
              </div>
              <span className="text-gray-400 ml-1">(1.2k)</span>
              <span className="ml-auto text-[#ff5722]">
                <Heart />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedCard;
