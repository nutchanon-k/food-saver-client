// import React, { useEffect, useState } from "react";
// import { CloseIcon, UploadIcon } from "../../assets/icons/Icons";
// import { useNavigate } from "react-router-dom";
// import useUserStore from "../../stores/userStore";
// import { updateUserAPI } from "../../API/UserApi";
// import Swal from "sweetalert2";

// const EditSellerProfile = () => {
//     const navigate = useNavigate();
//     const user = useUserStore((state) => state.user);

//     const [formUpdate, setFormUpdate] = useState({
//         firstName: "",
//         lastName: "",
//         phoneNumber: "",
//         address: "",
//         profilePicture: "",
//     });

//     useEffect(() => {
//         setFormUpdate({
//             firstName: user.firstName,
//             lastName: user.lastName,
//             phoneNumber: user.phoneNumber,
//             address: user.address,
//             profilePicture: user.profilePicture,
//         });
//     }, []);

//     const [isValid, setIsValid] = useState(true);
//     const [errors, setErrors] = useState({});
//     const [image, setImage] = useState(null);
//     const [loading, setLoading] = useState(false);

//     const isValidPhoneNumber = (phoneNumber) => {
//         const phoneTest = /^0[0-9]{9}$/;
//         return phoneTest.test(phoneNumber);
//     };

//     const validateForm = () => {
//         const newErrors = {};

//         if (!formUpdate.firstName.trim()) {
//             newErrors.firstName = "กรุณากรอกชื่อ";
//         }

//         if (!formUpdate.lastName.trim()) {
//             newErrors.lastName = "กรุณากรอกนามสกุล";
//         }

//         if (!formUpdate.phoneNumber) {
//             newErrors.phoneNumber = "กรุณากรอกเบอร์โทรศัพท์";
//         } else if (!isValidPhoneNumber(formUpdate.phoneNumber)) {
//             newErrors.phoneNumber = "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (0xxxxxxxxx)";
//         }

//         if (!formUpdate.address.trim()) {
//             newErrors.address = "กรุณากรอกที่อยู่";
//         }

//         setErrors(newErrors);
//         const isValid = Object.keys(newErrors).length === 0;

//         setIsValid(isValid);
//         return isValid;
//     };

//     const hdlInput = (e) => {
//         setFormUpdate({
//             ...formUpdate,
//             [e.target.name]: e.target.value,
//         });
//         setErrors({
//             ...errors,
//             [e.target.name]: "",
//         });
//     };

//     const hdlSubmit = async (e) => {
//         try {
//             e.preventDefault();
//             if (!validateForm()) {
//                 return;
//             }
//             setLoading(true);

//             const body = new FormData();
//             body.append("firstName", formUpdate.firstName);
//             body.append("lastName", formUpdate.lastName);
//             body.append("phoneNumber", formUpdate.phoneNumber);
//             body.append("address", formUpdate.address);

//             if (image) {
//                 body.append("profilePicture", image);
//             }
//             const data = await updateUserAPI(body);
//             if (data) {
//                 setImage(null);
//                 Swal.fire({
//                     icon: "success",
//                     title: "สําเร็จ",
//                     text: "แก้ไขข้อมูลส่วนตัวเรียบร้อยแล้ว",
//                 })

//                 navigate("/seller-profile");
//             }

//         } catch (error) {
//             console.log(error);
//         } finally {
//             setLoading(false)
            
//         }
//     };

//     return (
//         <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
//             <h1 className="text-xl font-semibold mb-6">My Profile</h1>
//             <hr className="border-black mb-4" />
//             <div className="flex w-full h-full justify-center">
//                 {/* Upload Area */}
//                 <div className="col-span-2 form-control w-1/2 h-full ">
//                     {formUpdate.profilePicture ? (
//                         <div className="flex items-center justify-center w-full">
//                             <div
//                                 className="flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 relative p-2"
//                                 onClick={() => document.getElementById("input-file").click()}
//                             >
//                                 <input
//                                     type="file"
//                                     id="input-file"
//                                     className="hidden"
//                                     onChange={(e) => setImage(e.target.files[0])}
//                                 />
//                                 <div className="w-full absolute top-1 right-1 flex justify-end">
//                                     {formUpdate.profilePicture && (
//                                         <CloseIcon
//                                             className="w-10 h-10 hover:scale-110 active:scale-100 rounded-full cursor-pointer opacity-60"
//                                             onClick={(e) => {
//                                                 e.stopPropagation();
//                                                 document.getElementById("input-file").value = "";
//                                                 setFormUpdate((prevData) => ({
//                                                     ...prevData,
//                                                     profilePicture: null,
//                                                 }));
//                                             }}
//                                         />
//                                     )}
//                                 </div>
//                                 {formUpdate.profilePicture && (
//                                     <img
//                                         src={formUpdate.profilePicture}
//                                         className="w-3/4 h-full object-cover"
//                                     />
//                                 )}
//                             </div>
//                         </div>
//                     ) : (
//                         <div className="flex items-center justify-center w-full h-full">
//                             <div
//                                 className="flex flex-col items-center justify-center w-full h-[250px] border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 relative p-2"
//                                 onClick={() => document.getElementById("input-file").click()}
//                             >
//                                 {!image && (
//                                     <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                                         <UploadIcon className="w-10 h-10 mb-3 text-gray-400" />
//                                         <p className="text-sm text-gray-400">Click to upload</p>
//                                     </div>
//                                 )}
//                                 <input
//                                     type="file"
//                                     id="input-file"
//                                     className="hidden"
//                                     onChange={(e) => setImage(e.target.files[0])}
//                                 />
//                                 <div className="w-full absolute top-1 right-1 flex justify-end">
//                                     {image && (
//                                         <CloseIcon
//                                             className="w-10 h-10 hover:scale-110 active:scale-100 rounded-full cursor-pointer opacity-60"
//                                             onClick={(e) => {
//                                                 e.stopPropagation();
//                                                 document.getElementById("input-file").value = "";
//                                                 setImage(null);
//                                             }}
//                                         />
//                                     )}
//                                 </div>
//                                 {image && (
//                                     <img
//                                         src={URL.createObjectURL(image)}
//                                         className="w-3/4 h-full object-cover"
//                                     />
//                                 )}
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* Form Fields */}
//             <form className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             ชื่อ
//                         </label>

//                         <div>
//                             <input
//                                 value={formUpdate.firstName}
//                                 onChange={hdlInput}
//                                 name="firstName"
//                                 type="text"
//                                 placeholder="Enter Name"
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
//                             />
//                             {!isValid && errors.firstName && (
//                                 <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
//                             )}
//                         </div>
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                             นามสกุล
//                         </label>
//                         <input
//                             value={formUpdate.lastName}
//                             onChange={hdlInput}
//                             name="lastName"
//                             type="text"
//                             placeholder="Enter Last Name"
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
//                         />
//                         {!isValid && errors.lastName && (
//                             <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
//                         )}
//                     </div>
//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                         เบอร์โทรศัพท์
//                     </label>
//                     <input
//                         value={formUpdate.phoneNumber}
//                         onChange={hdlInput}
//                         name="phoneNumber"
//                         type="tel"
//                         placeholder="Enter your phone number"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
//                     />
//                     {!isValid && errors.phoneNumber && (
//                         <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
//                     )}
//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                         ที่อยู่
//                     </label>
//                     <textarea
//                         value={formUpdate.address}
//                         onChange={hdlInput}
//                         name="address"
//                         placeholder="Enter Address"
//                         rows={4}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
//                     />
//                     {!isValid && errors.address && (
//                         <p className="text-red-500 text-sm mt-1">{errors.address}</p>
//                     )}
//                 </div>

//                 <div className="flex flex-col p-4 items-center gap-8 md:flex-row">
//                     {loading ? (
//                         <div className="flex justify-center w-full">
//                             <span className="loading loading-dots loading-lg"></span>
//                         </div>
//                     ) : (
//                         <>
//                             <button
//                                 type="button"
//                                 onClick={() => {
//                                     navigate("/seller-profile");
//                                 }}
//                                 className="w-[50%] md:w-full bg-red-500 text-white py-3 px-4 rounded-xl hover:bg-red-600 transition-colors"
//                             >
//                                 Back
//                             </button>
//                             <button
//                                 className=" w-[50%] md:w-full bg-green-500 text-white py-3 px-4 rounded-xl hover:bg-green-600 transition-colors"
//                                 type="submit"
//                                 onClick={(e) => { hdlSubmit(e) }}
//                             >
//                                 Save
//                             </button>
//                         </>
//                     )}
//                 </div>
//             </form>
//         </div>
//     )
// }

// export default EditSellerProfile



import React, { useEffect, useState } from "react";
import { CloseIcon, UploadIcon } from "../../assets/icons/Icons";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../stores/userStore";
import { updateUserAPI } from "../../API/UserApi";
import Swal from "sweetalert2";

const EditSellerProfile = () => {
    const navigate = useNavigate();
    const user = useUserStore((state) => state.user);
    const [formUpdate, setFormUpdate] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        profilePicture: "",
    });
    const [isValid, setIsValid] = useState(true);
    const [errors, setErrors] = useState({});
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setFormUpdate({
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            profilePicture: user.profilePicture,
        });
    }, []);

    const isValidPhoneNumber = (phoneNumber) => {
        const phoneTest = /^0[0-9]{9}$/;
        return phoneTest.test(phoneNumber);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formUpdate.firstName.trim()) newErrors.firstName = "กรุณากรอกชื่อ";
        if (!formUpdate.lastName.trim()) newErrors.lastName = "กรุณากรอกนามสกุล";
        if (!formUpdate.phoneNumber) {
            newErrors.phoneNumber = "กรุณากรอกเบอร์โทรศัพท์";
        } else if (!isValidPhoneNumber(formUpdate.phoneNumber)) {
            newErrors.phoneNumber = "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (0xxxxxxxxx)";
        }
        if (!formUpdate.address.trim()) newErrors.address = "กรุณากรอกที่อยู่";

        setErrors(newErrors);
        const isValid = Object.keys(newErrors).length === 0;
        setIsValid(isValid);
        return isValid;
    };

    const hdlInput = (e) => {
        setFormUpdate({ ...formUpdate, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const hdlSubmit = async (e) => {
        try {
            e.preventDefault();
            if (!validateForm()) return;
            setLoading(true);

            const body = new FormData();
            body.append("firstName", formUpdate.firstName);
            body.append("lastName", formUpdate.lastName);
            body.append("phoneNumber", formUpdate.phoneNumber);
            body.append("address", formUpdate.address);
            if (image) body.append("profilePicture", image);

            const data = await updateUserAPI(body);
            if (data) {
                setImage(null);
                Swal.fire({
                    icon: "success",
                    title: "สําเร็จ",
                    text: "แก้ไขข้อมูลส่วนตัวเรียบร้อยแล้ว",
                });
                navigate("/seller-profile");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-6 md:py-8">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-4 md:p-6">
                {/* Header */}
                <div className="mb-4 md:mb-6">
                    <h1 className="text-lg md:text-xl font-semibold">My Profile</h1>
                    <hr className="border-black mt-4" />
                </div>

                {/* Upload Image Area */}
                <div className="flex justify-center mb-6">
                    <div className="w-full md:w-1/2">
                        <div className="relative">
                            <div
                                className="flex flex-col items-center justify-center w-full h-[180px] md:h-[250px] border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 p-2"
                                onClick={() => document.getElementById("input-file").click()}
                            >
                                <input
                                    type="file"
                                    id="input-file"
                                    className="hidden"
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                                {!formUpdate.profilePicture && !image ? (
                                    <div className="flex flex-col items-center justify-center">
                                        <UploadIcon className="w-8 h-8 md:w-10 md:h-10 mb-2 text-gray-400" />
                                        <p className="text-sm text-gray-400">Click to upload</p>
                                    </div>
                                ) : (
                                    <img
                                        src={image ? URL.createObjectURL(image) : formUpdate.profilePicture}
                                        className="w-full h-full object-contain rounded-lg"
                                        alt="Profile"
                                    />
                                )}
                                {(formUpdate.profilePicture || image) && (
                                    <button
                                        className="absolute top-2 right-2"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            document.getElementById("input-file").value = "";
                                            if (image) setImage(null);
                                            else setFormUpdate(prev => ({ ...prev, profilePicture: null }));
                                        }}
                                    >
                                        <CloseIcon className="w-6 h-6 md:w-8 md:h-8 text-gray-500 hover:text-gray-700" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Fields */}
                <form className="space-y-4 md:space-y-6">
                    {/* Name Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                ชื่อ
                            </label>
                            <input
                                value={formUpdate.firstName}
                                onChange={hdlInput}
                                name="firstName"
                                type="text"
                                placeholder="Enter Name"
                                className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                            />
                            {!isValid && errors.firstName && (
                                <p className="text-red-500 text-xs md:text-sm mt-1">{errors.firstName}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                นามสกุล
                            </label>
                            <input
                                value={formUpdate.lastName}
                                onChange={hdlInput}
                                name="lastName"
                                type="text"
                                placeholder="Enter Last Name"
                                className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                            />
                            {!isValid && errors.lastName && (
                                <p className="text-red-500 text-xs md:text-sm mt-1">{errors.lastName}</p>
                            )}
                        </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            เบอร์โทรศัพท์
                        </label>
                        <input
                            value={formUpdate.phoneNumber}
                            onChange={hdlInput}
                            name="phoneNumber"
                            type="tel"
                            placeholder="Enter your phone number"
                            className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                        {!isValid && errors.phoneNumber && (
                            <p className="text-red-500 text-xs md:text-sm mt-1">{errors.phoneNumber}</p>
                        )}
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            ที่อยู่
                        </label>
                        <textarea
                            value={formUpdate.address}
                            onChange={hdlInput}
                            name="address"
                            placeholder="Enter Address"
                            rows={4}
                            className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                        {!isValid && errors.address && (
                            <p className="text-red-500 text-xs md:text-sm mt-1">{errors.address}</p>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 pt-4">
                        {loading ? (
                            <div className="flex justify-center">
                                <span className="loading loading-dots loading-lg"></span>
                            </div>
                        ) : (
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                                <button
                                    type="button"
                                    onClick={() => navigate("/seller-profile")}
                                    className="w-full md:w-[250px] px-4 py-3 md:py-4 bg-red-500 text-white rounded-xl text-sm md:text-base hover:bg-red-600 transition-colors"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    onClick={hdlSubmit}
                                    className="w-full md:w-[250px] px-4 py-3 md:py-4 bg-green-500 text-white rounded-xl text-sm md:text-base hover:bg-green-600 transition-colors"
                                >
                                    Save
                                </button>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditSellerProfile;