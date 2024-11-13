import React from "react";

const ModalFoodDetail = ({ product }) => {
  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden w-80">
          <img
            src={
              product
                ? product.imageUrl
                : "https://i.postimg.cc/R0FhMXx0/bqna-listing.jpg"
            }
            alt={product ? product.name : "Product name"}
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-2">
              {product ? product.name : "Product name"}
            </h2>
            <div className="flex items-center mb-4">
              <span className="text-[#66707A] text-l text-semibold line-through mr-2">
                {product ? `${product.originalPrice}฿` : "Not loaded"}
              </span>
              <span className="text-[#5abd4f] text-xl font-bold">
                {product ? `${product.salePrice}฿` : "Not loaded"}
              </span>
            </div>

            <h3 className="text-lg font-semibold mb-2">รายละเอียดอาหาร</h3>
            <p className="text-gray-700 text-sm mb-4">
              {product ? product.description : "Product description not loaded"}
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

export default ModalFoodDetail;
