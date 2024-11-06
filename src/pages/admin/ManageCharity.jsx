<<<<<<< HEAD
import React from 'react'

const ManageCharity = () => {
  return (
    <div>ManageCharity</div>
=======
import React, { useEffect, useState } from 'react';
import useUserStore from '../../stores/userStore';
import Swal from 'sweetalert2';
import axiosInstance from '../../API/Interceptor';
import useSearchStore from '../../stores/SearchStore';
import Pagination from '../../components/Pagination';
import { getUserByQueryAPI } from '../../API/UserApi';
import useFoundationStore from '../../stores/FoundationStore';

const ManageCharity = () => {
  const getAllUser = useUserStore(state => state.getAllUser);
  const allUser = useUserStore(state => state.allUser);
  const activateUser = useUserStore(state => state.activateUser);
  const searchText = useSearchStore(state => state.searchText);
  const getFoundationQuery = useFoundationStore(state => state.getFoundationQuery);

  const [user, setUser] = useState(null);
  const [foundation, setFoundation] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [foundationData, setFoundationData] = useState({});



  console.log(foundation)

  // const fetchUser = async (page) => {
  //     try {
  //         const result = await getUserByQueryAPI(page, searchText, roleFilter);
  //         setTotalPages(result?.data.totalPages);
  //         setUser(result?.data.data);
  //     } catch (error) {
  //         console.log(error);
  //     }
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getFoundationQuery(currentPage, searchText);
        console.log(result)
        setTotalPages(result?.totalPages);
        setFoundation(result?.foundation);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [currentPage, searchText]);

  useEffect(() => {
    setCurrentPage(1)
  }, [searchText]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const toggleStatus = async (id) => {
    let index = user.findIndex((user) => user.id === id);
    if (user[index].isActive === true) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success ml-2",
          cancelButton: "btn btn-error mr-2"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "Do you want to deactivate this user!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, deactivate it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {

            const result = await activateUser(id);
            if (result) {
              console.log("success")
            }
            setUser(
              user.map(user =>
                user.id === id ? { ...user, isActive: !user.isActive } : user
              )
            );
          } catch (error) {
            console.log(error)
          }
          swalWithBootstrapButtons.fire({
            title: "Deactivated!",
            text: "User has been deactivated.",
            icon: "success"
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "User is safe :)",
            icon: "error"
          });
        }
      });
    } else {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success ml-2",
          cancelButton: "btn btn-error mr-2"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "Do you want to activate this user!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, activate it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {

            const result = await activateUser(id);
            if (result) {
              console.log("success")
            }
            setUser(
              user.map(user =>
                user.id === id ? { ...user, isActive: !user.isActive } : user
              )
            );
          } catch (error) {
            console.log(error)
          }
          swalWithBootstrapButtons.fire({
            title: "Activated!",
            text: "User has been activated.",
            icon: "success"
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "User still deactivated :)",
            icon: "error"
          });
        }
      });
    }
  };

  return (
    <>
      <div className="p-6 min-h-screen flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-6xl min-h-[500px]">
          <div className='flex justify-between items-center'>
            <h2 className="text-3xl font-semibold">Manage Charity</h2>
            <button
              type="button"
              // onClick={() => setIsOpen(true)}
              className="btn btn-primary btn-outline w-36 text-lg"
            >
              + เพิ่มมูลนิธิ
            </button>
          </div>
          {/* <div className='divider'></div> */}
          <hr className='my-4'/>
          <div className='min-h-[880px]'>

            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="pb-2 border-b text-center">รูปภาพ</th>
                  <th className="pb-2 border-b text-center">ชื่อมูลนิธิ</th>
                  <th className="pb-2 border-b text-center">ข้อมูลติดต่อ</th>
                  <th className="pb-2 border-b text-center">ที่อยู่</th>
                  <th className="pb-2 border-b text-center">แก้ไข</th>
                </tr>
              </thead>
              <tbody>
                {foundation?.map(foundation => (
                  <tr key={foundation.id} className="hover:bg-gray-50">
                    <td className="py-4 flex items-center space-x-4">
                      <div className="w-24 h-24  flex items-center justify-center">
                        <img src={foundation.profilePicture} alt="Foundation Avatar" className="" />
                      </div>
                    </td>
                    <td className="py-4 text-center px-4 w-56">
                      <p className="py-1">{foundation.name}</p>
                    </td>
                    <td className="py-4 text-center px-4 w-36">
                      <p className="py-1">{foundation.contactInfo}</p>
                    </td>
                    <td className="py-4 text-center px-4">
                      <p className="py-1">{foundation.address}</p>
                    </td>
                    <td className="py-4 text-center px-4">
                      <button
                        onClick={() => {
                          setFoundationData(user);
                          setIsOpen(true);
                          document.getElementById('Foundation_detail_modal').showModal();
                        }}
                        className="bg-yellow-200 text-yellow-800 px-4 py-1 rounded-full">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className='flex justify-center'>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </div>
      </div>

      {/* Edit Foundation Modal */}
      <dialog id="Foundation_detail_modal" className="modal" onClose={() => { setIsOpen(false) }}>
        <div className="modal-box">

          <button
            type='button'
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={e => e.target.closest('dialog').close()}
          >
            ✕
          </button>
          <div className="card xl:card-side ">
            <figure>
              {/* <img
                src={userData.profilePicture}
                alt="Album" /> */}
            </figure>
            <div className="card-body">
              {/* <h2 className="card-title">User Detail</h2>
              <p>Name : {userData.firstName + ' ' + userData.lastName}</p>
              <p>Email : {userData.email}</p>
              <p>Phone : {userData.phoneNumber}</p>
              <p>Role : {userData.role}</p>
              <p>Address : {userData.address}</p> */}
            </div>
          </div>


        </div>
      </dialog>
    </>
>>>>>>> dev
  )
}

export default ManageCharity