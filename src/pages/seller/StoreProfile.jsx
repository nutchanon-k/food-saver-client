// import React, { useEffect, useRef, useState } from "react";
// import { CloudUpload } from "lucide-react";
// import useUserStore from "../../stores/userStore";
// import { getMeAPI, patchSellerAPI, deleteStoreAPI } from "../../API/UserApi";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import moment from "moment";
// import SellerMap from "../../components/seller/SellerMap";

// const StoreProfile = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const store = useUserStore((state) => state.user.store);

//   const navigate = useNavigate();

//   // console.log(store);
//   useEffect(() => {console.log(store)});

//   const handleDelete = async (id) => {
//     console.log(id);
//     const swalWithBootstrapButtons = Swal.mixin({
//       customClass: {
//         confirmButton: "btn btn-success ml-2",
//         cancelButton: "btn btn-error mr-2",
//       },
//       buttonsStyling: false,
//     });
//     swalWithBootstrapButtons
//       .fire({
//         title: "Are you sure?",
//         text: "Do you want to delete this Foundation!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonText: "Yes, delete it!",
//         cancelButtonText: "No, cancel!",
//         reverseButtons: true,
//       })
//       .then(async (result) => {
//         console.log("delete", result);
//         if (result.isConfirmed) {
//           try {
//             const result = await deleteStoreAPI(id);
//             if (result) {
//               localStorage.removeItem("token", "userStore");
//               navigate("/");
//               window.location.reload();
//             }
//           } catch (error) {
//             console.log(error);
//           }
//           swalWithBootstrapButtons.fire({
//             title: "Deleted!",
//             text: "Foundation has been deleted.",
//             icon: "success",
//           });
//         } else if (
//           /* Read more about handling dismissals below */
//           result.dismiss === Swal.DismissReason.cancel
//         ) {
//           swalWithBootstrapButtons.fire({
//             title: "Cancelled",
//             text: "Foundation is safe :)",
//             icon: "error",
//           });
//         }
//       });
//   };
//   const timeOpen = moment(store?.timeOpen.slice(0, 19)).format("HH:mm:ss");
//   const timeClose = moment(store?.timeClose.slice(0, 19)).format("HH:mm:ss");

//   return (
//     <div className="flex justify-center  items-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-6xl bg-white shadow-md rounded-lg p-8">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold">My Store Profile</h2>
//           <label className="flex items-center cursor-pointer">
//             <span className="mr-2 text-gray-600">เปิด - ปิด ร้าน</span>

//             <input
//               onChange={() => setIsOpen(!isOpen)}
//               type="checkbox"
//               className="toggle toggle-success"
//               defaultChecked
//             />
//           </label>
//         </div>

//         <hr className="border-black mb-6" />

//         <div className="flex flex-col justify-center items-center mb-6 ">
//           <img
//             className="w-3/4 h-full border-2 "
//             src={store?.profilePicture}
//             alt="profile"
//           />
//         </div>

//         {/* Form Fields */}
//         <div className="space-y-4">
//           <div>
//             <label className="block text-gray-700">Store Name</label>

//             <p className="w-full px-3 py-2 border-b-2">{store.storeName}</p>
//           </div>
//           <div>
//             <label className="block text-gray-700">Phone Number</label>

//             <p className="w-full px-3 py-2 border-b-2">{store.phoneNumber}</p>
//           </div>
//           <div>
//             <label className="block text-gray-700">Address</label>

//             <p className="w-full px-3 py-2 border-b-2">{store.storeAddress}</p>
//           </div>
//           <div>
//             <label className="block text-gray-700">Detail</label>

//             <p className="w-full px-3 py-2 border-b-2">{store.storeDetails}</p>
//           </div>
//           <div className="flex  gap-8">
//             <div>
//               <label className="block text-gray-700">Time Open</label>

//               <p className="w-full px-3 py-2 border-b-2">{timeOpen}</p>
//             </div>
//             <div>
//               <label className="block text-gray-700">Time Close</label>

//               <p className="w-full px-3 py-2 border-b-2">{timeClose}</p>
//             </div>
//           </div>

//           <div className="flex flex-col w-full gap-4">
//             <div>
//               <label className="block text-gray-700">Latitude</label>

//               <p className="w-full px-3 py-2 border-b-2">{store.latitude}</p>
//             </div>
//             <div>
//               <label className="block text-gray-700">Longitude</label>

//               <p className="w-full px-3 py-2 border-b-2">{store.longitude}</p>
//             </div>
//           </div>

//           <div className="mt-4">
//             <label className="block text-gray-700 mb-2">Map Location</label>
//             <div className="w-full h-[300px] bg-gray-100 border rounded-md flex items-center justify-center">
//               <SellerMap
//                 latitude={store.latitude}
//                 longitude={store.longitude}
//                 canEdit={false}
//               />
//             </div>
//           </div>

//           <div className="mt-6">
//             <div className="flex justify-between  mt-6">
//               <button
//                 onClick={() => handleDelete(store.id)}
//                 className="w-[250px] px-4 py-4 bg-red-500 text-white rounded-xl"
//               >
//                 Delete Store
//               </button>
//               <Link
//                 to={"/store-edit"}
//                 className="w-[250px] px-4 py-4 bg-green-500 text-white rounded-xl text-center"
//               >
//                 Edit
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StoreProfile;


import React, { useEffect, useRef, useState } from "react";
import { CloudUpload } from "lucide-react";
import useUserStore from "../../stores/userStore";
import { getMeAPI, patchSellerAPI, deleteStoreAPI } from "../../API/UserApi";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import moment from "moment";
import SellerMap from "../../components/seller/SellerMap";

const StoreProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const store = useUserStore((state) => state.user.store);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(store);
  });

  const handleDelete = async (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success ml-2",
        cancelButton: "btn btn-error mr-2",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "Do you want to delete this Foundation!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const result = await deleteStoreAPI(id);
            if (result) {
              localStorage.removeItem("token", "userStore");
              navigate("/");
              window.location.reload();
            }
          } catch (error) {
            console.log(error);
          }
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Foundation has been deleted.",
            icon: "success",
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Foundation is safe :)",
            icon: "error",
          });
        }
      });
  };

  const timeOpen = moment(store?.timeOpen.slice(0, 19)).format("HH:mm:ss");
  const timeClose = moment(store?.timeClose.slice(0, 19)).format("HH:mm:ss");

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 md:px-6 md:py-8">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-4 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          <h2 className="text-xl font-semibold">My Store Profile</h2>
          <label className="flex items-center cursor-pointer">
            <span className="mr-2 text-gray-600 text-sm md:text-base">เปิด - ปิด ร้าน</span>
            <input
              onChange={() => setIsOpen(!isOpen)}
              type="checkbox"
              className="toggle toggle-success"
              defaultChecked
            />
          </label>
        </div>

        <hr className="border-black mb-4 md:mb-6" />

        {/* Store Image */}
        <div className="flex flex-col justify-center items-center mb-4 md:mb-6">
          <img
            className="w-full md:w-3/4 h-auto object-cover border-2 rounded-lg"
            src={store?.profilePicture}
            alt="profile"
          />
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Store Name</label>
            <p className="w-full px-3 py-2 border-b-2 text-sm md:text-base">{store.storeName}</p>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Phone Number</label>
            <p className="w-full px-3 py-2 border-b-2 text-sm md:text-base">{store.phoneNumber}</p>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Address</label>
            <p className="w-full px-3 py-2 border-b-2 text-sm md:text-base">{store.storeAddress}</p>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Detail</label>
            <p className="w-full px-3 py-2 border-b-2 text-sm md:text-base">{store.storeDetails}</p>
          </div>

          {/* Time Section */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <div className="flex-1">
              <label className="block text-gray-700 text-sm font-medium mb-1">Time Open</label>
              <p className="w-full px-3 py-2 border-b-2 text-sm md:text-base">{timeOpen}</p>
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 text-sm font-medium mb-1">Time Close</label>
              <p className="w-full px-3 py-2 border-b-2 text-sm md:text-base">{timeClose}</p>
            </div>
          </div>

          {/* Location Section */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Latitude</label>
              <p className="w-full px-3 py-2 border-b-2 text-sm md:text-base">{store.latitude}</p>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">Longitude</label>
              <p className="w-full px-3 py-2 border-b-2 text-sm md:text-base">{store.longitude}</p>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Map Location</label>
            <div className="w-full h-[250px] md:h-[300px] bg-gray-100 border rounded-md">
              <SellerMap
                latitude={store.latitude}
                longitude={store.longitude}
                canEdit={false}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <button
                onClick={() => handleDelete(store.id)}
                className="w-full md:w-[250px] px-4 py-3 md:py-4 bg-red-500 text-white rounded-xl text-sm md:text-base"
              >
                Delete Store
              </button>
              <Link
                to={"/store-edit"}
                className="w-full md:w-[250px] px-4 py-3 md:py-4 bg-green-500 text-white rounded-xl text-center text-sm md:text-base"
              >
                Edit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreProfile;