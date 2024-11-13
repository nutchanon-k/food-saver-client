import { useNavigateService } from "../../routers/navigateService";

const ModalFood = ({ product }) => {
  const { navigateToStore } = useNavigateService();

  return (
    <label className="swap swap-flip active:scale-90 transition-all duration-200">
      <input type="checkbox" />
      {/* Front of card */}
      <div className="swap-off w-[192px] md:w-[224px] h-[350px]">
        <div className="w-full h-full rounded-xl overflow-hidden shadow-lg bg-white text-sm">
          <div className="h-[65px] w-[65px] overflow-hidden rounded-xl absolute top-20 right-2 z-20 border-4 border-white">
            <img
              className="h-full w-full object-cover"
              src={
                product?.store?.profilePicture ||
                `https://placehold.co/600x400?text=${
                  product?.store?.storeName || "Store"
                }`
              }
              alt=""
            />
          </div>
          <div className="h-36 md:h-32 overflow-hidden group">
            <img
              src={
                product?.imageUrl ||
                "https://i.postimg.cc/R0FhMXx0/bqna-listing.jpg"
              }
              alt={product?.name}
              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-125"
              loading="lazy"
            />
          </div>
          <div className="p-4 flex flex-col justify-between h-[calc(100%-144px)]">
            <div>
              <h3 className="text-md md:text-xl font-bold text-gray-800 mb-2 truncate hover:text-clip hover:whitespace-normal transition-all duration-300">
                {product?.name}
              </h3>
              <div className="flex items-center mb-3">
                <span className="text-gray-400 text-sm line-through mr-2">
                  {product?.originalPrice}฿
                </span>
                <span className="text-green-500 text-xl font-bold">
                  {product?.salePrice}฿
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-gray-500 text-center">
                คลิกเพื่อดูรายละเอียดเพิ่มเติม
              </p>
              <button className="w-full bg-gradient-to-br from-gray-500 to-emerald-600 text-white py-2.5 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:from-gray-600 hover:to-emerald-700 active:scale-95">
                ดูรายละเอียด
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Back of card */}
      <div className="swap-on w-[192px] md:w-[224px] h-[350px]">
        <div className="w-full h-full rounded-xl shadow-lg bg-white p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold mb-3 truncate hover:text-clip hover:whitespace-normal transition-all duration-300">
              {product?.name}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-3">
              {product?.description}
            </p>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-semibold">วันหมดอายุ:</span>{" "}
                {product?.expiryDate}
              </p>
              <p className="text-sm">
                <span className="font-semibold">จำนวน:</span>{" "}
                {product?.quantity} ชิ้น
              </p>
              <p className="text-sm">
                <span className="font-semibold">ประเภท:</span>{" "}
                {product?.category}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigateToStore(product?.storeId)}
            className="w-full bg-gradient-to-br from-gray-500 to-emerald-600 text-white py-2.5 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:from-gray-600 hover:to-emerald-700 active:scale-95"
          >
            ไปที่ร้านค้า
          </button>
        </div>
      </div>
    </label>
  );
};
export default ModalFood;
