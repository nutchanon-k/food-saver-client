import React, { useRef, useState } from "react";
import { CloudUpload } from "lucide-react";
import useUserStore from "../../stores/userStore";
import { p } from "framer-motion/client";

const MerchantProfile = () => {
  const [isOpen, setIsOpen] = useState(true);
  const store = useUserStore((state) => state.user.store);
  const patchSellerProfile = useUserStore((state) => state.patchSellerProfile);

  const [isEdit, setIsEdit] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log(store);
  const [formUpdate, setFormUpdate] = useState({
    storeName: "",
    storeAddress: "",
    storeDetails: "",
    phoneNumber: "",
    timeOpen: "",
    timeClose: "",
    latitude: "",
    longitude: "",
  });
  const storeId = store.id;
  const refFile = useRef();

  const hdlOnChange = (e) => {
    console.log(e.target.value);
    setFormUpdate({
      ...formUpdate,
      [e.target.name]: e.target.value,
    });
  };

  const hdlImage = (e) => {
    const pic = e.target.files[0];
    if (pic) {
      setFile(pic);
      console.log(pic);
    }
  };

  const hdlSubmit = async (e) => {
    console.log("submit");
    try {
      e.preventDefault();
      console.log(data);
      const body = new FormData();
      body.append("storeName", formUpdate.storeName);
      body.append("storeDetail", formUpdate.storeDetails);
      body.append("storeAddress", formUpdate.storeAddress);
      body.append("phoneNumber", formUpdate.phoneNumber);
      body.append("storeName", formUpdate.storeName);

      if (file) {
        body.append("image", file);
      }
      const data = await patchSellerProfile(formUpdate, storeId);
      console.log(data);
      setFile(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center  items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">My Profile</h2>
          <label className="flex items-center cursor-pointer">
            <span className="mr-2 text-gray-600">เปิด - ปิด ร้าน</span>

            <input
              type="checkbox"
              className="toggle-checkbox hidden"
              checked={isOpen}
              onChange={() => setIsOpen(!isOpen)}
            />
            <input
              type="checkbox"
              className="toggle toggle-success"
              defaultChecked
            />
          </label>
        </div>

        <hr className="border-black mb-6" />
        <input
          type="file"
          name=""
          id="file-upload"
          ref={refFile}
          onChange={hdlImage}
          className="hidden"
        />
        <div className="mb-4 flex flex-col items-center">
          <div
            onClick={() => refFile.current.click()}
            className="w-[200px] h-[200px] border-2 border-dashed border-green-500 rounded-full flex flex-col justify-center items-center"
          >
            <input type="file" className="hidden" />
            <CloudUpload className="w-8 h-8 mx-auto text-green-500 mb-2" />
            <p className="text-sm text-gray-400">Browse files to upload</p>
          </div>
        </div>

        <form onSubmit={hdlSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Store Name</label>
            {isEdit ? (
              <input
                onChange={hdlOnChange}
                name="storeName"
                type="text"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Enter Name"
              />
            ) : (
              <p className="w-full px-3 py-2 border-b-2">{store.storeName}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700">Phone Number</label>
            {isEdit ? (
              <input
                onChange={hdlOnChange}
                name="phoneNumber"
                type="text"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Enter your phone number"
              />

            )
            :(
              <p className="w-full px-3 py-2 border-b-2">{store.phoneNumber}</p>
            )
          }
          </div>
          <div>
            <label className="block text-gray-700">Address</label>
            {isEdit ? (
              <input
                onChange={hdlOnChange}
                name="storeAddress"
                type="text"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Enter Address"
              />

            )
            :(
              <p className="w-full px-3 py-2 border-b-2">{store.storeAddress}</p>
            )
          }
          </div>
          <div>
            <label className="block text-gray-700">Detail</label>
            {isEdit ?(
              <input
                onChange={hdlOnChange}
                name="storeDetails"
                type="text"
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Enter Detail"
              />

            )
            :(
              <p className="w-full px-3 py-2 border-b-2">{store.storeDetails}</p>
            )
            }
          </div>
          <div className="flex  gap-8">
            <div>
              <label className="block text-gray-700">Time Open</label>
              {isEdit ?(
                <input
                  onChange={hdlOnChange}
                  name="timeOpen"
                  type="time"
                  className="w-full px-4 py-2 border rounded-md"
                />
                
              )
              :(
                <p className="w-full px-3 py-2 border-b-2">{store.timeOpen}</p>
              )
              }
            </div>
            <div>
              <label className="block text-gray-700">Time Close</label>
              {isEdit ?(
                <input
                  onChange={hdlOnChange}
                  name="timeClose"
                  type="time"
                  className="w-full px-4 py-2 border rounded-md"
                />

              )
              :(
                <p className="w-full px-3 py-2 border-b-2">{store.timeClose}</p>
              )
              }
            </div>
          </div>
          {/* <div> search location?
            <label className="block text-gray-700">Search Location</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Enter Location"
            />
          </div> */}
          <div className="flex flex-col w-full gap-4">
            <div>
              <label className="block text-gray-700">Latitude</label>
              {isEdit ?(
                <input
                  onChange={hdlOnChange}
                  name="latitude"
                  type="text"
                  className="w-full px-4 py-2 border rounded-md"
                  placeholder="Enter Latitude"
                />
                
              )
              :
              (
                <p className="w-full px-3 py-2 border-b-2">{store.latitude}</p>
              )
              }
            </div>
            <div>
              <label className="block text-gray-700">Longitude</label>
              {isEdit ?(
                <input
                  onChange={hdlOnChange}
                  name="longitude"
                  type="text"
                  className="w-full px-4 py-2 border rounded-md"
                  placeholder="Enter Longitude"
                />
                
              )
              :
              (
                <p className="w-full px-3 py-2 border-b-2">{store.longitude}</p>
              )
              }
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 mb-2">Map Location</label>
            <div className="w-full h-40 bg-gray-100 border rounded-md flex items-center justify-center">
              <p className="text-gray-400">Map Placeholder</p>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 mb-2">Upload Image</label>
            <div className="border-2 border-dashed border-green-500 p-4 rounded-lg text-center">
              <input type="file" className="hidden" />
              <p className="text-gray-400">select your file or drag and drop</p>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={() => hdlSubmit}
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md"
            >
            {isEdit ? "Save" : "Edit"}
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Delete Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MerchantProfile;
