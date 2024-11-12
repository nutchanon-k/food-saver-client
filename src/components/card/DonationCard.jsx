import React from "react";
import { useNavigateService } from "../../routers/navigateService";

const DonationCard = ({ foundation }) => {
  const { navigateToFoundation } = useNavigateService();

  return (
    <div
      className="cursor-pointer active:scale-90 transition-all duration-200"
      onClick={() => navigateToFoundation(foundation.id)}
    >
      <div key={foundation?.id} className="h-full">
        <div className="w-[280px] md:w-[250px] rounded-lg overflow-hidden shadow-lg h-full border bg-white flex flex-col">
          <div className="relative">
            <div className="overflow-hidden w-[280px] md:w-[250px] h-[100px] md:h-[160px]">
              <img
                className="hover:scale-105 transition-transform duration-300 w-full h-full object-cover"
                src={foundation?.profilePicture}
                alt={foundation?.name}
              />
            </div>
            <div className="absolute top-2 left-0 bg-[#F24822] text-white text-xs font-semibold px-2 py-1">
              DONATION
            </div>
          </div>
          <div className="px-3 py-2 md:px-4 md:py-4 flex-1 flex flex-col">
            <div className="font-bold text-sm md:text-lg flex-1">
              {foundation?.name}
            </div>
            <div className="text-gray-600 text-xs md:text-sm mt-2">
              {foundation?.contactInfo || "No contact info available"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationCard;
