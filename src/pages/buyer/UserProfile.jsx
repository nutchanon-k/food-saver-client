import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../../stores/userStore";
import { CloudUpload, Target } from "lucide-react";
import { deleteUserAPI, getMeAPI, updateUserAPI } from "../../API/UserApi";
import Swal from "sweetalert2";
const UserProfile = () => {

  const user = useUserStore((state) => state.user);
  const getMe = useUserStore((state) => state.getMe);
  console.log(user);

  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();

  const [formUpdate, setFormUpdate] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
  });
  
  
  useEffect(() => {
    getMe();
    setFormUpdate({
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
    });
  }, []);


  

  const handleDelete = async (id) => {
    
    console.log(id);
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
        console.log("delete",result);
        if (result.isConfirmed) {
          try {
            const result = await deleteUserAPI(id);
            
            localStorage.removeItem("token","userStore");
            // useUserStore.setState({ user: null },{token:null});

            navigate("/");
            window.location.reload();
          } catch (error) {
            console.log(error);
          }
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Foundation has been deleted.",
            icon: "success",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Foundation is safe :)",
            icon: "error",
          });
        }
      });
  };
  

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
      <div className="space-y-6">
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


        <div className="mt-6">
            <div className="flex justify-between  mt-6">
              <button
                onClick={() => handleDelete(user.id)}
                className="w-[250px] px-4 py-2 bg-red-500 text-white rounded-3xl"
              >
                Delete Account
              </button>
              <Link
                to={"/userEdit"}
                className="w-[250px] px-4 py-2 bg-green-500 text-white rounded-3xl text-center"
              >
                Edit
              </Link>
            </div>
          </div>
      </div >
    </div >
  );
  
};

export default UserProfile;
