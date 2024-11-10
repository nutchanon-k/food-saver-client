import React, { useState, useRef, useEffect } from "react";
import useUserStore from "../../stores/userStore";
import { CloudUpload, Target } from "lucide-react";
import { getMeAPI, updateUserAPI } from "../../API/UserApi";

const UserProfile = () => {
  const user = useUserStore((state) => state.user);
  const getMe = useUserStore((state) => state.getMe);
  console.log(user);

  const [isEdit, setIsEdit] = useState(false);

  const [formUpdate, setFormUpdate] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
  });
  const [isValid, setIsValid] = useState(true);
  const [errors, setErrors] = useState({});

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneTest = /^0[0-9]{9}$/;
    return phoneTest.test(phoneNumber);
  };

  useEffect(() => {
    setFormUpdate({
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
    });
  }, []);

  const refFile = useRef();

  // image
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    console.log(formUpdate)
    if (!formUpdate.firstName.trim()) {
      newErrors.firstName = "กรุณากรอกชื่อ";
    }
    
    if (!formUpdate.lastName.trim()) {
      newErrors.lastName = "กรุณากรอกนามสกุล";
    }
    
    if (!formUpdate.phoneNumber) {
      newErrors.phoneNumber = "กรุณากรอกเบอร์โทรศัพท์";
    } else if (!isValidPhoneNumber(formUpdate.phoneNumber)) {
      newErrors.phoneNumber = "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง (0xxxxxxxxx)";
    }
    
    if (!formUpdate.address.trim()) {
      newErrors.address = "กรุณากรอกที่อยู่";
    }

    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0; //เช็คว่าในobjectของnewError มีerrorหรือไม่ถ้าใlenght = 0 คือไม่มีerror
    console.log(newErrors)
    setIsValid(isValid);
    return isValid;
  };

  const hdlInput = (e) => {
    setFormUpdate({
      ...formUpdate,
      [e.target.name]: e.target.value,
    });
  };

  const hdlOnchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      console.log(file);
    }
  };

  const hdlSubmit = async (e) => {
    console.log("start")
    try {
      e.preventDefault();
      console.log(validateForm())
      if (!validateForm()) {
        return;
      }

      setIsEdit(!isEdit);
      console.log(isEdit)
      const body = formUpdate;

      if (isEdit) {
        setLoading(true);
        console.log(file);
        const body = new FormData();
        body.append("firstName", formUpdate.firstName);
        body.append("lastName", formUpdate.lastName);
        body.append("phoneNumber", formUpdate.phoneNumber);
        body.append("address", formUpdate.address);
        console.log(body)
        if (file) {
          body.append("image", file);
        }
        const data = await updateUserAPI(body);
        console.log(data);
        setFile(null);
        getMe();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-xl font-semibold mb-6">My Profile</h1>
      <hr className="border-black mb-4" />
      {/* Upload Area */}
      <input
        type="file"
        name=""
        id="file-upload"
        ref={refFile}
        onChange={hdlOnchange}
        className="hidden"
      />

      {isEdit ? (
        !!file ? (
          <div className="m-auto flex justify-center">
            <img src={URL.createObjectURL(file)}></img>
          </div>
        ) : (
          <div className="mb-8 flex justify-center">
            <div
              onClick={() => {
                refFile.current.click();
              }}
              className="w-[230px] h-[230px] rounded-full border-2 border-dashed border-green-400 flex items-center justify-center cursor-pointer hover:bg-green-50 transition-colors"
            >
              <div className="text-center">
                <CloudUpload className="w-8 h-8 mx-auto text-green-500 mb-2" />
                <p className="text-sm text-gray-500">Browse Files to upload</p>
              </div>
            </div>
          </div>
        )
      ) : (
        <div className="flex flex-col justify-center items-center mb-6 ">
          <img
            className="w-[250px] h-[250px] border-2 rounded-full"
            src={user.profilePicture}
            alt=""
          />
          {loading && (
            <span className="loading loading-spinner text-info"></span>
          )}
        </div>
      )}

      {/* Form Fields */}
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ชื่อ
            </label>
            {isEdit ? (
              <div>
                <input
                  value={formUpdate.firstName}
                  onChange={hdlInput}
                  name="firstName"
                  type="text"
                  placeholder="Enter Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                />
                {!isValid && errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>
            ) : (
              <p className="w-full px-3 py-2 border-b-2">{user.firstName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              นามสกุล
            </label>
            {isEdit ? (
              <>
                <input
                  value={formUpdate.lastName}
                  onChange={hdlInput}
                  name="lastName"
                  type="text"
                  placeholder="Enter Last Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                />
                {!isValid && errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                )}
              </>
            ) : (
              <p className="w-full px-3 py-2 border-b-2">{user.lastName}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            เบอร์โทรศัพท์
          </label>
          {isEdit ? (
            <>
              <input
                value={formUpdate.phoneNumber}
                onChange={hdlInput}
                name="phoneNumber"
                type="tel"
                placeholder="Enter your phone number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              {!isValid && errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber}
                </p>
              )}
            </>
          ) : (
            <p className=" w-full px-3 py-2 border-b-2">{user.phoneNumber}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ที่อยู่
          </label>
          {isEdit ? (
            <>
              <textarea
                value={formUpdate.address}
                onChange={hdlInput}
                name="address"
                placeholder="Enter Address"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              />
              {!isValid && errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </>
          ) : (
            <p className="w-full px-3 py-2 border-b-2">{user.address}</p>
          )}
        </div>

        <div className="flex flex-col items-center gap-8 md:flex-row">
          <button
            className=" w-[50%] md:w-full bg-green-500 text-white py-3 px-4 rounded-[24px] hover:bg-green-600 transition-colors"
            type="submit"
            onClick={(e) => {
              e.preventDefault()
              console.log(145)
              return hdlSubmit(e)
            }}
          >
            {isEdit ? "Save" : "Edit"}
          </button>
          <button className="w-[50%] md:w-full bg-red-500 text-white py-3 px-4 rounded-[24px] hover:bg-red-600 transition-colors">
            Delete Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
