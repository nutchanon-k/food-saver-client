// import React, { useEffect, useState } from 'react';
// import useUserStore from '../../stores/userStore';
// import Swal from 'sweetalert2';
// import useSearchStore from '../../stores/SearchStore';
// import Pagination from '../../components/Pagination';
// import { getUserByQueryAPI } from '../../API/UserApi';
// import useStore from '../../stores/Store';

// const ManageStore = () => {
//     const activateUser = useUserStore(state => state.activateUser);
//     const searchText = useSearchStore(state => state.searchText);
//     const getStoreQuery = useStore(state => state.getStoreQuery);
//     const verifyStore = useStore(state => state.verifyStore);

//     const [user, setUser] = useState(null);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [isOpen, setIsOpen] = useState(false);
//     const [userData, setUserData] = useState({});
//     const [roleFilter, setRoleFilter] = useState('')


//     const [store, setStore] = useState(null);
//     const [storeData, setStoreData] = useState({});
//     const [verifyFilter, setVerifyFilter] = useState('')


//     const fetchStore = async (page) => {
//         try {
//             const result = await getStoreQuery(page, searchText, verifyFilter);
//             setTotalPages(result?.totalPage);
//             setStore(result?.data);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         fetchStore(currentPage);

//     }, [currentPage, searchText, verifyFilter]);

//     useEffect(() => {
//         setCurrentPage(1)
//     }, [searchText, roleFilter]);

//     const handlePageChange = (page) => {
//         setCurrentPage(page);
//     };
//     const toggleStatus = async (id) => {
//         let index = store.findIndex((store) => store.id === id);
//         if (store[index].isVerify === true) {

//             const swalWithBootstrapButtons = Swal.mixin({
//                 customClass: {
//                     confirmButton: "btn btn-success ml-2",
//                     cancelButton: "btn btn-error mr-2"
//                 },
//                 buttonsStyling: false
//             });
//             swalWithBootstrapButtons.fire({
//                 title: "Are you sure?",
//                 text: "Do you want to deactivate this store!",
//                 icon: "warning",
//                 showCancelButton: true,
//                 confirmButtonText: "Yes, deactivate it!",
//                 cancelButtonText: "No, cancel!",
//                 reverseButtons: true
//             }).then(async (result) => {
//                 if (result.isConfirmed) {
//                     try {
//                         const result = await verifyStore(id);
//                         console.log(result)
//                         if (result) {
//                             console.log("success")
//                         }
//                         setStore(
//                             store.map(store =>
//                                 store.id === id ? { ...store, isVerify: !store.isVerify } : store
//                             )
//                         );
//                     } catch (error) {
//                         console.log(error)
//                     }
//                     swalWithBootstrapButtons.fire({
//                         title: "Deactivated!",
//                         text: "Store has been deactivated.",
//                         icon: "success"
//                     });
//                 } else if (

//                     result.dismiss === Swal.DismissReason.cancel
//                 ) {
//                     swalWithBootstrapButtons.fire({
//                         title: "Cancelled",
//                         text: "User is safe :)",
//                         icon: "error"
//                     });
//                 }
//             });
//         } else {
//             const swalWithBootstrapButtons = Swal.mixin({
//                 customClass: {
//                     confirmButton: "btn btn-success ml-2",
//                     cancelButton: "btn btn-error mr-2"
//                 },
//                 buttonsStyling: false
//             });
//             swalWithBootstrapButtons.fire({
//                 title: "Are you sure?",
//                 text: "Do you want to verify this store!",
//                 icon: "warning",
//                 showCancelButton: true,
//                 confirmButtonText: "Yes, verify it!",
//                 cancelButtonText: "No, cancel!",
//                 reverseButtons: true
//             }).then(async (result) => {
//                 if (result.isConfirmed) {
//                     try {

//                         const result = await verifyStore(id);
//                         if (result) {
//                             console.log("success")
//                         }
//                         setStore(
//                             store.map(store =>
//                                 store.id === id ? { ...store, isVerify: !store.isVerify } : store
//                             )
//                         );
//                     } catch (error) {
//                         console.log(error)
//                     }
//                     swalWithBootstrapButtons.fire({
//                         title: "Verified!",
//                         text: "Store has been Verified.",
//                         icon: "success"
//                     });
//                 } else if (
//                     /* Read more about handling dismissals below */
//                     result.dismiss === Swal.DismissReason.cancel
//                 ) {
//                     swalWithBootstrapButtons.fire({
//                         title: "Cancelled",
//                         text: "Store is still unverified :)",
//                         icon: "error"
//                     });
//                 }
//             });
//         }
//     };

//     console.log(store)
//     console.log(currentPage, totalPages)

//     return (
//         <>
//             <div className="p-6 min-h-screen flex justify-center items-center">
//                 <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-6xl min-h-[500px]">
//                     <div className='flex justify-between'>
//                         <h2 className="text-3xl font-semibold">Manage Store</h2>
//                         <div className="mb-4">
//                             <label htmlFor="roleFilter" className="mr-2">Filter verified:</label>
//                             <select
//                                 id="verifyFilter"
//                                 value={verifyFilter}
//                                 onChange={(e) => setVerifyFilter
//                                     (e.target.value)}
//                                 className="py-2 px-4 border rounded"
//                             >
//                                 <option value="">All</option>
//                                 <option value={true}>verified</option>
//                                 <option value={false}>unverified</option>

//                             </select>
//                         </div>
//                     </div>
//                     <hr className='my-4' />
//                     <div className='min-h-[880px]'>

//                         <table className="w-full  text-left">
//                             <thead>
//                                 <tr>
//                                     <th className="pb-2 border-b text-center">รูปภาพ</th>
//                                     <th className="pb-2 border-b text-center">ชื่อร้าน</th>
//                                     <th className="pb-2 border-b text-center">ที่อยู่</th>
//                                     <th className="pb-2 border-b text-center">รายละเอียด</th>
//                                     <th className="pb-2 border-b text-center">สถานะ</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {store?.map(store => (
//                                     <tr key={store.id} className="hover:bg-gray-50">
//                                         <td className="py-4 flex items-center justify-center space-x-4">
//                                             <div className="w-24 h-24  flex items-center justify-center overflow-hidden">
//                                                 <img src={store.profilePicture} alt="User Avatar" className="" />
//                                             </div>
//                                             {/* <span>{user.name}</span> */}
//                                         </td>
//                                         <td className="py-4 text-center w-56">
//                                             <p className="py-1">
//                                                 {store.storeName}
//                                             </p>
//                                         </td>
//                                         <td className="py-4 text-center w-80">
//                                             <p className="py-1">
//                                                 {store.storeAddress}
//                                             </p>
//                                         </td>
//                                         <td className="py-4 text-center">
//                                             <button
//                                                 onClick={() => {
//                                                     setStoreData(store)
//                                                     setIsOpen(true)
//                                                     document.getElementById('store_detail_modal').showModal()
//                                                 }}
//                                                 className="bg-yellow-200 text-yellow-800 px-4 py-1 rounded-full">
//                                                 View
//                                             </button>
//                                         </td>
//                                         <td className="py-4 space-x-4 w-36 ">
//                                             <div className="flex items-center justify-center space-x-2 gap-2">
//                                                 {/* Toggle Switch */}

//                                                 <>
//                                                     <label className="flex cursor-pointer gap-2">
//                                                         <input
//                                                             type="checkbox"
//                                                             checked={store.isVerify}
//                                                             onChange={() => toggleStatus(store.id)}
//                                                             className="toggle theme-controller"
//                                                         />
//                                                     </label>
//                                                     <span className={`text-sm font-medium ${store.isVerify ? 'text-green-600' : 'text-red-500'}`}>
//                                                         {store.isVerify ? 'verified' : 'unverified'}
//                                                     </span>
//                                                 </>

//                                             </div>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>

//                     {/* Pagination */}
//                     <div className='flex justify-center'>
//                         <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
//                     </div>
//                 </div>
//             </div>

//             {/* User Detail Modal */}
//             <dialog id="store_detail_modal" className="modal" onClose={() => setIsOpen(false)}>
//                 <div className="modal-box w-full max-w-3xl p-6">
//                     <button
//                         type="button"
//                         className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
//                         onClick={(e) => e.target.closest('dialog').close()}
//                     >
//                         ✕
//                     </button>
//                     <h2 className="text-3xl font-bold mb-4 text-gray-800">ข้อมูลร้านค้า</h2>

//                     <div className="flex flex-col lg:flex-row gap-4">
//                         {/* รูปภาพ */}
//                         <figure className="lg:w-1/2">
//                             <img
//                                 src={storeData.profilePicture}
//                                 alt="Album"
//                                 className="w-72 h-72 object-cover rounded-lg shadow-md" // กำหนดขนาดรูปภาพให้คงที่
//                             />
//                         </figure>

//                         {/* ข้อมูลร้านค้า */}
//                         <div className="lg:w-1/2 flex flex-col space-y-4">
//                             <p className="text-gray-700">
//                                 <span className="font-semibold">ID:</span> {storeData.id}
//                             </p>
//                             <p className="text-gray-700">
//                                 <span className="font-semibold">ชื่อร้านค้า:</span> {storeData.storeName}
//                             </p>
//                             <p className="text-gray-700">
//                                 <span className="font-semibold">ที่อยู่:</span> {storeData.storeAddress}
//                             </p>
//                             <p className="text-gray-700">
//                                 <span className="font-semibold">เบอร์โทรศัพท์:</span> {storeData.phoneNumber}
//                             </p>
//                             <p className="text-gray-700">
//                                 <span className="font-semibold">รายละเอียดอื่นๆ:</span> {storeData.storeDetails}
//                             </p>

//                         </div>
//                     </div>
//                 </div>
//             </dialog>

//         </>
//     );
// };

// export default ManageStore
// // import React, { useEffect, useState } from 'react';
// // import useUserStore from '../../stores/userStore';
// // import Swal from 'sweetalert2';
// // import useSearchStore from '../../stores/SearchStore';
// // import Pagination from '../../components/Pagination';
// // import useStore from '../../stores/Store';

// // const ManageStore = () => {
// //     const activateUser = useUserStore(state => state.activateUser);
// //     const searchText = useSearchStore(state => state.searchText);
// //     const getStoreQuery = useStore(state => state.getStoreQuery);
// //     const verifyStore = useStore(state => state.verifyStore);

// //     const [store, setStore] = useState(null);
// //     const [currentPage, setCurrentPage] = useState(1);
// //     const [totalPages, setTotalPages] = useState(1);
// //     const [isOpen, setIsOpen] = useState(false);
// //     const [storeData, setStoreData] = useState({});
// //     const [verifyFilter, setVerifyFilter] = useState('');

// //     const fetchStore = async (page) => {
// //         try {
// //             const result = await getStoreQuery(page, searchText, verifyFilter);
// //             setTotalPages(result?.totalPage);
// //             setStore(result?.data);
// //         } catch (error) {
// //             console.log(error);
// //         }
// //     };

// //     useEffect(() => {
// //         fetchStore(currentPage);
// //     }, [currentPage, searchText, verifyFilter]);

// //     useEffect(() => {
// //         setCurrentPage(1);
// //     }, [searchText, verifyFilter]);

// //     const handlePageChange = (page) => {
// //         setCurrentPage(page);
// //     };

// //     const toggleStatus = async (id) => {
// //         // Toggle status logic remains here
// //     };

// //     return (
// //         <>
// //             {/* ลบ padding บน container เพื่อให้ชิดกับ sidebar */}
// //             <div className="min-h-screen flex justify-center items-center bg-gray-100 lg:p-6 p-0">
// //                 <div className="bg-white rounded-lg shadow-md w-full max-w-6xl">
// //                     <div className="flex justify-between items-center p-6">
// //                         <h2 className="text-3xl font-semibold">Manage Store</h2>
// //                         <div>
// //                             <label htmlFor="verifyFilter" className="mr-2 font-medium">Filter verified:</label>
// //                             <select
// //                                 id="verifyFilter"
// //                                 value={verifyFilter}
// //                                 onChange={(e) => setVerifyFilter(e.target.value)}
// //                                 className="py-2 px-4 border rounded focus:outline-none focus:border-green-500"
// //                             >
// //                                 <option value="">All</option>
// //                                 <option value={true}>Verified</option>
// //                                 <option value={false}>Unverified</option>
// //                             </select>
// //                         </div>
// //                     </div>
// //                     <hr className='my-4' />

// //                     <div className="overflow-x-auto">
// //                         <table className="w-full text-left border-collapse">
// //                             <thead>
// //                                 <tr>
// //                                     <th className="pb-2 pt-2 pl-4 border-b text-center">รูปภาพ</th>
// //                                     <th className="pb-2 pt-2 border-b text-center">ชื่อร้าน</th>
// //                                     <th className="pb-2 pt-2 border-b text-center">ที่อยู่</th>
// //                                     <th className="pb-2 pt-2 border-b text-center">รายละเอียด</th>
// //                                     <th className="pb-2 pt-2 border-b text-center">สถานะ</th>
// //                                 </tr>
// //                             </thead>
// //                             <tbody>
// //                                 {store?.map(store => (
// //                                     <tr key={store.id} className="hover:bg-gray-50">
// //                                         <td className="py-4 px-4 text-center">
// //                                             {/* ทำให้รูปภาพเป็นวงกลม */}
// //                                             <img src={store.profilePicture} alt="Store Avatar" className="w-16 h-16 rounded-full mx-auto object-cover" />
// //                                         </td>
// //                                         <td className="py-4 px-4 text-center">
// //                                             <p className="whitespace-nowrap overflow-hidden text-ellipsis">{store.storeName}</p>
// //                                         </td>
// //                                         <td className="py-4 px-4 text-center">
// //                                             <p className="whitespace-nowrap overflow-hidden text-ellipsis">{store.storeAddress}</p>
// //                                         </td>
// //                                         <td className="py-4 px-4 text-center">
// //                                             <button
// //                                                 onClick={() => {
// //                                                     setStoreData(store);
// //                                                     setIsOpen(true);
// //                                                     document.getElementById('store_detail_modal').showModal();
// //                                                 }}
// //                                                 className="bg-yellow-200 text-yellow-800 px-4 py-1 rounded-full hover:bg-yellow-300"
// //                                             >
// //                                                 View
// //                                             </button>
// //                                         </td>
// //                                         <td className="py-4 px-4 text-center">
// //                                             <label className="flex items-center justify-center">
// //                                                 <input
// //                                                     type="checkbox"
// //                                                     checked={store.isVerify}
// //                                                     onChange={() => toggleStatus(store.id)}
// //                                                     className="toggle toggle-success"
// //                                                 />
// //                                                 <span className={`ml-2 ${store.isVerify ? 'text-green-600' : 'text-red-500'}`}>
// //                                                     {store.isVerify ? 'Verified' : 'Unverified'}
// //                                                 </span>
// //                                             </label>
// //                                         </td>
// //                                     </tr>
// //                                 ))}
// //                             </tbody>
// //                         </table>
// //                     </div>

// //                     <div className="flex justify-center mt-6">
// //                         <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
// //                     </div>
// //                 </div>
// //             </div>

// //             <dialog id="store_detail_modal" className="modal" onClose={() => setIsOpen(false)}>
// //                 <div className="modal-box w-full max-w-3xl p-6">
// //                     <button
// //                         type="button"
// //                         className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
// //                         onClick={(e) => e.target.closest('dialog').close()}
// //                     >
// //                         ✕
// //                     </button>
// //                     <h2 className="text-3xl font-bold mb-4 text-gray-800">Store Details</h2>

// //                     <div className="flex flex-col lg:flex-row gap-4">
// //                         <figure className="lg:w-1/2">
// //                             <img
// //                                 src={storeData.profilePicture}
// //                                 alt="Store"
// //                                 className="w-full h-full object-cover rounded-lg shadow-md"
// //                             />
// //                         </figure>
// //                         <div className="lg:w-1/2 flex flex-col space-y-4">
// //                             <p><strong>ID:</strong> {storeData.id}</p>
// //                             <p><strong>Name:</strong> {storeData.storeName}</p>
// //                             <p><strong>Address:</strong> {storeData.storeAddress}</p>
// //                             <p><strong>Phone:</strong> {storeData.phoneNumber}</p>
// //                             <p><strong>Details:</strong> {storeData.storeDetails}</p>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </dialog>
// //         </>
// //     );
// // };

// // export default ManageStore;



import React, { useEffect, useState } from 'react';
import useUserStore from '../../stores/userStore';
import Swal from 'sweetalert2';
import useSearchStore from '../../stores/SearchStore';
import Pagination from '../../components/Pagination';
import useStore from '../../stores/Store';

const ManageStore = () => {
    const activateUser = useUserStore(state => state.activateUser);
    const searchText = useSearchStore(state => state.searchText);
    const getStoreQuery = useStore(state => state.getStoreQuery);
    const verifyStore = useStore(state => state.verifyStore);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [store, setStore] = useState(null);
    const [storeData, setStoreData] = useState({});
    const [verifyFilter, setVerifyFilter] = useState('');

    const fetchStore = async (page) => {
        try {
            const result = await getStoreQuery(page, searchText, verifyFilter);
            setTotalPages(result?.totalPage);
            setStore(result?.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchStore(currentPage);
    }, [currentPage, searchText, verifyFilter]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchText]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const toggleStatus = async (id) => {
        let index = store.findIndex((store) => store.id === id);
        const isVerified = store[index].isVerify;
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success ml-2",
                cancelButton: "btn btn-error mr-2"
            },
            buttonsStyling: false
        });

        swalWithBootstrapButtons.fire({
            title: isVerified ? "Deactivate this store?" : "Verify this store?",
            text: isVerified ? "Do you want to deactivate this store!" : "Do you want to verify this store!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: isVerified ? "Yes, deactivate it!" : "Yes, verify it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const updateResult = await verifyStore(id);
                    if (updateResult) {
                        setStore(
                            store.map(store =>
                                store.id === id ? { ...store, isVerify: !store.isVerify } : store
                            )
                        );
                        swalWithBootstrapButtons.fire({
                            title: isVerified ? "Deactivated!" : "Verified!",
                            text: isVerified ? "Store has been deactivated." : "Store has been verified.",
                            icon: "success"
                        });
                    }
                } catch (error) {
                    console.log(error);
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    text: isVerified ? "Store remains active." : "Store remains unverified.",
                    icon: "error"
                });
            }
        });
    };

    return (
        <div className="p-0 sm:p-6 min-h-screen flex justify-center items-center w-full">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 w-full max-w-6xl min-h-[500px]">
                <div className='flex flex-col sm:flex-row justify-between items-center'>
                    <h2 className="text-2xl sm:text-3xl font-semibold">Manage Store</h2>
                    <div className="my-4 sm:my-0">
                        <label htmlFor="verifyFilter" className="mr-2">Filter verified:</label>
                        <select
                            id="verifyFilter"
                            value={verifyFilter}
                            onChange={(e) => setVerifyFilter(e.target.value)}
                            className="py-2 px-4 border rounded"
                        >
                            <option value="">All</option>
                            <option value={true}>Verified</option>
                            <option value={false}>Unverified</option>
                        </select>
                    </div>
                </div>

                <hr className='my-4' />

                <div className='overflow-x-auto'>
                    <table className="w-full  text-left">
                        <thead>
                            <tr>
                                <th className="pb-2 border-b-2 border-gray-200 text-center text-sm sm:text-base px-4 max-w-[100px]">Image</th>
                                <th className="pb-2 border-b-2 border-gray-200 text-center text-sm sm:text-base px-4 max-w-[250px]">Store Name</th>
                                <th className="pb-2 border-b-2 border-gray-200 text-center text-sm sm:text-base px-4 max-w-[350px]">Address</th>
                                <th className="pb-2 border-b-2 border-gray-200 text-center text-sm sm:text-base px-4 max-w-[150px]">Details</th>
                                <th className="pb-2 border-b-2 border-gray-200 text-center text-sm sm:text-base px-4 max-w-[150px]">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {store?.map(store => (
                                <tr key={store.id} className="bg-white hover:bg-gray-50 shadow-sm rounded-lg">
                                    <td className="py-4 text-center max-w-[100px]">
                                        <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full overflow-hidden mx-auto">
                                            <img src={store.profilePicture} alt="Store Avatar" className="object-cover w-full h-full" />
                                        </div>
                                    </td>
                                    <td className="py-4 text-center px-4 text-sm sm:text-base font-medium text-gray-700 max-w-[250px] break-words">
                                        <p className="py-1">{store.storeName}</p>
                                    </td>
                                    <td className="py-4 text-center px-4 text-sm sm:text-base text-gray-600 max-w-[350px] break-words">
                                        <p className="py-1">{store.storeAddress}</p>
                                    </td>
                                    <td className="py-4 text-center max-w-[150px]">
                                        <button
                                            onClick={() => {
                                                setStoreData(store);
                                                setIsOpen(true);
                                                document.getElementById('store_detail_modal').showModal();
                                            }}
                                            className="bg-yellow-200 text-yellow-800 px-4 py-1 rounded-full text-sm sm:text-base"
                                        >
                                            View
                                        </button>
                                    </td>
                                    <td className="py-4 text-center px-4 max-w-[150px]">
                                        <div className="flex items-center justify-center gap-2">
                                            <label className="flex cursor-pointer gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={store.isVerify}
                                                    onChange={() => toggleStatus(store.id)}
                                                    className="toggle theme-controller"
                                                />
                                            </label>
                                            <span className={`text-xs sm:text-sm font-medium ${store.isVerify ? 'text-green-600' : 'text-red-500'}`}>
                                                {store.isVerify ? 'Verified' : 'Unverified'}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className='flex justify-center mt-4'>
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </div>
            </div>

            <dialog id="store_detail_modal" className="modal" onClose={() => setIsOpen(false)}>
                <div className="modal-box w-full max-w-3xl p-6">
                    <button
                        type="button"
                        className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
                        onClick={(e) => e.target.closest('dialog').close()}
                    >
                        ✕
                    </button>
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">Store Information</h2>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <figure className="sm:w-1/2">
                            <img
                                src={storeData.profilePicture}
                                alt="Store Profile"
                                className="w-48 h-48 sm:w-72 sm:h-72 object-cover rounded-lg shadow-md"
                            />
                        </figure>
                        <div className="sm:w-1/2 flex flex-col space-y-4">
                            <p className="text-gray-700 text-sm sm:text-base"><span className="font-semibold">ID:</span> {storeData.id}</p>
                            <p className="text-gray-700 text-sm sm:text-base"><span className="font-semibold">Store Name:</span> {storeData.storeName}</p>
                            <p className="text-gray-700 text-sm sm:text-base"><span className="font-semibold">Address:</span> {storeData.storeAddress}</p>
                            <p className="text-gray-700 text-sm sm:text-base"><span className="font-semibold">Phone:</span> {storeData.phoneNumber}</p>
                            <p className="text-gray-700 text-sm sm:text-base"><span className="font-semibold">Details:</span> {storeData.storeDetails}</p>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>


    );
};

export default ManageStore;
