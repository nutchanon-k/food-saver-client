import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import useSellerAddProduct from "../../stores/seller store/SellerAddProduct";
import { CloudUpload } from "lucide-react";
import useUserStore from "../../stores/userStore";
import Swal from "sweetalert2";

const ProductAdd = ({ onSuccessAdd }) => {
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



  const [image, setImage] = useState(null)
  const [showImage, setShowImage] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)


  const [loading, setLoading] = useState(false);


  const getCategories = useSellerAddProduct((state) => state.getCategories);
  const getAllergen = useSellerAddProduct((state) => state.getAllergen);
  const uploadProductData = useSellerAddProduct((state) => state.uploadProductData)
  const user = useUserStore((state) => state.user)


  useEffect(() => {
    getCategoriesList();
    getAllergenList();
  }, []);

  // console.log(user.store.id)


  const id = user.store.id;
  const getCategoriesList = async () => {
    try {
      const CategoriesResult = await getCategories(id);
      // console.log(CategoriesResult);
      return setCategories(CategoriesResult);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(categories);

  const getAllergenList = async () => {
    try {
      const AllergenResult = await getAllergen();
      // console.log(AllergenResult);
      return setAllergen(AllergenResult);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(allergen);

  const hdlOnChange = (e) => {
    // console.log(e.target.value);
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };



  const openInput = () => {
    document.getElementById("inputFile").click();
  };

  const hdlUploadFile = useCallback((e) => {
    const selectFile = e.target.files[0];
    if (selectFile) {  // เช็ค selectFile แทน image
      setImage(selectFile);
      setShowImage(true);
      const objectUrl = URL.createObjectURL(selectFile);
      setImagePreview(objectUrl);
    }
  }, [])

  const hdlUploadProduct = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true); // เพิ่ม loading state
    try {
      const body = new FormData()
      body.append("name", (form.name));
      body.append("description", (form.description));
      body.append("expirationDate", (form.expirationDate));


        body.append(`categoryId[0]`, [Number(form.categoryId)]);
      
      
        body.append(`allergenId[0]`, [Number(form.allergenId)]);
      

      body.append("salePrice", Number(form.salePrice));
      body.append("originalPrice", Number(form.originalPrice));
      body.append("quantity", Number(form.quantity));
      if (image) {
        body.append('imageUrl', image)
      }
      // console.log('Form data:', Object.fromEntries(body));
      const resp = await uploadProductData(body);
      // console.log('Upload success:', resp);
      if (resp) {
        setLoading(false)
        onSuccessAdd?.()
        setForm({
          name: "",
          description: "",
          expirationDate: "",
          categoryId: 0,
          allergenId: 0,
          salePrice: "",
          originalPrice: "",
          quantity: "",
        })
        await Swal.fire({
          icon: "success",
          title: "สําเร็จ",
          text: "สร้างสินค้าเรียบร้อย",
          customClass: {
            container: 'swal-container-class',
            popup: 'swal-popup-class'
          },
          didOpen: () => {
            const swalContainer = document.querySelector('.swal-container-class');
            if (swalContainer) {
              swalContainer.style.zIndex = "100000";
            }
          }
        });

      }
    } catch (err) {
      setLoading(false)
      onSuccessAdd?.()
      console.error('Upload error:', err);
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: err.message || "ไม่สามารถเพิ่มสินค้าได้",
      });
    } finally {
      setLoading(false)
      // setForm({
      //   name: "",
      //   description: "",
      //   expirationDate: "",
      //   categoryId: 0,
      //   allergenId: 0,
      //   salePrice: "",
      //   originalPrice: "",
      //   quantity: "",
      // })
    }
  }, [form, image, uploadProductData])



  useEffect(() => {
    console.log(form);
  }, [form]);

  // / Custom Input Component for reusability
  const InputField = ({ label, name, type = "text", value, onChange, placeholder, options }) => {
    if (type === "select") {
      return (
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">{label}</label>
          <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full border rounded-lg p-2 focus:outline-none focus:border-[#5abd4f]"
            defaultValue=""
          >
            <option value="" disabled>{placeholder}</option>
            {options?.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      );
    }

    return (
      <div className="mb-4">
        <label className="block text-gray-700 mb-1">{label}</label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full border rounded-lg p-2 focus:outline-none focus:border-[#5abd4f]"
        />
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <form onSubmit={hdlUploadProduct} className="bg-white rounded-lg w-full">
        <h2 className="text-xl font-bold mb-6">เพิ่มสินค้า</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image Upload Section */}
          <div className="w-full">
            <div
              className={`w-full aspect-square md:aspect-video max-h-[300px] flex flex-col items-center justify-center border-2 border-dashed border-[#5abd4f] rounded-lg p-4 cursor-pointer group transition-all hover:border-[#4a9e40] hover:shadow-lg relative bg-white ${
                !showImage ? 'hover:bg-gray-50' : ''
              }`}
              onClick={openInput}
            >
              {showImage ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-w-full max-h-full object-contain rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <span className="bg-white/90 text-gray-700 px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                      คลิกเพื่อเปลี่ยนรูป
                    </span>
                  </div>
                </div>
              ) : (
                <>
                  <CloudUpload className="text-[#5abd4f] text-4xl mb-4" />
                  <p className="text-gray-500 text-center">คลิกเพื่อเลือกรูปภาพ</p>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                id="inputFile"
                className="hidden"
                onChange={hdlUploadFile}
              />
            </div>
          </div>

          {/* Product Details Section */}
          <div className="space-y-4">
            <InputField
              label="ชื่อสินค้า"
              name="name"
              value={form.name}
              onChange={hdlOnChange}
              placeholder="กรุณากรอกชื่อสินค้า"
            />

            <div className="mb-4">
              <label className="block text-gray-700 mb-1">รายละเอียดสินค้า</label>
              <textarea
                name="description"
                value={form.description}
                onChange={hdlOnChange}
                placeholder="กรุณากรอกรายละเอียดสินค้า"
                className="w-full border rounded-lg p-2 min-h-[100px] focus:outline-none focus:border-[#5abd4f]"
              />
            </div>

            <InputField
              label="ประเภทอาหาร"
              name="categoryId"
              type="select"
              value={form.categoryId}
              onChange={hdlOnChange}
              placeholder="กรุณาเลือกประเภทอาหาร"
              options={categories?.data}
            />

            <InputField
              label="มีส่วนผสมของ"
              name="allergenId"
              type="select"
              value={form.allergenId}
              onChange={hdlOnChange}
              placeholder="กรุณาเลือกส่วนประกอบสำหรับแพ้อาหาร"
              options={allergen?.data?.data}
            />
          </div>
        </div>

        {/* Price and Quantity Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <InputField
            label="ราคาปกติ"
            name="originalPrice"
            type="number"
            value={form.originalPrice}
            onChange={hdlOnChange}
            placeholder="฿฿"
          />

          <InputField
            label="ราคาพิเศษ"
            name="salePrice"
            type="number"
            value={form.salePrice}
            onChange={hdlOnChange}
            placeholder="฿฿"
          />

          <InputField
            label="วันหมดอายุ"
            name="expirationDate"
            type="date"
            value={form.expirationDate}
            onChange={hdlOnChange}
          />

          <InputField
            label="จำนวน"
            name="quantity"
            type="number"
            value={form.quantity}
            onChange={hdlOnChange}
            placeholder="0"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          {loading ? (
            <div className="flex justify-center w-full">
              <span className="loading loading-dots loading-lg"></span>
            </div>
          ) : (
            <button
              type="submit"
              className="bg-[#5abd4f] text-white font-semibold py-2 px-6 rounded-full hover:bg-[#4a9e40] transition-colors duration-200"
            >
              เพิ่มสินค้า
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductAdd;
