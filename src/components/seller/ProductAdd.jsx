import React from "react";
import { useState, useEffect } from "react";
import useSellerAddProduct from "../../stores/seller store/SellerAddProduct";
import { CloudUpload } from "lucide-react";

const ProductAdd = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    expirationDate: "",
    categoryId: "",
    allergenId: "",
    salePrice: "",
    originalPrice: "",
    quantity: "",
  });
  const [categories, setCategories] = useState([]);
  const [allergen, setAllergen] = useState([]);
  const getCategories = useSellerAddProduct((state) => state.getCategories);
  const getAllergen = useSellerAddProduct((state) => state.getAllergen);

  useEffect(() => {
    getCategoriesList();
    getAllergenList();
  }, []);

  const id = 1;
  const getCategoriesList = async () => {
    try {
      const CategoriesResult = await getCategories(id);
      console.log(CategoriesResult);
      return setCategories(CategoriesResult);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(categories);

  const getAllergenList = async () => {
    try {
      const AllergenResult = await getAllergen();
      console.log(AllergenResult);
      return setAllergen(AllergenResult);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(allergen);

  const hdlOnChange = (e) => {
    console.log(e.target.value);
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    console.log(form);
  }, [form]);

  const openInput = () => {
    document.getElementById("inputFile").click();
  };

  return (
    <div>
      {" "}
      <div className="flex items-center justify-center min-h-screen">
        <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
          <h2 className="text-xl font-bold mb-6">เพิ่มสินค้า</h2>
          <div className="grid grid-cols-2 gap-6">
            <div
              className="border-2 border-dashed border-[#5abd4f] rounded-lg p-6 flex flex-col items-center justify-center"
              onClick={openInput}
            >
              <input
                type="file"
                accept="image/*"
                name="image"
                id="inputFile"
                className="hidden"
              />
              <CloudUpload className="text-[#5abd4f] text-4xl mb-4" />
              <p className="text-gray-500">Browse Files to upload</p>
            </div>
            <div>
              <div className="mb-4">
                <label className="block text-gray-700">ชื่อสินค้า</label>
                <input
                  onChange={hdlOnChange}
                  name="name"
                  type="text"
                  placeholder="กรุณากรอกชื่อสินค้า"
                  className="w-full border rounded-lg p-2 mt-1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">รายละเอียดสินค้า</label>
                <textarea
                  onChange={hdlOnChange}
                  name="description"
                  placeholder="กรุณากรอกรายละเอียดสินค้า"
                  className="w-full border rounded-lg p-2 mt-1"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">ประเภทอาหาร</label>
                <select
                  onChange={hdlOnChange}
                  name="categoryId"
                  className="w-full border rounded-lg p-2 mt-1"
                >
                  {/* <option>กรุณาเลือกประเภทอาหาร</option> */}
                  {categories?.data?.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">มีส่วนผสมของ</label>
                <select
                  onChange={hdlOnChange}
                  name="allergenId"
                  className="w-full border rounded-lg p-2 mt-1"
                >
                  {/* <option>กรุณาเลือกอาหารแพ้อาหาร</option> */}
                  {allergen?.data?.data?.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-6 w-[820px]">
              <div className="mb-4">
                <label className="block text-gray-700">ราคาปกติ</label>
                <input
                  onChange={hdlOnChange}
                  name="originalPrice"
                  type="number"
                  placeholder="฿฿"
                  className="w-full border rounded-lg p-2 mt-1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">ราคาพิเศษ</label>
                <input
                  onChange={hdlOnChange}
                  name="salePrice"
                  type="number"
                  placeholder="฿฿"
                  className="w-full border rounded-lg p-2 mt-1"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">วันหมดอายุ</label>
                <div className="relative">
                  <input
                    onChange={hdlOnChange}
                    name="expirationDate"
                    type="date"
                    placeholder="01/11/2567"
                    className="w-full border rounded-lg p-2 mt-1"
                  />
                  <i className="fas fa-calendar-alt absolute right-3 top-3 text-gray-400"></i>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">จำนวน</label>
                <input
                  onChange={hdlOnChange}
                  name="quantity"
                  type="number"
                  placeholder=""
                  className="w-full border rounded-lg p-2 mt-1"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <button className="bg-[#ff5722] text-white font-semibold py-2 px-6 rounded-3xl">
              ยกเลิก
            </button>
            <button className="bg-[#5abd4f] text-white font-semibold py-2 px-6 rounded-3xl">
              เพิ่มสินค้า
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductAdd;
