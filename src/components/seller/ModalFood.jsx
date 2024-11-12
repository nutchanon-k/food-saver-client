import React from "react";
import { useNavigateService } from "../../routers/navigateService";

const ModalFood = ({ product }) => {
  const { navigateToStore } = useNavigateService();
  return (
    <label className="swap swap-flip active:scale-90 transition-all duration-200">
      <input type="checkbox" />
      {/* Front of card */}
      <div className="swap-off h-[300px] relative">
        <div className="flex-shrink-0 w-48 md:w-56 rounded-xl overflow-hidden shadow-lg bg-white text-sm h-full">
          <div className="h-[65px] w-[65px] overflow-hidden rounded-xl absolute top-20 right-2 z-20 border-4 border-white">
            <img className="h-full" src={product.store.profilePicture} alt="" />
          </div>
          <div className="h-36 md:h-32 overflow-hidden group">
            <img
              src={
                product?.imageUrl ||
                "https://i.postimg.cc/R0FhMXx0/bqna-listing.jpg"
              }
              alt={product?.name || "Product name"}
              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-125"
              loading="lazy"
            />
          </div>
          <div className="p-4 flex flex-col justify-between h-[calc(100%-128px)]">
            <div>
              <h3 className="text-md md:text-xl font-bold text-gray-800 mb-2">
                {product?.name || "Product name"}
              </h3>
              <div className="flex items-center mb-3">
                <span className="text-gray-400 text-sm line-through mr-2">
                  {product ? `${product.originalPrice}฿` : "Not loaded"}
                </span>
                <span className="text-green-500 text-xl font-bold">
                  {product ? `${product.salePrice}฿` : "Not loaded"}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-gray-500 text-center">
                คลิกเพื่อดูรายละเอียดเพิ่มเติม
              </p>
              <button className="w-full bg-gradient-to-br from-gray-500 to-emerald-600 text-white py-2.5 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:ffrom-gray600 hover:to-emerald-700 active:scale-95">
                ดูรายละเอียด
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Back of card */}
      <div className="swap-on h-[300px]">
        <div className="w-48 md:w-56 rounded-xl shadow-lg bg-white p-4 h-full flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold mb-3">{product?.name}</h3>
            <p className="text-gray-600 mb-4">{product?.description}</p>
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

{
  /* <div
  key={product.id}
  className="product-card bg-white p-4 border rounded-lg shadow-md min-w-[200px]"
>
  <img
    src={product.imageUrl}
    alt={product.name}
    className="h-32 md:h-40 w-full object-cover rounded"
    loading="lazy"
  />
  <div className="mt-4">
    <h3 className="text-md md:text-lg font-bold text-gray-800">
      {product.name}
    </h3>
    <p className="text-gray-600 mt-2 text-sm">{product.description}</p>
    <p className="text-green-700 mt-2 font-bold">
      Sale Price: ${product.salePrice}
    </p>
    <button className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
      Visit Store
    </button>
  </div>
</div>; */
}

{
  /* <div
      key={store.id}
      className="store-card flex-shrink-0 w-48 md:w-64 p-4 bg-white rounded-lg shadow-md"
    >
      <img
        src={store.profilePicture}
        alt={store.storeName}
        className="h-24 md:h-32 w-full object-cover rounded-md"
        loading="lazy"
      />
      <div className="mt-2">
        <h3 className="text-md md:text-lg font-bold text-gray-800">
          {store.storeName}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          {store.storeAddress || "No address available"}
        </p>
        <p className="text-green-700 mt-2 font-medium">
          {store.distance
            ? `${(store.distance * 1.609344).toFixed(2)} km`
            : "N/A"}
        </p>
        <button onClick={() => navigateToStore(store.id)} className="mt-4 w-full bg-green-600 text-white py-2 rounded transition-all  hover:bg-green-700">
          Visit Store
        </button>
      </div>
    </div> */
}
export default ModalFood;
