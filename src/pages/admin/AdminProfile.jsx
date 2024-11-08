import React, { useState, useRef, useEffect } from "react";
import useUserStore from "../../stores/userStore";
import { useNavigate } from "react-router-dom";


const AdminProfile = () => {
  const navigate = useNavigate();


  const user = useUserStore((state) => state.user);
  const getMe = useUserStore((state) => state.getMe);

  useEffect(() => {
    getMe();
  }, []);


  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-xl font-semibold mb-6">My Profile</h1>
      <hr className="border-black mb-4" />
      <div className="flex w-full h-full justify-center">
        
        {/* Picture Area */}
        <div className="flex flex-col justify-center items-center mb-6 ">
          <img
            className="w-[250px] h-[250px] border-2 rounded-full"
            src={user.profilePicture}
            alt=""
          />
        </div>
      </div>

      {/* Form Fields */}
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ชื่อ
            </label>
            <p className="w-full px-3 py-2 border-b-2">{user.firstName}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              นามสกุล
            </label>
            <p className="w-full px-3 py-2 border-b-2">{user.lastName}</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            เบอร์โทรศัพท์
          </label>
          <p className=" w-full px-3 py-2 border-b-2">{user.phoneNumber}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ที่อยู่
          </label>
          <p className="w-full px-3 py-2 border-b-2">{user.address}</p>
        </div>


        <div className="flex flex-col p-4 items-center gap-8 md:flex-row">
          <button
            className=" w-[50%] md:w-full bg-green-500 text-white py-3 px-4 rounded-xl hover:bg-green-600 transition-colors"
            type="button"
            onClick={(e) => {
              e.preventDefault()
              navigate('/admin-edit-profile')
            }}
          >
            Edit
          </button>
        </div>
      </form >
    </div >
  );
};



export default AdminProfile