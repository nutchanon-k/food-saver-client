import React, { useState, useEffect } from "react";
import { CircleX, Pencil } from "lucide-react";
import useSellerManageProduct from "../../stores/seller store/SellerManageProduct";

const ManageProduct = () => {
  const getStoreProduct = useSellerManageProduct(
    (state) => state.getStoreProduct
  );
  const deleteProduct = useSellerManageProduct((state) => state.deleteProduct);
  const [mapItem, setMapItem] = useState([]);

  const id = 1;

  useEffect(() => {
    MapStoreProduct();
  }, []);

  const MapStoreProduct = async () => {
    const getMapItem = await getStoreProduct(id);
    console.log(getMapItem);
    return setMapItem(getMapItem);
  };

  const handleDelete = async (id) => {
    deleteProduct(id);
  };

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold ">Manage Product</h1>
          <button className="bg-[#5abd4f] text-white px-8 py-2 mb-4 rounded-3xl">
            เพิ่มสินค้า
          </button>
        </div>
        <hr />

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="border-b pl-20">ชื่อสินค้า</th>
              <th className="border-b p-2">ราคาปกติ</th>
              <th className="border-b p-2">ราคาพิเศษ</th>
              <th className="border-b p-2">วันหมดอายุ</th>
              <th className="border-b p-2">คงเหลือ</th>
              <th className="border-b p-2">มีส่วนผสมของ</th>
              <th className="border-b p-2">ประเภทอาหาร</th>
              <th className="border-b p-2"></th>
            </tr>
          </thead>

          <tbody>
            {mapItem?.data?.map((product) => {
              console.log("product====", product);
              return (
                <tr key={product.id}>
                  <td className="border-b p-2 flex items-center">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-36 h-20 rounded-lg mr-4"
                    />
                    {product.name}
                  </td>
                  <td className="border-b p-2 ">{product.originalPrice}</td>
                  <td className="border-b p-2  text-[#ff5722]">
                    {product.salePrice}
                  </td>
                  <td className="border-b p-2">{product.expirationDate ? product.expirationDate : "-"}</td>
                  <td className="border-b p-2">{product.quantity}</td>

                  <td className="border-b p-2">{product?.productAllergens?.map((item)=> <p>{item.allergen.name}</p>)}</td>
                  
                  <td className="border-b p-2">{product?.productCategories?.map((categories)=> <p>{categories.category.name}</p>)}</td>
                  <td className="border-b p-2 text-[#FFAE00] text-center">
                    <Pencil />
                  </td>
                  <td
                    onClick={() => handleDelete(product.id)}
                    className="border-b p-2 text-red-500 text-center"
                  >
                    <CircleX />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProduct;
