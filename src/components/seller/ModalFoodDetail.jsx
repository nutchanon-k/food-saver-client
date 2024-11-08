import React from "react";

const ModalFoodDetail = () => {
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden w-80">
          <img
            src="https://i.postimg.cc/R0FhMXx0/bqna-listing.jpg"
            alt="A plate of assorted food including strawberries, crackers, and dips"
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            

            <h2 className="text-2xl font-bold mb-2">ชื่ออาหาร</h2>
            <div className="flex items-center mb-4">
              <span className="text-[#66707A] text-l text-semibold line-through mr-2">$45</span>
              <span className="text-[#5abd4f] text-xl font-bold">$23</span>
            </div>
            
            <h3 className="text-lg font-semibold mb-2">รายละเอียดอาหาร</h3>
            <p className="text-gray-700 text-sm mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Totor ac
              leo lorem nisl. Viverra vulputate sodales quis et dui, lacus.
              Iaculis eu egestas egestas vel...
            </p>
            <h3 className="text-lg font-semibold mb-2">ข้อมูลแพ้อาหาร</h3>
            <div className="flex space-x-2">
              <span className="bg-yellow-200 text-[#FFAE00] text-sm font-semibold px-2.5 py-0.5 rounded-xl">
                อาหารทะเล
              </span>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalFoodDetail;
