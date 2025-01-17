// import React, { useEffect, useState } from 'react';
// import Swal from 'sweetalert2';
// import useSearchStore from '../../stores/SearchStore';
// import Pagination from '../../components/Pagination';
// import useFoundationStore from '../../stores/FoundationStore';
// import { CloseIcon, UploadIcon } from '../../assets/icons/Icons';
// import { Pencil, Trash2 } from 'lucide-react';
// import { div } from 'framer-motion/client';

// const ManageCharity = () => {
//   const searchText = useSearchStore(state => state.searchText);
//   const getFoundationQuery = useFoundationStore(state => state.getFoundationQuery);
//   const createFoundation = useFoundationStore(state => state.createFoundation);
//   const deleteFoundation = useFoundationStore(state => state.deleteFoundation);
//   const updateFoundation = useFoundationStore(state => state.updateFoundation);


//   const [foundation, setFoundation] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [isOpen, setIsOpen] = useState(false);
//   const [foundationData, setFoundationData] = useState({
//     name: '',
//     contactInfo: '',
//     address: '',
//   });
//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});


//   //for edit 
//   const [isEditOpen, setIsEditOpen] = useState(false);
//   const [foundationDataForEdit, setFoundationDataForEdit] = useState({})



//   const fetchData = async () => {
//     try {
//       const result = await getFoundationQuery(currentPage, searchText);
//       // console.log(result)
//       setTotalPages(result?.totalPages);
//       setFoundation(result?.foundation);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     fetchData();
//   }, [currentPage, searchText]);

//   useEffect(() => {
//     setCurrentPage(1)
//   }, [searchText]);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFoundationData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));

//     if (value) {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         [name]: '',
//       }));
//     }
//   };
//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setFoundationDataForEdit((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));

//     if (value) {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         [name]: '',
//       }));
//     }
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       let validationErrors = {};
//       if (!foundationData.name) validationErrors.name = 'กรุณากรอกชื่อมูลนิธิ';
//       if (!foundationData.contactInfo) validationErrors.contactInfo = 'กรุณากรอกข้อมูลติดต่อ';
//       if (!foundationData.address) validationErrors.address = 'กรุณากรอกที่อยู่มูลนิธิ';

//       if (Object.keys(validationErrors).length > 0) {
//         setErrors(validationErrors);
//         return;
//       }
//       setLoading(true);
//       const body = new FormData();
//       body.append("name", foundationData.name);
//       body.append("contactInfo", foundationData.contactInfo);
//       body.append("address", foundationData.address);
//       if (image) {
//         body.append("profilePicture", image);
//       }

//       const result = await createFoundation(body);
//       if (result) {
//         // setFoundation(prevFoundation => [...prevFoundation, result]);
//         document.getElementById('create_Foundation_modal').close()
//         fetchData()
//         Swal.fire({
//           // position: "top-end",
//           icon: 'success',
//           title: 'เพิ่มมูลนิธิสําเร็จ',
//           showConfirmButton: false,
//           timer: 1500
//         })

//       }
//       // console.log(result);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       let validationErrors = {};
//       if (!foundationDataForEdit.name) validationErrors.name = 'กรุณากรอกชื่อมูลนิธิ';
//       if (!foundationDataForEdit.contactInfo) validationErrors.contactInfo = 'กรุณากรอกข้อมูลติดต่อ';
//       if (!foundationDataForEdit.address) validationErrors.address = 'กรุณากรอกที่อยู่มูลนิธิ';

//       if (Object.keys(validationErrors).length > 0) {
//         setErrors(validationErrors);
//         return;
//       }
//       setLoading(true);
//       const body = new FormData();
//       body.append("name", foundationDataForEdit.name);
//       body.append("contactInfo", foundationDataForEdit.contactInfo);
//       body.append("address", foundationDataForEdit.address);
//       if (image) {
//         body.append("profilePicture", image);
//       }

//       const result = await updateFoundation(foundationDataForEdit.id, body);
//       if (result) {
//         setFoundation(prevFoundation => prevFoundation.map(foundation => foundation.id === result.id ? result : foundation));
//         document.getElementById('edit_Foundation_modal').close()
//         Swal.fire({
//           // position: "top-end",
//           icon: 'success',
//           title: 'บันทึกข้อมูลสําเร็จ',
//           showConfirmButton: false,
//           timer: 1500
//         })
//       }
//       // console.log(result);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {

//     const swalWithBootstrapButtons = Swal.mixin({
//       customClass: {
//         confirmButton: "btn btn-success ml-2",
//         cancelButton: "btn btn-error mr-2"
//       },
//       buttonsStyling: false
//     });
//     swalWithBootstrapButtons.fire({
//       title: "Are you sure?",
//       text: "Do you want to delete this Foundation!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, delete it!",
//       cancelButtonText: "No, cancel!",
//       reverseButtons: true
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           const result = await deleteFoundation(id);
//           if (result) {
//             fetchData()
//           }
//         } catch (error) {
//           console.log(error)
//         }
//         swalWithBootstrapButtons.fire({
//           title: "Deleted!",
//           text: "Foundation has been deleted.",
//           icon: "success"
//         });
//       } else if (
//         /* Read more about handling dismissals below */
//         result.dismiss === Swal.DismissReason.cancel
//       ) {
//         swalWithBootstrapButtons.fire({
//           title: "Cancelled",
//           text: "Foundation is safe :)",
//           icon: "error"
//         });
//       }
//     });

//   };





//   return (
//     <>
//       {/*Body*/}
//       <div className="p-6 min-h-screen flex justify-center items-center">
//         <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-6xl min-h-[500px]">
//           <div className='flex justify-between items-center'>
//             <h2 className="text-3xl font-semibold">Manage Charity</h2>
//             <button
//               type="button"
//               onClick={() => {
//                 setIsOpen(true);
//                 document.getElementById('create_Foundation_modal').showModal();
//               }}
//               className="btn btn-primary btn-outline w-36 text-lg"
//             >
//               + เพิ่มมูลนิธิ
//             </button>
//           </div>
//           {/* <div className='divider'></div> */}
//           <hr className='my-4' />
//           <div className='min-h-[880px]'>

//             <table className="w-full text-left">
//               <thead>
//                 <tr>
//                   <th className="pb-2 border-b text-center">รูปภาพ</th>
//                   <th className="pb-2 border-b text-center">ชื่อมูลนิธิ</th>
//                   <th className="pb-2 border-b text-center">ข้อมูลติดต่อ</th>
//                   <th className="pb-2 border-b text-center">ที่อยู่</th>
//                   <th className="pb-2 border-b text-center">แก้ไข</th>
//                   <th className="pb-2 border-b text-center">ลบ</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {foundation?.map(foundation => (
//                   <tr key={foundation.id} className="hover:bg-gray-50">
//                     <td className="py-4 flex items-center space-x-4">
//                       <div className="w-24 h-24  flex items-center justify-center overflow-hidden">
//                         <img src={foundation.profilePicture} alt="Foundation Avatar" className="" />
//                       </div>
//                     </td>
//                     <td className="py-4 text-center px-4 w-56">
//                       <p className="py-1">{foundation.name}</p>
//                     </td>
//                     <td className="py-4 text-center px-4 w-36">
//                       <p className="py-1">{foundation.contactInfo}</p>
//                     </td>
//                     <td className="py-4 text-center px-4">
//                       <p className="py-1">{foundation.address}</p>
//                     </td>
//                     <td className="py-4 text-center px-4">
//                       <button
//                         type="button"
//                         onClick={() => {
//                           setIsEditOpen(true);
//                           setFoundationDataForEdit(foundation);
//                           document.getElementById('edit_Foundation_modal').showModal();
//                         }}
//                         className=" text-yellow-500 px-4 py-1 rounded-full">
//                         <Pencil />
//                       </button>
//                     </td>
//                     <td className="py-4 text-center px-4">
//                       <button
//                         onClick={() => handleDelete(foundation.id)}
//                         className=" text-red-500 px-4 py-1 rounded-full">
//                         <Trash2 />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className='flex justify-center'>
//             <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
//           </div>
//         </div>
//       </div>


//       {/* Modal */}

//       {/* Create Foundation Modal */}
//       <dialog
//         id="create_Foundation_modal"
//         className="modal"
//         onClose={() => {
//           setIsOpen(false)
//           setErrors({})
//           setImage(null)
//           setFoundationData({
//             name: '',
//             contactInfo: '',
//             address: '',
//           })
//         }}>
//         <form
//           onSubmit={handleSubmit}
//           className="modal-box w-full max-w-4xl">
//           <button
//             type="button"
//             className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
//             onClick={e => e.target.closest('dialog').close()}
//           >
//             ✕
//           </button>
//           <h3 className="text-2xl font-bold mb-4">เพิ่มมูลนิธิ</h3>
//           <div className="flex flex-col lg:flex-row gap-6">

//             {/* File Upload Section */}
//             {/* Upload Image */}
//             <div className="col-span-2 form-control w-1/2 h-full ">
//               <label className="label">
//                 <span className="block text-gray-700 font-medium mb-2">เพิ่มรุปภาพ</span>
//               </label>
//               <div className="flex items-center justify-center w-full h-full">
//                 <div
//                   className="flex flex-col items-center justify-center w-full h-[250px] border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 relative p-2"
//                   onClick={() => document.getElementById('input-file').click()}
//                 >
//                   {!image && (
//                     <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                       <UploadIcon className="w-10 h-10 mb-3 text-gray-400" />
//                       <p className="text-sm text-gray-400">Click to upload</p>
//                     </div>
//                   )}
//                   <input
//                     type="file"
//                     id='input-file'
//                     className="hidden"
//                     onChange={(e) => setImage(e.target.files[0])}
//                   />
//                   <div className='w-full absolute top-1 right-1 flex justify-end'>
//                     {image && (
//                       <CloseIcon
//                         className='w-10 h-10 hover:scale-110 active:scale-100 rounded-full cursor-pointer opacity-60'
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           document.getElementById('input-file').value = '';
//                           setImage(null);
//                         }}
//                       />
//                     )}
//                   </div>
//                   {image && <img src={URL.createObjectURL(image)} className='w-1/2 h-full object-cover' />}
//                 </div>
//               </div>
//             </div>

//             {/* Input Fields Section */}
//             <div className="w-full lg:w-1/2">
//               <label className="block text-gray-700 font-medium mb-2">ชื่อมูลนิธิ</label>
//               <input
//                 type="text"
//                 name='name'
//                 value={foundationData.name}
//                 placeholder="กรุณากรอกชื่อมูลนิธิ"
//                 className="input input-bordered w-full mb-4"
//                 onChange={handleChange}
//               />
//               {errors.name && <p className="text-red-500 text-sm mb-4">{errors.name}</p>}

//               <label className="block text-gray-700 font-medium mb-2">ข้อมูลติดต่อมูลนิธิ</label>
//               <input
//                 type="text"
//                 name='contactInfo'
//                 value={foundationData.contactInfo}
//                 placeholder="กรุณากรอกข้อมูลติดต่อ"
//                 className="input input-bordered w-full mb-4"
//                 onChange={handleChange}
//               />
//               {errors.contactInfo && <p className="text-red-500 text-sm mb-4">{errors.contactInfo}</p>}


//               <label className="block text-gray-700 font-medium mb-2">ที่อยู่มูลนิธิ</label>
//               <textarea
//                 placeholder="กรุณากรอกที่อยู่มูลนิธิ"
//                 name='address'
//                 value={foundationData.address}
//                 className="textarea textarea-bordered w-full mb-4"
//                 onChange={handleChange}
//               />
//               {errors.address && <p className="text-red-500 text-sm mb-4">{errors.address}</p>}


//             </div>
//           </div>

//           {/* Buttons */}
//           {loading ?
//             <div className='flex justify-center'>
//               <span className="loading loading-dots loading-lg"></span>
//             </div>
//             :
//             <div className="flex justify-between mt-6">
//               <button
//                 type="button"
//                 onClick={() => document.getElementById('create_Foundation_modal').close()}
//                 className="btn bg-red-500 text-white w-36">
//                 ยกเลิก
//               </button>
//               <button
//                 type="submit"
//                 className="btn
//               bg-green-500
//               text-white w-36">
//                 เพิ่มมูลนิธิ
//               </button>
//             </div>
//           }
//         </form>
//       </dialog>


//       {/* Edit Foundation Modal */}
//       <dialog
//         id="edit_Foundation_modal"
//         className="modal"
//         onClose={() => {
//           setIsEditOpen(false)
//           setErrors({})
//           setImage(null)
//           setFoundationDataForEdit({})
//         }}>
//         <form
//           onSubmit={handleEditSubmit}
//           className="modal-box w-full max-w-4xl">
//           <button
//             type="button"
//             className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
//             onClick={e => e.target.closest('dialog').close()}
//           >
//             ✕
//           </button>
//           <h3 className="text-2xl font-bold mb-4">แก้ไขข้อมูล มูลนิธิ</h3>
//           <div className="flex flex-col lg:flex-row gap-6">

//             {/* File Upload Section */}
//             {/* Upload Image */}
//             <div className="col-span-2 form-control w-1/2 h-full ">
//               <label className="label">
//                 <span className="block text-gray-700 font-medium mb-2">เพิ่มรุปภาพ</span>
//               </label>
//               {foundationDataForEdit.profilePicture ? (
//                 <div className="flex items-center justify-center w-full">
//                   <div
//                     className="flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 relative p-2"
//                     onClick={() => document.getElementById('input-file').click()}
//                   >
//                     <input
//                       type="file"
//                       id='input-file'
//                       className="hidden"
//                       onChange={(e) => setImage(e.target.files[0])}
//                     />
//                     <div className='w-full absolute top-1 right-1 flex justify-end'>
//                       {foundationDataForEdit.profilePicture && <CloseIcon
//                         className='w-10 h-10 hover:scale-110 active:scale-100 rounded-full cursor-pointer opacity-60'
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           document.getElementById('input-file').value = '';
//                           setFoundationDataForEdit((prevData) => ({ ...prevData, profilePicture: null }));
//                         }}
//                       />}
//                     </div>
//                     {foundationDataForEdit.profilePicture && <img src={foundationDataForEdit.profilePicture} className='w-1/2 h-full object-cover' />}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="flex items-center justify-center w-full h-full">
//                   <div
//                     className="flex flex-col items-center justify-center w-full h-[250px] border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 relative p-2"
//                     onClick={() => document.getElementById('input-file').click()}
//                   >
//                     {!image && (
//                       <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                         <UploadIcon className="w-10 h-10 mb-3 text-gray-400" />
//                         <p className="text-sm text-gray-400">Click to upload</p>
//                       </div>
//                     )}
//                     <input
//                       type="file"
//                       id='input-file'
//                       className="hidden"
//                       onChange={(e) => setImage(e.target.files[0])}
//                     />
//                     <div className='w-full absolute top-1 right-1 flex justify-end'>
//                       {image && (
//                         <CloseIcon
//                           className='w-10 h-10 hover:scale-110 active:scale-100 rounded-full cursor-pointer opacity-60'
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             document.getElementById('input-file').value = '';
//                             setImage(null);
//                           }}
//                         />
//                       )}
//                     </div>
//                     {image && <img src={URL.createObjectURL(image)} className='w-1/2 h-full object-cover' />}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Input Fields Section */}
//             <div className="w-full lg:w-1/2">
//               <label className="block text-gray-700 font-medium mb-2">ชื่อมูลนิธิ</label>
//               <input
//                 type="text"
//                 name='name'
//                 value={foundationDataForEdit.name}
//                 placeholder="กรุณากรอกชื่อมูลนิธิ"
//                 className="input input-bordered w-full mb-4"
//                 onChange={handleEditChange}
//               />
//               {errors.name && <p className="text-red-500 text-sm mb-4">{errors.name}</p>}

//               <label className="block text-gray-700 font-medium mb-2">ข้อมูลติดต่อมูลนิธิ</label>
//               <input
//                 type="text"
//                 name='contactInfo'
//                 value={foundationDataForEdit.contactInfo}
//                 placeholder="กรุณากรอกข้อมูลติดต่อ"
//                 className="input input-bordered w-full mb-4"
//                 onChange={handleEditChange}
//               />
//               {errors.contactInfo && <p className="text-red-500 text-sm mb-4">{errors.contactInfo}</p>}


//               <label className="block text-gray-700 font-medium mb-2">ที่อยู่มูลนิธิ</label>
//               <textarea
//                 placeholder="กรุณากรอกที่อยู่มูลนิธิ"
//                 name='address'
//                 value={foundationDataForEdit.address}
//                 className="textarea textarea-bordered w-full mb-4"
//                 onChange={handleEditChange}
//               />
//               {errors.address && <p className="text-red-500 text-sm mb-4">{errors.address}</p>}


//             </div>
//           </div>

//           {/* Buttons */}
//           {loading ?
//             <div className='flex justify-center'>
//               <span className="loading loading-dots loading-lg"></span>
//             </div>
//             :
//             <div className="flex justify-between mt-6">
//               <button
//                 type="button"
//                 onClick={() => document.getElementById('edit_Foundation_modal').close()}
//                 className="btn bg-red-500 text-white w-36">
//                 ยกเลิก
//               </button>
//               <button
//                 type="submit"
//                 className="btn
//               bg-green-500
//               text-white w-36">
//                 ตกลง
//               </button>
//             </div>
//           }
//         </form>
//       </dialog>
//     </>
//   )
// }

// export default ManageCharity


import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useSearchStore from '../../stores/SearchStore';
import Pagination from '../../components/Pagination';
import useFoundationStore from '../../stores/FoundationStore';
import { CloseIcon, UploadIcon } from '../../assets/icons/Icons';
import { Pencil, Trash2 } from 'lucide-react';

// Foundation Card Component for Mobile View
const FoundationCard = ({ foundation, onEdit, onDelete }) => (
  <div className="bg-white rounded-lg shadow-md p-4 mb-4">
    <div className="flex flex-col gap-4">
      {/* Foundation Image and Name */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-36 h-48 md:h-28 rounded-lg overflow-hidden">
          <img
            src={foundation.profilePicture}
            alt={foundation.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 space-y-2">
          <h3 className="font-semibold text-lg">{foundation.name}</h3>
          <div className="grid grid-cols-1 gap-2 text-sm">
            <div>
              <p className="text-gray-600">ข้อมูลติดต่อ:</p>
              <p>{foundation.contactInfo}</p>
            </div>
            <div>
              <p className="text-gray-600">ที่อยู่:</p>
              <p className="line-clamp-2">{foundation.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4">
        <button
          onClick={() => onEdit(foundation)}
          className="text-yellow-500 hover:opacity-80"
        >
          <Pencil className="w-5 h-5" />
        </button>
        <button
          onClick={() => onDelete(foundation.id)}
          className="text-red-500 hover:opacity-80"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
);

const ManageCharity = () => {
  const searchText = useSearchStore(state => state.searchText);
  const getFoundationQuery = useFoundationStore(state => state.getFoundationQuery);
  const createFoundation = useFoundationStore(state => state.createFoundation);
  const deleteFoundation = useFoundationStore(state => state.deleteFoundation);
  const updateFoundation = useFoundationStore(state => state.updateFoundation);

  const [foundation, setFoundation] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [foundationData, setFoundationData] = useState({
    name: '',
    contactInfo: '',
    address: '',
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [foundationDataForEdit, setFoundationDataForEdit] = useState({});

  const fetchData = async () => {
    try {
      const result = await getFoundationQuery(currentPage, searchText);
      setTotalPages(result?.totalPages);
      setFoundation(result?.foundation);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, searchText]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoundationData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    if (value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFoundationDataForEdit((prevData) => ({
      ...prevData,
      [name]: value
    }));
    if (value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let validationErrors = {};
      if (!foundationData.name) validationErrors.name = 'กรุณากรอกชื่อมูลนิธิ';
      if (!foundationData.contactInfo) validationErrors.contactInfo = 'กรุณากรอกข้อมูลติดต่อ';
      if (!foundationData.address) validationErrors.address = 'กรุณากรอกที่อยู่มูลนิธิ';

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      setLoading(true);
      const body = new FormData();
      body.append("name", foundationData.name);
      body.append("contactInfo", foundationData.contactInfo);
      body.append("address", foundationData.address);
      if (image) {
        body.append("profilePicture", image);
      }

      const result = await createFoundation(body);
      if (result) {
        document.getElementById('create_Foundation_modal').close()
        fetchData()
        Swal.fire({
          icon: 'success',
          title: 'เพิ่มมูลนิธิสําเร็จ',
          showConfirmButton: false,
          timer: 1500
        })
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      let validationErrors = {};
      if (!foundationDataForEdit.name) validationErrors.name = 'กรุณากรอกชื่อมูลนิธิ';
      if (!foundationDataForEdit.contactInfo) validationErrors.contactInfo = 'กรุณากรอกข้อมูลติดต่อ';
      if (!foundationDataForEdit.address) validationErrors.address = 'กรุณากรอกที่อยู่มูลนิธิ';

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      setLoading(true);
      const body = new FormData();
      body.append("name", foundationDataForEdit.name);
      body.append("contactInfo", foundationDataForEdit.contactInfo);
      body.append("address", foundationDataForEdit.address);
      if (image) {
        body.append("profilePicture", image);
      }

      const result = await updateFoundation(foundationDataForEdit.id, body);
      if (result) {
        setFoundation(prevFoundation => prevFoundation.map(foundation => 
          foundation.id === result.id ? result : foundation
        ));
        document.getElementById('edit_Foundation_modal').close()
        Swal.fire({
          icon: 'success',
          title: 'บันทึกข้อมูลสําเร็จ',
          showConfirmButton: false,
          timer: 1500
        })
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success ml-2",
        cancelButton: "btn btn-error mr-2"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "Do you want to delete this Foundation!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const result = await deleteFoundation(id);
          if (result) {
            fetchData()
          }
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Foundation has been deleted.",
            icon: "success"
          });
        } catch (error) {
          console.log(error)
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Foundation is safe :)",
          icon: "error"
        });
      }
    });
  };

  const handleEdit = (foundation) => {
    setFoundationDataForEdit(foundation);
    setIsEditOpen(true);
    document.getElementById('edit_Foundation_modal').showModal();
  };

  return (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow-md">
        {/* Header Section */}
        <div className="p-4 md:p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-2xl font-bold">Manage Charity</h2>
            <button
              onClick={() => {
                setIsOpen(true);
                document.getElementById('create_Foundation_modal').showModal();
              }}
              className="btn btn-primary btn-outline w-full md:w-36 text-lg"
            >
              + เพิ่มมูลนิธิ
            </button>
          </div>
        </div>

        {/* Desktop View - Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-center">รูปภาพ</th>
                <th className="p-4 text-center">ชื่อมูลนิธิ</th>
                <th className="p-4 text-center">ข้อมูลติดต่อ</th>
                <th className="p-4 text-center">ที่อยู่</th>
                <th className="p-4 text-center">แก้ไข</th>
                <th className="p-4 text-center">ลบ</th>
              </tr>
            </thead>
            <tbody>
              {foundation?.map(foundation => (
                <tr key={foundation.id} className="hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex justify-center">
                      <div className="w-24 h-24 rounded-lg overflow-hidden">
                        <img
                          src={foundation.profilePicture}
                          alt="Foundation"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-center">{foundation.name}</td>
                  <td className="p-4 text-center">{foundation.contactInfo}</td>
                  <td className="p-4 text-center">
                    <p className="line-clamp-2">{foundation.address}</p>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleEdit(foundation)}
                        className="text-yellow-500 hover:opacity-80"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleDelete(foundation.id)}
                        className="text-red-500 hover:opacity-80"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View - Cards */}
        <div className="md:hidden space-y-4">
          {foundation?.map(foundation => (
            <FoundationCard
              key={foundation.id}
              foundation={foundation}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-200">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {/* Create Foundation Modal */}
      <dialog
        id="create_Foundation_modal"
        className="modal"
        onClose={() => {
          setIsOpen(false)
          setErrors({})
          setImage(null)
          setFoundationData({
            name: '',
            contactInfo: '',
            address: '',
          })
        }}>
        <form
          onSubmit={handleSubmit}
          className="modal-box w-11/12 max-w-4xl p-6"
        >
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={e => e.target.closest('dialog').close()}
          >
            ✕
          </button>
          <h3 className="text-2xl font-bold mb-6">เพิ่มมูลนิธิ</h3>
          
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Image Upload */}
            <div className="w-full lg:w-1/2">
              <label className="block text-gray-700 font-medium mb-2">เพิ่มรูปภาพ</label>
              <div
                className="flex flex-col items-center justify-center w-full h-[250px] border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 relative p-2"
                onClick={() => document.getElementById('input-file').click()}
              >
                {!image ? (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadIcon className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="text-sm text-gray-400">Click to upload</p>
                  </div>
                ) : (
                  <img src={URL.createObjectURL(image)} className="w-full h-full object-contain"
                  />
                )}
                <input
                  type="file"
                  id="input-file"
                  className="hidden"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                {image && (
                  <div className="absolute top-2 right-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImage(null);
                      }}
                      className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                    >
                      <CloseIcon className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="w-full lg:w-1/2 space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">ชื่อมูลนิธิ</label>
                <input
                  type="text"
                  name="name"
                  value={foundationData.name}
                  onChange={handleChange}
                  placeholder="กรุณากรอกชื่อมูลนิธิ"
                  className="input input-bordered w-full"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">ข้อมูลติดต่อมูลนิธิ</label>
                <input
                  type="text"
                  name="contactInfo"
                  value={foundationData.contactInfo}
                  onChange={handleChange}
                  placeholder="กรุณากรอกข้อมูลติดต่อ"
                  className="input input-bordered w-full"
                />
                {errors.contactInfo && <p className="text-red-500 text-sm mt-1">{errors.contactInfo}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">ที่อยู่มูลนิธิ</label>
                <textarea
                  name="address"
                  value={foundationData.address}
                  onChange={handleChange}
                  placeholder="กรุณากรอกที่อยู่มูลนิธิ"
                  className="textarea textarea-bordered w-full"
                  rows={4}
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-8">
            {loading ? (
              <div className="flex justify-center w-full">
                <span className="loading loading-dots loading-lg"></span>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => document.getElementById('create_Foundation_modal').close()}
                  className="btn bg-red-500 text-white hover:bg-red-600 w-36"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="btn bg-green-500 text-white hover:bg-green-600 w-36"
                >
                  เพิ่มมูลนิธิ
                </button>
              </>
            )}
          </div>
        </form>
      </dialog>

      {/* Edit Foundation Modal */}
      <dialog
        id="edit_Foundation_modal"
        className="modal"
        onClose={() => {
          setIsEditOpen(false)
          setErrors({})
          setImage(null)
          setFoundationDataForEdit({})
        }}>
        <form
          onSubmit={handleEditSubmit}
          className="modal-box w-11/12 max-w-4xl p-6"
        >
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={e => e.target.closest('dialog').close()}
          >
            ✕
          </button>
          <h3 className="text-2xl font-bold mb-6">แก้ไขข้อมูลมูลนิธิ</h3>
          
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Image Upload */}
            <div className="w-full lg:w-1/2">
              <label className="block text-gray-700 font-medium mb-2">รูปภาพ</label>
              <div
                className="flex flex-col items-center justify-center w-full h-[250px] border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 relative p-2"
                onClick={() => document.getElementById('edit-input-file').click()}
              >
                {!image && !foundationDataForEdit.profilePicture ? (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadIcon className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="text-sm text-gray-400">Click to upload</p>
                  </div>
                ) : (
                  <img
                    src={image ? URL.createObjectURL(image) : foundationDataForEdit.profilePicture}
                    className="w-full h-full object-contain"
                  />
                )}
                <input
                  type="file"
                  id="edit-input-file"
                  className="hidden"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                {(image || foundationDataForEdit.profilePicture) && (
                  <div className="absolute top-2 right-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImage(null);
                        setFoundationDataForEdit(prev => ({ ...prev, profilePicture: null }));
                      }}
                      className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                    >
                      <CloseIcon className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="w-full lg:w-1/2 space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">ชื่อมูลนิธิ</label>
                <input
                  type="text"
                  name="name"
                  value={foundationDataForEdit.name || ''}
                  onChange={handleEditChange}
                  placeholder="กรุณากรอกชื่อมูลนิธิ"
                  className="input input-bordered w-full"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">ข้อมูลติดต่อมูลนิธิ</label>
                <input
                  type="text"
                  name="contactInfo"
                  value={foundationDataForEdit.contactInfo || ''}
                  onChange={handleEditChange}
                  placeholder="กรุณากรอกข้อมูลติดต่อ"
                  className="input input-bordered w-full"
                />
                {errors.contactInfo && <p className="text-red-500 text-sm mt-1">{errors.contactInfo}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">ที่อยู่มูลนิธิ</label>
                <textarea
                  name="address"
                  value={foundationDataForEdit.address || ''}
                  onChange={handleEditChange}
                  placeholder="กรุณากรอกที่อยู่มูลนิธิ"
                  className="textarea textarea-bordered w-full"
                  rows={4}
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-8">
            {loading ? (
              <div className="flex justify-center w-full">
                <span className="loading loading-dots loading-lg"></span>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => document.getElementById('edit_Foundation_modal').close()}
                  className="btn bg-red-500 text-white hover:bg-red-600 w-36"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="btn bg-green-500 text-white hover:bg-green-600 w-36"
                >
                  บันทึก
                </button>
              </>
            )}
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default ManageCharity;


