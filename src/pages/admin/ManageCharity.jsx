import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useSearchStore from '../../stores/SearchStore';
import Pagination from '../../components/Pagination';
import useFoundationStore from '../../stores/FoundationStore';
import { CloseIcon, UploadIcon } from '../../assets/icons/Icons';
import { Pencil, Trash2 } from 'lucide-react';
import { div } from 'framer-motion/client';

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


  //for edit 
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [foundationDataForEdit, setFoundationDataForEdit] = useState({})



  const fetchData = async () => {
    try {
      const result = await getFoundationQuery(currentPage, searchText);
      // console.log(result)
      setTotalPages(result?.totalPages);
      setFoundation(result?.foundation);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [currentPage, searchText]);

  useEffect(() => {
    setCurrentPage(1)
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
        // setFoundation(prevFoundation => [...prevFoundation, result]);
        document.getElementById('create_Foundation_modal').close()
        fetchData()
        Swal.fire({
          // position: "top-end",
          icon: 'success',
          title: 'เพิ่มมูลนิธิสําเร็จ',
          showConfirmButton: false,
          timer: 1500
        })

      }
      // console.log(result);
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
        setFoundation(prevFoundation => prevFoundation.map(foundation => foundation.id === result.id ? result : foundation));
        document.getElementById('edit_Foundation_modal').close()
        Swal.fire({
          // position: "top-end",
          icon: 'success',
          title: 'บันทึกข้อมูลสําเร็จ',
          showConfirmButton: false,
          timer: 1500
        })
      }
      // console.log(result);
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
        } catch (error) {
          console.log(error)
        }
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Foundation has been deleted.",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Foundation is safe :)",
          icon: "error"
        });
      }
    });

  };





  return (
    <>
      {/*Body*/}
      <div className="p-6 min-h-screen flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-6xl min-h-[500px]">
          <div className='flex justify-between items-center'>
            <h2 className="text-3xl font-semibold">Manage Charity</h2>
            <button
              type="button"
              onClick={() => {
                setIsOpen(true);
                document.getElementById('create_Foundation_modal').showModal();
              }}
              className="btn btn-primary btn-outline w-36 text-lg"
            >
              + เพิ่มมูลนิธิ
            </button>
          </div>
          {/* <div className='divider'></div> */}
          <hr className='my-4' />
          <div className='min-h-[880px]'>

            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="pb-2 border-b text-center">รูปภาพ</th>
                  <th className="pb-2 border-b text-center">ชื่อมูลนิธิ</th>
                  <th className="pb-2 border-b text-center">ข้อมูลติดต่อ</th>
                  <th className="pb-2 border-b text-center">ที่อยู่</th>
                  <th className="pb-2 border-b text-center">แก้ไข</th>
                  <th className="pb-2 border-b text-center">ลบ</th>
                </tr>
              </thead>
              <tbody>
                {foundation?.map(foundation => (
                  <tr key={foundation.id} className="hover:bg-gray-50">
                    <td className="py-4 flex items-center space-x-4">
                      <div className="w-24 h-24  flex items-center justify-center overflow-hidden">
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
                        type="button"
                        onClick={() => {
                          setIsEditOpen(true);
                          setFoundationDataForEdit(foundation);
                          document.getElementById('edit_Foundation_modal').showModal();
                        }}
                        className=" text-yellow-500 px-4 py-1 rounded-full">
                        <Pencil />
                      </button>
                    </td>
                    <td className="py-4 text-center px-4">
                      <button
                        onClick={() => handleDelete(foundation.id)}
                        className=" text-red-500 px-4 py-1 rounded-full">
                        <Trash2 />
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


      {/* Modal */}

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
          className="modal-box w-full max-w-4xl">
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={e => e.target.closest('dialog').close()}
          >
            ✕
          </button>
          <h3 className="text-2xl font-bold mb-4">เพิ่มมูลนิธิ</h3>
          <div className="flex flex-col lg:flex-row gap-6">

            {/* File Upload Section */}
            {/* Upload Image */}
            <div className="col-span-2 form-control w-1/2 h-full ">
              <label className="label">
                <span className="block text-gray-700 font-medium mb-2">เพิ่มรุปภาพ</span>
              </label>
              <div className="flex items-center justify-center w-full h-full">
                <div
                  className="flex flex-col items-center justify-center w-full h-[250px] border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 relative p-2"
                  onClick={() => document.getElementById('input-file').click()}
                >
                  {!image && (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <UploadIcon className="w-10 h-10 mb-3 text-gray-400" />
                      <p className="text-sm text-gray-400">Click to upload</p>
                    </div>
                  )}
                  <input
                    type="file"
                    id='input-file'
                    className="hidden"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  <div className='w-full absolute top-1 right-1 flex justify-end'>
                    {image && (
                      <CloseIcon
                        className='w-10 h-10 hover:scale-110 active:scale-100 rounded-full cursor-pointer opacity-60'
                        onClick={(e) => {
                          e.stopPropagation();
                          document.getElementById('input-file').value = '';
                          setImage(null);
                        }}
                      />
                    )}
                  </div>
                  {image && <img src={URL.createObjectURL(image)} className='w-1/2 h-full object-cover' />}
                </div>
              </div>
            </div>

            {/* Input Fields Section */}
            <div className="w-full lg:w-1/2">
              <label className="block text-gray-700 font-medium mb-2">ชื่อมูลนิธิ</label>
              <input
                type="text"
                name='name'
                value={foundationData.name}
                placeholder="กรุณากรอกชื่อมูลนิธิ"
                className="input input-bordered w-full mb-4"
                onChange={handleChange}
              />
              {errors.name && <p className="text-red-500 text-sm mb-4">{errors.name}</p>}

              <label className="block text-gray-700 font-medium mb-2">ข้อมูลติดต่อมูลนิธิ</label>
              <input
                type="text"
                name='contactInfo'
                value={foundationData.contactInfo}
                placeholder="กรุณากรอกข้อมูลติดต่อ"
                className="input input-bordered w-full mb-4"
                onChange={handleChange}
              />
              {errors.contactInfo && <p className="text-red-500 text-sm mb-4">{errors.contactInfo}</p>}


              <label className="block text-gray-700 font-medium mb-2">ที่อยู่มูลนิธิ</label>
              <textarea
                placeholder="กรุณากรอกที่อยู่มูลนิธิ"
                name='address'
                value={foundationData.address}
                className="textarea textarea-bordered w-full mb-4"
                onChange={handleChange}
              />
              {errors.address && <p className="text-red-500 text-sm mb-4">{errors.address}</p>}


            </div>
          </div>

          {/* Buttons */}
          {loading ?
            <div className='flex justify-center'>
              <span className="loading loading-dots loading-lg"></span>
            </div>
            :
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => document.getElementById('create_Foundation_modal').close()}
                className="btn bg-red-500 text-white w-36">
                ยกเลิก
              </button>
              <button
                type="submit"
                className="btn
              bg-green-500
              text-white w-36">
                เพิ่มมูลนิธิ
              </button>
            </div>
          }
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
          className="modal-box w-full max-w-4xl">
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={e => e.target.closest('dialog').close()}
          >
            ✕
          </button>
          <h3 className="text-2xl font-bold mb-4">แก้ไขข้อมูล มูลนิธิ</h3>
          <div className="flex flex-col lg:flex-row gap-6">

            {/* File Upload Section */}
            {/* Upload Image */}
            <div className="col-span-2 form-control w-1/2 h-full ">
              <label className="label">
                <span className="block text-gray-700 font-medium mb-2">เพิ่มรุปภาพ</span>
              </label>
              {foundationDataForEdit.profilePicture ? (
                <div className="flex items-center justify-center w-full">
                  <div
                    className="flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 relative p-2"
                    onClick={() => document.getElementById('input-file').click()}
                  >
                    <input
                      type="file"
                      id='input-file'
                      className="hidden"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                    <div className='w-full absolute top-1 right-1 flex justify-end'>
                      {foundationDataForEdit.profilePicture && <CloseIcon
                        className='w-10 h-10 hover:scale-110 active:scale-100 rounded-full cursor-pointer opacity-60'
                        onClick={(e) => {
                          e.stopPropagation();
                          document.getElementById('input-file').value = '';
                          setFoundationDataForEdit((prevData) => ({ ...prevData, profilePicture: null }));
                        }}
                      />}
                    </div>
                    {foundationDataForEdit.profilePicture && <img src={foundationDataForEdit.profilePicture} className='w-1/2 h-full object-cover' />}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <div
                    className="flex flex-col items-center justify-center w-full h-[250px] border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 relative p-2"
                    onClick={() => document.getElementById('input-file').click()}
                  >
                    {!image && (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadIcon className="w-10 h-10 mb-3 text-gray-400" />
                        <p className="text-sm text-gray-400">Click to upload</p>
                      </div>
                    )}
                    <input
                      type="file"
                      id='input-file'
                      className="hidden"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                    <div className='w-full absolute top-1 right-1 flex justify-end'>
                      {image && (
                        <CloseIcon
                          className='w-10 h-10 hover:scale-110 active:scale-100 rounded-full cursor-pointer opacity-60'
                          onClick={(e) => {
                            e.stopPropagation();
                            document.getElementById('input-file').value = '';
                            setImage(null);
                          }}
                        />
                      )}
                    </div>
                    {image && <img src={URL.createObjectURL(image)} className='w-1/2 h-full object-cover' />}
                  </div>
                </div>
              )}
            </div>

            {/* Input Fields Section */}
            <div className="w-full lg:w-1/2">
              <label className="block text-gray-700 font-medium mb-2">ชื่อมูลนิธิ</label>
              <input
                type="text"
                name='name'
                value={foundationDataForEdit.name}
                placeholder="กรุณากรอกชื่อมูลนิธิ"
                className="input input-bordered w-full mb-4"
                onChange={handleEditChange}
              />
              {errors.name && <p className="text-red-500 text-sm mb-4">{errors.name}</p>}

              <label className="block text-gray-700 font-medium mb-2">ข้อมูลติดต่อมูลนิธิ</label>
              <input
                type="text"
                name='contactInfo'
                value={foundationDataForEdit.contactInfo}
                placeholder="กรุณากรอกข้อมูลติดต่อ"
                className="input input-bordered w-full mb-4"
                onChange={handleEditChange}
              />
              {errors.contactInfo && <p className="text-red-500 text-sm mb-4">{errors.contactInfo}</p>}


              <label className="block text-gray-700 font-medium mb-2">ที่อยู่มูลนิธิ</label>
              <textarea
                placeholder="กรุณากรอกที่อยู่มูลนิธิ"
                name='address'
                value={foundationDataForEdit.address}
                className="textarea textarea-bordered w-full mb-4"
                onChange={handleEditChange}
              />
              {errors.address && <p className="text-red-500 text-sm mb-4">{errors.address}</p>}


            </div>
          </div>

          {/* Buttons */}
          {loading ?
            <div className='flex justify-center'>
              <span className="loading loading-dots loading-lg"></span>
            </div>
            :
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => document.getElementById('edit_Foundation_modal').close()}
                className="btn bg-red-500 text-white w-36">
                ยกเลิก
              </button>
              <button
                type="submit"
                className="btn
              bg-green-500
              text-white w-36">
                ตกลง
              </button>
            </div>
          }
        </form>
      </dialog>
    </>
  )
}

export default ManageCharity