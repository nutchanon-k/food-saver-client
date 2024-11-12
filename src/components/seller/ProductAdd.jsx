import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import useSellerAddProduct from "../../stores/seller store/SellerAddProduct";
import { CloudUpload } from "lucide-react";
import useUserStore from "../../stores/userStore";
import Swal from "sweetalert2";

const ProductAdd = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    expirationDate: "",
    categoryId: 0,
    allergenId: 0,
    salePrice: "",
    originalPrice: "",
    quantity: "",
  });

  const [categories, setCategories] = useState([]);
  const [allergen, setAllergen] = useState([]);



  const [image, setImage] = useState(null)
  const [showImage, setShowImage] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)



  const getCategories = useSellerAddProduct((state) => state.getCategories);
  const getAllergen = useSellerAddProduct((state) => state.getAllergen);
  const uploadProductData = useSellerAddProduct((state) => state.uploadProductData)
  const user = useUserStore((state)=>state.user)


  useEffect(() => {
    getCategoriesList();
    getAllergenList();
  }, []);

  console.log(user.store.id)


  const id = user.store.id;
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
    try {
      const body = new FormData()
      body.append("name", (form.name));
      body.append("description", (form.description));
      body.append("expirationDate", (form.expirationDate));
   
      for(let i = 0; i < form.categoryId.length ;i++ ){
        body.append(`categoryId[${i}]`, [Number(form.categoryId[i])]);
      }
      for(let i = 0; i < form.allergenId.length ;i++ ){
        body.append(`allergenId[${i}]`, [Number(form.allergenId[i])]);
      }
  
      body.append("salePrice", Number(form.salePrice));
      body.append("originalPrice", Number(form.originalPrice));
      body.append("quantity", Number(form.quantity));
      if (image) {
        body.append('imageUrl', image)
      }
      console.log('Form data:', Object.fromEntries(body)); //เพื่อจะได้ไม่ต้องใช้for of loop สำหรับconsole.log(ค่าในform) 
      const resp = await uploadProductData(body);
      console.log('Upload success:', resp);
      if (resp){
        Swal.fire({
          icon: "success",
          title: "สําเร็จ",
          text: "สร้างสินค้าเรียบร้อย",
      })
      }
    } catch (err) {
      console.error('Upload error:', err);
    }

  }, [form, image, uploadProductData])



  useEffect(() => {
    console.log(form);
  }, [form]);


  return (
    <div>
      {" "}
      <div className="flex items-center justify-center min-h-screen">
        <form onSubmit={hdlUploadProduct} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
          <h2 className="text-xl font-bold mb-6">เพิ่มสินค้า</h2>
          <div className="grid grid-cols-2 gap-6">


            {showImage ?

              (
                <div
                  className="w-full h-[300px] flex flex-col items-center justify-center border-2 border-dashed border-[#5abd4f] rounded-lg p-6 cursor-pointer group transition-all hover:border-[#4a9e40] hover:shadow-lg relative bg-white"
                  onClick={openInput}
                >
                  {/* Container สำหรับรูปภาพ */}
                  <div className="relative w-full h-full flex items-center justify-center mb-4">
                    <img
                      src={imagePreview}
                      alt="uploadImage"
                      className="max-w-full max-h-[200px] object-contain rounded-lg shadow-sm transition-transform group-hover:scale-[1.02]"
                    />
                    {/* Overlay เมื่อ hover */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <span className="bg-white/90 text-gray-700 px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                        คลิกเพื่อเปลี่ยนรูป
                      </span>
                    </div>
                  </div>

                  {/* Input file */}
                  <input
                    type="file"
                    accept="image/*"
                    name="image"
                    id="inputFile"
                    className="hidden"
                    onChange={hdlUploadFile}
                  />

                  {/* ข้อความด้านล่าง */}
                  <div className="flex items-center gap-2 text-gray-500 mt-2 group-hover:text-[#4a9e40] transition-colors">
                    <CloudUpload className="w-5 h-5" />
                    <p className="text-sm font-medium">Browse Files to upload</p>
                  </div>

                  {/* แสดงชื่อไฟล์ถ้ามี */}
                  {imagePreview && (
                    <p className="text-xs text-gray-400 mt-4  max-w-[200px] ">
                      {form.imageUrl?.name}
                    </p>
                  )}
                </div>
              ) : (

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
                    onChange={hdlUploadFile}
                  />
                  <CloudUpload className="text-[#5abd4f] text-4xl mb-4" />
                  <p className="text-gray-500">Browse Files to upload</p>
                </div>
              )

            }





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
            <button
              type="submit"
              className="bg-[#5abd4f] text-white font-semibold py-2 px-6 rounded-3xl">
              เพิ่มสินค้า
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductAdd;
