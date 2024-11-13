import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../stores/userStore";
import { Eye, EyeOff, Upload } from "lucide-react";
import Swal from "sweetalert2";
import SellerMap from "../../components/seller/SellerMap";

const CreateStore = () => {
  const navigate = useNavigate();
  const createUser = useUserStore((state) => state.createUser);
  const createSellerStore = useUserStore((state) => state.createSellerStore);
  const [formCreateStore, setFormCreateStore] = useState({
    // Store Information
    storeName: "",
    storeAddress: "",
    storeDetails: "",
    phoneNumber: "",
    timeOpen: "",
    timeClose: "",
    latitude: 0,
    longitude: 0,
    profilePicture: null, // สำหรับเก็บไฟล์รูปภาพ
  });

  const [isValid, setIsValid] = useState(true);
  const [errors, setErrors] = useState({});

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneTest = /^0[0-9]{9}$/;
    return phoneTest.test(phoneNumber);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formCreateStore.storeName.trim()) {
      newErrors.storeName = "กรุณาstoreName";
    }

    if (!formCreateStore.storeAddress.trim()) {
      newErrors.storeAddress = "กรุณากรอกstoreAddress";
    }

    if (!formCreateStore.storeDetails.trim()) {
      newErrors.storeDetails = "กรุณากรอกstoreDetails";
    }

    if (!formCreateStore.phoneNumber.trim()) {
      newErrors.phoneNumber = "กรุณากรอกเบอร์โทรศัพท์";
    } else if (!isValidPhoneNumber(formCreateStore.phoneNumber)) {
      newErrors.phoneNumber = "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (0xxxxxxxxx)";
    }

    if (!formCreateStore.timeOpen) {
      newErrors.timeOpen = "กรุณากรอกtimeOpen";
    }

    if (!formCreateStore.timeClose) {
      newErrors.timeClose = "กรุณากรอกtimeClose";
    }
    if (!formCreateStore.latitude) {
      newErrors.latitude = "กรุณากรอกlatitude";
    }
    if (!formCreateStore.longitude) {
      newErrors.longitude = "กรุณากรอกlongitude";
    }
    if (!formCreateStore.profilePicture) {
      newErrors.profilePicture = "กรุณากรอกprofilePicture";
    }

    setErrors(newErrors);
    const valid = Object.keys(newErrors).length === 0;
    setIsValid(valid);
    return valid;
  };

  const hdlOnChange = (e) => {
    console.log(formCreateStore);
    if (e.target.type === "file") {
      setFormCreateStore((prev) => ({
        ...prev,
        [e.target.name]: e.target.files[0],
      }));
      // Clear error for this field if it exists
      if (errors[e.target.name]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[e.target.name];
          return newErrors;
        });
      }
    } else {
      setFormCreateStore((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
      // Clear error for this field if it exists
      if (errors[e.target.name]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[e.target.name];
          return newErrors;
        });
      }
    }
  };

  useEffect(() => {
    validateForm();
  }, [formCreateStore]);

  const hdlSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validateForm()) {
        return;
      }
      const body = new FormData();
      body.append("storeName", formCreateStore.storeName);
      body.append("storeAddress", formCreateStore.storeAddress);
      body.append("storeDetails", formCreateStore.storeDetails);
      body.append("phoneNumber", formCreateStore.phoneNumber);
      body.append("timeOpen", formCreateStore.timeOpen);
      body.append("timeClose", formCreateStore.timeClose);
      body.append("latitude", formCreateStore.latitude);
      body.append("longitude", formCreateStore.longitude);
      body.append("profilePicture", formCreateStore.profilePicture);
      console.log("Form data:", Object.fromEntries(body));
      const data = await createSellerStore(body);
      console.log(data);
      if (data) {
        Swal.fire({
          icon: "success",
          title: "สําเร็จ",
          text: "สร้างร้านค้าเรียบร้อย",
        });
      }

      navigate("/");
      window.location.reload();
    } catch (error) {
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 login-image">
      <div className="max-w-xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Create Store
        </h1>
        <hr className="border-black mb-6" />

        <form onSubmit={hdlSubmit} className="space-y-4">
          {/* Store Information Section */}
          <h2 className="text-xl font-medium mb-4 mt-8">Store Information</h2>

          <div>
            <label className="block text-sm font-medium mb-1">Store Name</label>
            <input
              type="text"
              name="storeName"
              value={formCreateStore.storeName}
              onChange={hdlOnChange}
              placeholder="Enter Store Name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.storeName && (
              <p className="text-red-500 text-sm mt-1">{errors.storeName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Store Address
            </label>
            <textarea
              name="storeAddress"
              value={formCreateStore.storeAddress}
              onChange={hdlOnChange}
              placeholder="Enter Store Address"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.storeAddress && (
              <p className="text-red-500 text-sm mt-1">{errors.storeAddress}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Store Details
            </label>
            <textarea
              name="storeDetails"
              value={formCreateStore.storeDetails}
              onChange={hdlOnChange}
              placeholder="Enter Store Details"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.storeDetails && (
              <p className="text-red-500 text-sm mt-1">{errors.storeDetails}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Store Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formCreateStore.phoneNumber}
                onChange={hdlOnChange}
                placeholder="Enter Store Phone Number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Store Profile Picture
              </label>
              <input
                type="file"
                name="profilePicture"
                onChange={hdlOnChange}
                accept="image/*"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {errors.profilePicture && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.profilePicture}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Opening Time
              </label>
              <input
                type="time"
                name="timeOpen"
                value={formCreateStore.timeOpen}
                onChange={hdlOnChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {errors.timeOpen && (
                <p className="text-red-500 text-sm mt-1">{errors.timeOpen}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Closing Time
              </label>
              <input
                type="time"
                name="timeClose"
                value={formCreateStore.timeClose}
                onChange={hdlOnChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {errors.timeClose && (
                <p className="text-red-500 text-sm mt-1">{errors.timeClose}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Latitude</label>
              <input
                type="number"
                name="latitude"
                value={formCreateStore.latitude}
                onChange={hdlOnChange}
                step="any"
                placeholder="Enter Latitude"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />

              {errors.latitude && (
                <p className="text-red-500 text-sm mt-1">{errors.latitude}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Longitude
              </label>
              <input
                type="number"
                name="longitude"
                value={formCreateStore.longitude}
                onChange={hdlOnChange}
                step="any"
                placeholder="Enter Longitude"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {errors.longitude && (
                <p className="text-red-500 text-sm mt-1">{errors.longitude}</p>
              )}
            </div>
            <div className="w-full col-span-2 h-[400px] border rounded-lg overflow-hidden">
              <SellerMap setState={setFormCreateStore} canEdit={true}/>
            </div>
          </div>

          <p className="text-sm text-gray-600 text-center mt-4">
            By clicking Create account, you agree to the system's{" "}
            <a href="#" className="text-orange-400 hover:underline">
              Terms and policies
            </a>
          </p>

          <button
            type="submit"
            className="w-full bg-gray-400 text-white py-2 rounded-lg mt-4 hover:bg-gray-500"
            disabled={!isValid}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateStore;
