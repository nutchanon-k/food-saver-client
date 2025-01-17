// import React, { useEffect, useRef, useState } from "react";
// import { CloudUpload } from "lucide-react";
// import useUserStore from "../../stores/userStore";
// import { CloseIcon, UploadIcon } from "../../assets/icons/Icons";
// import { getMeAPI, patchSellerAPI } from "../../API/UserApi";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import moment from 'moment';
// import { p } from "framer-motion/client";
// import SellerMap from "../../components/seller/SellerMap";

// const StoreEdit = () => {
//   const navigate = useNavigate();
//   const store = useUserStore((state) => state.user.store);
//   const getMe = useUserStore((state) => state.getMe);



//   const storeId = store.id;
//   // console.log(store);
//   const [formUpdate, setFormUpdate] = useState({
//     storeName: "",
//     storeAddress: "",
//     storeDetails: "",
//     phoneNumber: "",
//     timeOpen: "",
//     timeClose: "",
//     latitude: "",
//     longitude: "",
//     profilePicture: "",
//   });


//   const [loading, setLoading] = useState(false);
//   const [image, setImage] = useState(null);
//   const [isValid, setIsValid] = useState(true);
//   const [errors, setErrors] = useState({});


//   useEffect(() => {
//     setFormUpdate({
//       storeName: store.storeName,
//       storeAddress: store.storeAddress,
//       storeDetails: store.storeDetails,
//       phoneNumber: store.phoneNumber,
//       timeOpen: moment(store?.timeOpen.slice(0, 16)).format('HH:mm'),
//       timeClose: moment(store?.timeClose.slice(0, 16)).format('HH:mm'),
//       latitude: store.latitude,
//       longitude: store.longitude,
//       profilePicture: store.profilePicture,
//     });
//   }, []);

//   //validate
//   const isValidPhoneNumber = (phoneNumber) => {
//     const phoneTest = /^0[0-9]{9}$/;
//     return phoneTest.test(phoneNumber);
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formUpdate.storeName.trim()) {
//       newErrors.storeName = "กรุณากรอกชื่อ";
//     }

//     if (!formUpdate.storeDetails.trim()) {
//       newErrors.storeDetails = "กรุณากรอกรายละเอียด";
//     }

//     if (!formUpdate.phoneNumber) {
//       newErrors.phoneNumber = "กรุณากรอกเบอร์โทรศัพท์";
//     } else if (!isValidPhoneNumber(formUpdate.phoneNumber)) {
//       newErrors.phoneNumber = "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (0xxxxxxxxx)";
//     }

//     if (!formUpdate.storeAddress.trim()) {
//       newErrors.storeAddress = "กรุณากรอกที่อยู่";
//     }
//     if (!(formUpdate.latitude)) {
//       newErrors.latitude = "กรุณากรอกพิกัดละติจูด";
//     }

//     if (!(formUpdate.longitude)) {
//       newErrors.longitude = "กรุณากรอกพิกัดลองจิจูด";
//     }

//     setErrors(newErrors);
//     const isValid = Object.keys(newErrors).length === 0;

//     setIsValid(isValid);
//     return isValid;
//   };

//   // ฟังก์ชันสำหรับการอัปเดตข้อมูล

//   const hdlOnChange = (e) => {
//     setFormUpdate({
//       ...formUpdate,
//       [e.target.name]: e.target.value,
//     });
//     setErrors({
//       ...errors,
//       [e.target.name]: "",
//     });
//   };

//   const hdlSubmit = async (e) => {
//     try {
//       e.preventDefault();
//       if (!validateForm()) {
//         return;
//       }
//       setLoading(true);

//       const body = new FormData();
//       body.append("storeName", String(formUpdate.storeName));
//       body.append("storeAddress", String(formUpdate.storeAddress));
//       body.append("storeDetails", String(formUpdate.storeDetails));
//       body.append("phoneNumber", String(formUpdate.phoneNumber));
//       body.append("timeOpen", `2023-01-01T${formUpdate.timeOpen}:00`);
//       body.append("timeClose", `2023-01-01T${formUpdate.timeClose}:00`);
//       body.append("latitude", String(formUpdate.latitude));
//       body.append("longitude", String(formUpdate.longitude));

//       if (image) {
//         body.append("profilePicture", image);

//       }
//       const res = await patchSellerAPI(storeId, body);
//       console.log("respon", res);
//       if (res) {
//         setImage(null);
//         Swal.fire({
//           icon: "success",
//           title: "อัปเดตข้อมูลสำเร็จ",
//           text: "ข้อมูลของคุณอัปเดตเรียบร้อยแล้ว",
//           showConfirmButton: false,
//         });
//         getMe()
//         navigate("/store-profile");
//       }

//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
      

//     }
//   };
//   // console.log(formUpdate)
//   // const timeOpen = moment(formUpdate?.timeOpen.slice(0, 16)).format('HH:mm');
//   // const timeClose = moment(formUpdate?.timeClose.slice(0, 16)).format('HH:mm');
//   // console.log(formUpdate.timeOpen.toISOString());
//   // `2023-01-01T${parsedTime.format('HH:mm:ss')}:00`
//   // console.log(convertTimeToISO(formUpdate.timeClose));
//   console.log(`2023-01-01T${formUpdate.timeClose}:00`);
//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-6xl bg-white shadow-md rounded-lg p-8">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold">แก้ไขร้านค้าของคุณ</h2>
//         </div>

//         <hr className="border-black mb-6" />
//         {/* Upload Image */}
//         <div className="col-span-2 form-control w-full h-full mb-6">
//           {formUpdate.profilePicture ? (
//             <div className="flex items-center justify-center w-full">
//               <div
//                 className="flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 relative p-2"
//                 onClick={() => document.getElementById("input-file").click()}
//               >
//                 <input
//                   type="file"
//                   id="input-file"
//                   className="hidden"
//                   onChange={(e) => setImage(e.target.files[0])}
//                 />
//                 <div className="w-full absolute top-1 right-1 flex justify-end">
//                   {formUpdate.profilePicture && (
//                     <CloseIcon
//                       className="w-10 h-10 hover:scale-110 active:scale-100 rounded-full cursor-pointer opacity-60"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         document.getElementById("input-file").value = "";
//                         setFormUpdate((prevData) => ({
//                           ...prevData,
//                           profilePicture: null,
//                         }));
//                       }}
//                     />
//                   )}
//                 </div>
//                 {formUpdate.profilePicture && (
//                   <img
//                     src={formUpdate.profilePicture}
//                     className="w-3/4 h-full object-cover"
//                   />
//                 )}
//               </div>
//             </div>
//           ) : (
//             <div className="flex items-center justify-center w-full h-full">
//               <div
//                 className="flex flex-col items-center justify-center w-full h-[250px] border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 relative p-2"
//                 onClick={() => document.getElementById("input-file").click()}
//               >
//                 {!image && (
//                   <div className="flex flex-col items-center justify-center pt-5 pb-6 ">
//                     <CloudUpload className="w-10 h-10 mb-3 text-green-500" />
//                     <p className="text-sm text-green-500">Click to upload</p>
//                   </div>
//                 )}
//                 <input
//                   type="file"
//                   id="input-file"
//                   className="hidden"
//                   onChange={(e) => setImage(e.target.files[0])}
//                 />
//                 <div className="w-full absolute top-1 right-1 flex justify-end">
//                   {image && (
//                     <CloseIcon
//                       className="w-10 h-10 hover:scale-110 active:scale-100 rounded-full cursor-pointer opacity-60"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         document.getElementById("input-file").value = "";
//                         setImage(null);
//                       }}
//                     />
//                   )}
//                 </div>
//                 {image && (
//                   <img
//                     src={URL.createObjectURL(image)}
//                     className="w-3/4 h-full object-cover"
//                   />
//                 )}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Form Fields */}
//         <form className="space-y-4">
//           <div>
//             <label className="block text-gray-700">Store Name</label>
//             <div>

//               <input
//                 onChange={hdlOnChange}
//                 value={formUpdate.storeName}
//                 name="storeName"
//                 type="text"
//                 className="w-full px-4 py-2 border rounded-md"
//                 placeholder="Enter Name"
//               />
//               {!isValid && errors.storeName && (
//                 <p className="text-red-500 text-sm mt-1">{errors.storeName}</p>
//               )}
//             </div>
//           </div>
//           <div>
//             <label className="block text-gray-700">Phone Number</label>
//             <input
//               onChange={hdlOnChange}
//               value={formUpdate.phoneNumber}
//               name="phoneNumber"
//               type="text"
//               className="w-full px-4 py-2 border rounded-md"
//               placeholder="Enter Phone Number"
//             />
//             {!isValid && errors.phoneNumber && (
//               <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
//             )}
//           </div>
//           <div>
//             <label className="block text-gray-700">Address</label>
//             <input
//               onChange={hdlOnChange}
//               value={formUpdate.storeAddress}
//               name="storeAddress"
//               type="text"
//               className="w-full px-4 py-2 border rounded-md"
//               placeholder="Enter Address"
//             />
//             {!isValid && errors.storeAddress && (
//               <p className="text-red-500 text-sm mt-1">{errors.storeAddress}</p>
//             )}
//           </div>
//           <div>
//             <label className="block text-gray-700">Detail</label>
//             <input
//               onChange={hdlOnChange}
//               value={formUpdate.storeDetails}
//               name="storeDetails"
//               type="text"
//               className="w-full px-4 py-2 border rounded-md"
//               placeholder="Enter Detail"
//             />
//             {!isValid && errors.storeDetails && (
//               <p className="text-red-500 text-sm mt-1">{errors.storeDetails}</p>
//             )}
//           </div>
//           <div className="flex  gap-8">
//             <div>
//               <label className="block text-gray-700">Time Open</label>
//               <input
//                 onChange={hdlOnChange}
//                 value={formUpdate.timeOpen}
//                 name="timeOpen"
//                 type="time"
//                 min="00:00"
//                 max="23:59"
//                 className="w-full px-4 py-2 border rounded-md"
//               />
//               {!isValid && errors.timeOpen && (
//                 <p className="text-red-500 text-sm mt-1">{errors.timeOpen}</p>
//               )}
//             </div>
//             <div>
//               <label className="block text-gray-700">Time Close</label>
//               <input
//                 onChange={hdlOnChange}
//                 value={formUpdate.timeClose}
//                 name="timeClose"
//                 type="time"
//                 min="00:00"
//                 max="23:59"
//                 className="w-full px-4 py-2 border rounded-md"
//               />
//             </div>
//           </div>

//           <div className="flex flex-col w-full gap-4">
//             <div>
//               <label className="block text-gray-700">Latitude</label>
//               <input
//                 onChange={hdlOnChange}
//                 value={formUpdate.latitude}
//                 name="latitude"
//                 type="text"
//                 className="w-full px-4 py-2 border rounded-md"
//               />
//               {!isValid && errors.latitude && (
//                 <p className="text-red-500 text-sm mt-1">{errors.latitude}</p>
//               )}
//             </div>
//             <div>
//               <label className="block text-gray-700">Longitude</label>

//               <input
//                 onChange={hdlOnChange}
//                 value={formUpdate.longitude}
//                 name="longitude"
//                 type="text"
//                 className="w-full px-4 py-2 border rounded-md"
//               />
//               {!isValid && errors.longitude && (
//                 <p className="text-red-500 text-sm mt-1">{errors.longitude}</p>
//               )}
//             </div>
//           </div>

//           <div className="mt-4">
//             <label className="block text-gray-700 mb-2">Map Location</label>
//             <div className="w-full h-[300px] bg-gray-100 border rounded-md flex items-center justify-center">
//               <SellerMap setState={setFormUpdate} latitude={formUpdate.latitude} longitude={formUpdate.longitude} canEdit={true} />
//             </div>
//           </div>

//           <div className="mt-6">
//             {loading ?
//               <div className='flex justify-center w-full'>
//                 <span className="loading loading-dots loading-lg"></span>
//               </div>
//               :
//               <div className="flex justify-between  mt-6">
//                 <button
//                   type="button"
//                   onClick={() => navigate("/store-profile")}
//                   className="w-[250px] px-4 py-4 bg-red-500 text-white rounded-xl"
//                 >
//                   Back
//                 </button>
//                 <button
//                   onClick={hdlSubmit}
//                   type="submit"
//                   className="w-[250px] px-4 py-4 bg-green-500 text-white rounded-xl text-center"
//                 >
//                   Save
//                 </button>
//               </div>
//             }
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default StoreEdit;



import React, { useEffect, useRef, useState } from "react";
import { CloudUpload } from "lucide-react";
import useUserStore from "../../stores/userStore";
import { CloseIcon } from "../../assets/icons/Icons";
import { patchSellerAPI } from "../../API/UserApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import moment from 'moment';
import SellerMap from "../../components/seller/SellerMap";

const StoreEdit = () => {
  const navigate = useNavigate();
  const store = useUserStore((state) => state.user.store);
  const getMe = useUserStore((state) => state.getMe);
  const storeId = store.id;

  const [formUpdate, setFormUpdate] = useState({
    storeName: "",
    storeAddress: "",
    storeDetails: "",
    phoneNumber: "",
    timeOpen: "",
    timeClose: "",
    latitude: "",
    longitude: "",
    profilePicture: "",
  });

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [isValid, setIsValid] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormUpdate({
      storeName: store.storeName,
      storeAddress: store.storeAddress,
      storeDetails: store.storeDetails,
      phoneNumber: store.phoneNumber,
      timeOpen: moment(store?.timeOpen.slice(0, 16)).format('HH:mm'),
      timeClose: moment(store?.timeClose.slice(0, 16)).format('HH:mm'),
      latitude: store.latitude,
      longitude: store.longitude,
      profilePicture: store.profilePicture,
    });
  }, []);

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneTest = /^0[0-9]{9}$/;
    return phoneTest.test(phoneNumber);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formUpdate.storeName.trim()) newErrors.storeName = "กรุณากรอกชื่อ";
    if (!formUpdate.storeDetails.trim()) newErrors.storeDetails = "กรุณากรอกรายละเอียด";
    if (!formUpdate.phoneNumber) {
      newErrors.phoneNumber = "กรุณากรอกเบอร์โทรศัพท์";
    } else if (!isValidPhoneNumber(formUpdate.phoneNumber)) {
      newErrors.phoneNumber = "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (0xxxxxxxxx)";
    }
    if (!formUpdate.storeAddress.trim()) newErrors.storeAddress = "กรุณากรอกที่อยู่";
    if (!(formUpdate.latitude)) newErrors.latitude = "กรุณากรอกพิกัดละติจูด";
    if (!(formUpdate.longitude)) newErrors.longitude = "กรุณากรอกพิกัดลองจิจูด";

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    setIsValid(isValid);
    return isValid;
  };

  const hdlOnChange = (e) => {
    setFormUpdate({ ...formUpdate, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!validateForm()) return;
      setLoading(true);

      const body = new FormData();
      body.append("storeName", String(formUpdate.storeName));
      body.append("storeAddress", String(formUpdate.storeAddress));
      body.append("storeDetails", String(formUpdate.storeDetails));
      body.append("phoneNumber", String(formUpdate.phoneNumber));
      body.append("timeOpen", `2023-01-01T${formUpdate.timeOpen}:00`);
      body.append("timeClose", `2023-01-01T${formUpdate.timeClose}:00`);
      body.append("latitude", String(formUpdate.latitude));
      body.append("longitude", String(formUpdate.longitude));
      if (image) body.append("profilePicture", image);

      const res = await patchSellerAPI(storeId, body);
      if (res) {
        setImage(null);
        Swal.fire({
          icon: "success",
          title: "อัปเดตข้อมูลสำเร็จ",
          text: "ข้อมูลของคุณอัปเดตเรียบร้อยแล้ว",
          showConfirmButton: false,
        });
        getMe();
        navigate("/store-profile");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 md:px-6 md:py-8">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-4 md:p-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">แก้ไขร้านค้าของคุณ</h2>
        </div>

        <hr className="border-black mb-4 md:mb-6" />

        {/* Upload Image */}
        <div className="mb-6">
          <div className="flex items-center justify-center w-full">
            <div
              className="flex flex-col items-center justify-center w-full h-[200px] md:h-[250px] border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 relative p-2"
              onClick={() => document.getElementById("input-file").click()}
            >
              <input
                type="file"
                id="input-file"
                className="hidden"
                onChange={(e) => setImage(e.target.files[0])}
              />
              {!formUpdate.profilePicture && !image && (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <CloudUpload className="w-8 h-8 md:w-10 md:h-10 mb-2 md:mb-3 text-green-500" />
                  <p className="text-sm text-green-500">Click to upload</p>
                </div>
              )}
              <div className="absolute top-1 right-1">
                {(formUpdate.profilePicture || image) && (
                  <CloseIcon
                    className="w-8 h-8 md:w-10 md:h-10 hover:scale-110 active:scale-100 rounded-full cursor-pointer opacity-60"
                    onClick={(e) => {
                      e.stopPropagation();
                      document.getElementById("input-file").value = "";
                      if (image) setImage(null);
                      else setFormUpdate(prev => ({ ...prev, profilePicture: null }));
                    }}
                  />
                )}
              </div>
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  className="w-full h-full object-contain"
                  alt="Preview"
                />
              ) : formUpdate.profilePicture && (
                <img
                  src={formUpdate.profilePicture}
                  className="w-full h-full object-contain"
                  alt="Store"
                />
              )}
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <form className="space-y-4 md:space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Store Name</label>
            <input
              onChange={hdlOnChange}
              value={formUpdate.storeName}
              name="storeName"
              type="text"
              className="w-full px-3 py-2 border rounded-md text-sm md:text-base"
              placeholder="Enter Name"
            />
            {!isValid && errors.storeName && (
              <p className="text-red-500 text-xs md:text-sm mt-1">{errors.storeName}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Phone Number</label>
            <input
              onChange={hdlOnChange}
              value={formUpdate.phoneNumber}
              name="phoneNumber"
              type="text"
              className="w-full px-3 py-2 border rounded-md text-sm md:text-base"
              placeholder="Enter Phone Number"
            />
            {!isValid && errors.phoneNumber && (
              <p className="text-red-500 text-xs md:text-sm mt-1">{errors.phoneNumber}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Address</label>
            <input
              onChange={hdlOnChange}
              value={formUpdate.storeAddress}
              name="storeAddress"
              type="text"
              className="w-full px-3 py-2 border rounded-md text-sm md:text-base"
              placeholder="Enter Address"
            />
            {!isValid && errors.storeAddress && (
              <p className="text-red-500 text-xs md:text-sm mt-1">{errors.storeAddress}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Detail</label>
            <input
              onChange={hdlOnChange}
              value={formUpdate.storeDetails}
              name="storeDetails"
              type="text"
              className="w-full px-3 py-2 border rounded-md text-sm md:text-base"
              placeholder="Enter Detail"
            />
            {!isValid && errors.storeDetails && (
              <p className="text-red-500 text-xs md:text-sm mt-1">{errors.storeDetails}</p>
            )}
          </div>

          {/* Time Section */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <div className="flex-1">
              <label className="block text-gray-700 text-sm font-medium mb-1">Time Open</label>
              <input
                onChange={hdlOnChange}
                value={formUpdate.timeOpen}
                name="timeOpen"
                type="time"
                min="00:00"
                max="23:59"
                className="w-full px-3 py-2 border rounded-md text-sm md:text-base"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 text-sm font-medium mb-1">Time Close</label>
              <input
                onChange={hdlOnChange}
                value={formUpdate.timeClose}
                name="timeClose"
                type="time"
                min="00:00"
                max="23:59"
                className="w-full px-3 py-2 border rounded-md text-sm md:text-base"
              />
            </div>
          </div>

          {/* Location Section */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Latitude</label>
              <input
                onChange={hdlOnChange}
                value={formUpdate.latitude}
                name="latitude"
                type="text"
                className="w-full px-3 py-2 border rounded-md text-sm md:text-base"
              />
              {!isValid && errors.latitude && (
                <p className="text-red-500 text-xs md:text-sm mt-1">{errors.latitude}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Longitude</label>
              <input
                onChange={hdlOnChange}
                value={formUpdate.longitude}
                name="longitude"
                type="text"
                className="w-full px-3 py-2 border rounded-md text-sm md:text-base"
              />
              {!isValid && errors.longitude && (
                <p className="text-red-500 text-xs md:text-sm mt-1">{errors.longitude}</p>
              )}
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Map Location</label>
            <div className="w-full h-[250px] md:h-[300px] bg-gray-100 border rounded-md">
              <SellerMap
                setState={setFormUpdate}
                latitude={formUpdate.latitude}
                longitude={formUpdate.longitude}
                canEdit={true}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6">
            {loading ? (
              <div className="flex justify-center w-full">
                <span className="loading loading-dots loading-lg"></span>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row justify-between gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => navigate("/store-profile")}
                  className="w-full md:w-[250px] px-4 py-3 md:py-4 bg-red-500 text-white rounded-xl text-sm md:text-base"
                >
                  Back
                </button>
                <button
                  onClick={hdlSubmit}
                  type="submit"
                  className="w-full md:w-[250px] px-4 py-3 md:py-4 bg-green-500 text-white rounded-xl text-center text-sm md:text-base"
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

export default StoreEdit;