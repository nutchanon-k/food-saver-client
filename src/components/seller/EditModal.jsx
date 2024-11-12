import React, { useCallback } from "react"
import { useState, useEffect } from "react"
import useSellerAddProduct from "../../stores/seller store/SellerAddProduct";
import { CloudUpload } from "lucide-react"
import useUserStore from "../../stores/userStore"
import Swal from "sweetalert2"
import { CloseIcon } from '../../assets/icons/Icons'

const EditModal = ({ onSuccessEdit, product }) => {
    const [form, setForm] = useState({
        name: "",
        description: "",
        expirationDate: "",
        categoryId: 0,
        allergenId: 0,
        salePrice: "",
        originalPrice: "",
        quantity: "",
        imageUrl: ""
    });

    const [categories, setCategories] = useState([]);
    const [allergen, setAllergen] = useState([]);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(true);

    const getCategories = useSellerAddProduct((state) => state.getCategories);
    const getAllergen = useSellerAddProduct((state) => state.getAllergen);
    const EditProductData = useSellerAddProduct((state) => state.EditProductData);
    const user = useUserStore((state) => state.user);

    useEffect(() => {
        getCategoriesList();
        getAllergenList();
    }, []);

    useEffect(() => {
        if (product) {
            setForm({
                name: product.name,
                description: product.description,
                expirationDate: product.expirationDate,
                categoryId: product.productCategories[0]?.categoryId,
                allergenId: product.productAllergens[0]?.allergenId,
                salePrice: product.salePrice,
                originalPrice: product.originalPrice,
                quantity: product.quantity,
            });
            setImagePreview(product.imageUrl);
        }
    }, [product]);

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

    const getAllergenList = async () => {
        try {
            const AllergenResult = await getAllergen();
            console.log(AllergenResult);
            return setAllergen(AllergenResult);
        } catch (error) {
            console.log(error);
        }
    }

    const validateForm = () => {
        const newErrors = {};

        if (!form.name.trim()) {
            newErrors.name = "กรุณากรอกชื่อสินค้า";
        }
        if (!form.description.trim()) {
            newErrors.description = "กรุณากรอกรายละเอียดสินค้า";
        }
        if (!form.originalPrice) {
            newErrors.originalPrice = "กรุณากรอกราคาปกติ";
        }
        if (!form.salePrice) {
            newErrors.salePrice = "กรุณากรอกราคาพิเศษ";
        }
        if (!form.quantity) {
            newErrors.quantity = "กรุณากรอกจำนวน";
        }
        if (!form.expirationDate) {
            newErrors.expirationDate = "กรุณากรอกวันหมดอายุ";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const hdlInput = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setErrors({
            ...errors,
            [e.target.name]: "",
        });
    };

    const hdlEditProduct = useCallback(async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            const body = new FormData();
            body.append("name", form.name);
            body.append("description", form.description);
            body.append("expirationDate", form.expirationDate);

            for (let i = 0; i < form.categoryId.length; i++) {
                body.append(`categoryId[${i}]`, [Number(form.categoryId[i])]);
            }
            for (let i = 0; i < form.allergenId.length; i++) {
                body.append(`allergenId[${i}]`, [Number(form.allergenId[i])]);
            }

            body.append("salePrice", Number(form.salePrice));
            body.append("originalPrice", Number(form.originalPrice));
            body.append("quantity", Number(form.quantity));
            if (image) {
                body.append('imageUrl', image);
            }

            const resp = await EditProductData(product.id, body);

            if (resp) {
                onSuccessEdit?.();
                await Swal.fire({
                    icon: "success",
                    title: "สําเร็จ",
                    text: "แก้ไขสินค้าเรียบร้อย",
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
            console.error('Upload error:', err);
            Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด",
                text: err.message || "ไม่สามารถแก้สินค้าได้",
            });
        } finally {
            setLoading(false);
        }
    }, [form, image, EditProductData]);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            {/* Header */}
            <h2 className="text-xl font-bold mb-6">แก้ไขสินค้า</h2>
            <hr className="border-gray-300 mb-6" />

            {/* Form Container */}
            <form onSubmit={hdlEditProduct}>
                {/* Image Upload Section */}
                <div className="mb-6">
                    <div className="max-w-md mx-auto">
                        <div
                            className="flex flex-col items-center justify-center w-full h-[300px] border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 relative p-2"
                            onClick={() => document.getElementById('input-file').click()}
                        >
                            {/* Upload Icon and Text (Show when no image) */}
                            {!imagePreview && !product?.imageUrl && (
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <CloudUpload className="w-10 h-10 mb-3 text-gray-400" />
                                    <p className="text-sm text-gray-400">คลิกเพื่ออัพโหลดรูปภาพ</p>
                                </div>
                            )}

                            {/* Hidden File Input */}
                            <input
                                type="file"
                                id="input-file"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        setImage(file);
                                        setImagePreview(URL.createObjectURL(file));
                                    }
                                }}
                                accept="image/*"
                            />

                            {/* Image Preview */}
                            {(imagePreview || product?.imageUrl) && (
                                <>
                                    <div className="absolute top-2 right-2">
                                        <CloseIcon
                                            className="w-8 h-8 hover:scale-110 cursor-pointer opacity-60"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setImage(null);
                                                setImagePreview(null);
                                            }}
                                        />
                                    </div>
                                    <img
                                        src={imagePreview || product?.imageUrl}
                                        alt="Preview"
                                        className="max-w-full max-h-[250px] object-contain"
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Form Fields Container */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Left Column - Product Details */}
                    <div className="space-y-6">
                        {/* Product Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                ชื่อสินค้า
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={hdlInput}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                placeholder="กรุณากรอกชื่อสินค้า"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                            )}
                        </div>

                        {/* Product Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                รายละเอียดสินค้า
                            </label>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={hdlInput}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                placeholder="กรุณากรอกรายละเอียดสินค้า"
                                rows={4}
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                            )}
                        </div>

                        {/* Categories */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                ประเภทอาหาร
                            </label>
                            <select
                                name="categoryId"
                                value={form.categoryId}
                                onChange={hdlInput}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                            >
                                {categories?.data?.map((item, index) => (
                                    <option key={index} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Allergens */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                มีส่วนผสมของ
                            </label>
                            <select
                                name="allergenId"
                                value={form.allergenId}
                                onChange={hdlInput}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                            >
                                {allergen?.data?.data?.map((item, index) => (
                                    <option key={index} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Right Column - Prices and Quantities */}
                    <div className="grid grid-cols-2 gap-6 content-start">
                        {/* Original Price */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                ราคาปกติ
                            </label>
                            <input
                                type="number"
                                name="originalPrice"
                                value={form.originalPrice}
                                onChange={hdlInput}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                placeholder="฿฿"
                            />
                            {errors.originalPrice && (
                                <p className="text-red-500 text-sm mt-1">{errors.originalPrice}</p>
                            )}
                        </div>

                        {/* Sale Price */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                ราคาพิเศษ
                            </label>
                            <input
                                type="number"
                                name="salePrice"
                                value={form.salePrice}
                                onChange={hdlInput}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                                placeholder="฿฿"
                            />
                            {errors.salePrice && (
                                <p className="text-red-500 text-sm mt-1">{errors.salePrice}</p>
                            )}
                        </div>

                        {/* Expiration Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                วันหมดอายุ
                            </label>
                            <input
                                type="date"
                                name="expirationDate"
                                value={form.expirationDate}
                                onChange={hdlInput}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                            />
                            {errors.expirationDate && (
                                <p className="text-red-500 text-sm mt-1">{errors.expirationDate}</p>
                            )}
                        </div>

                        {/* Quantity */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                จำนวน
                            </label>
                            <input
                                type="number"
                                name="quantity"
                                value={form.quantity}
                                onChange={hdlInput}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                            />
                            {errors.quantity && (
                                <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-between mt-8">
                    {loading ? (
                        <div className="flex justify-center w-full">
                            <span className="loading loading-dots loading-lg"></span>
                        </div>
                    ) : (
                        <>
                            <button
                                type="button"
                                onClick={() => onSuccessEdit?.()}
                                className="bg-red-500 text-white font-semibold py-2 px-6 rounded-3xl hover:bg-red-600"
                            >
                                ยกเลิก
                            </button>
                            <button
                                type="submit"
                                className="bg-green-500 text-white font-semibold py-2 px-6 rounded-3xl hover:bg-green-600"
                            >
                                บันทึก
                            </button>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
};

export default EditModal