// import React, { useEffect, useState } from 'react';
// import useUserStore from '../../stores/userStore';
// import Swal from 'sweetalert2';
// import useSearchStore from '../../stores/SearchStore';
// import Pagination from '../../components/Pagination';
// import { getUserByQueryAPI } from '../../API/UserApi';

// const ManageUser = () => {
//     const activateUser = useUserStore(state => state.activateUser);
//     const searchText = useSearchStore(state => state.searchText);

//     const [user, setUser] = useState(null);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [isOpen, setIsOpen] = useState(false);
//     const [userData, setUserData] = useState({});
//     const [roleFilter, setRoleFilter] = useState('')

//     const fetchUser = async (page) => {
//         try {
//             const result = await getUserByQueryAPI(page, searchText, roleFilter);
//             setTotalPages(result?.data.totalPages);
//             setUser(result?.data.data);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         fetchUser(currentPage);

//     }, [currentPage, searchText, roleFilter]);

//     useEffect(() => {
//         setCurrentPage(1)
//     }, [searchText, roleFilter]);

//     const handlePageChange = (page) => {
//         setCurrentPage(page);
//     };
//     const toggleStatus = async (id) => {
//         let index = user.findIndex((user) => user.id === id);
//         if (user[index].isActive === true) {
//             const swalWithBootstrapButtons = Swal.mixin({
//                 customClass: {
//                     confirmButton: "btn btn-success ml-2",
//                     cancelButton: "btn btn-error mr-2"
//                 },
//                 buttonsStyling: false
//             });
//             swalWithBootstrapButtons.fire({
//                 title: "Are you sure?",
//                 text: "Do you want to deactivate this user!",
//                 icon: "warning",
//                 showCancelButton: true,
//                 confirmButtonText: "Yes, deactivate it!",
//                 cancelButtonText: "No, cancel!",
//                 reverseButtons: true
//             }).then(async (result) => {
//                 if (result.isConfirmed) {
//                     try {

//                         const result = await activateUser(id);
//                         if (result) {
//                             console.log("success")
//                         }
//                         setUser(
//                             user.map(user =>
//                                 user.id === id ? { ...user, isActive: !user.isActive } : user
//                             )
//                         );
//                     } catch (error) {
//                         console.log(error)
//                     }
//                     swalWithBootstrapButtons.fire({
//                         title: "Deactivated!",
//                         text: "User has been deactivated.",
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
//                 text: "Do you want to activate this user!",
//                 icon: "warning",
//                 showCancelButton: true,
//                 confirmButtonText: "Yes, activate it!",
//                 cancelButtonText: "No, cancel!",
//                 reverseButtons: true
//             }).then(async (result) => {
//                 if (result.isConfirmed) {
//                     try {

//                         const result = await activateUser(id);
//                         if (result) {
//                             console.log("success")
//                         }
//                         setUser(
//                             user.map(user =>
//                                 user.id === id ? { ...user, isActive: !user.isActive } : user
//                             )
//                         );
//                     } catch (error) {
//                         console.log(error)
//                     }
//                     swalWithBootstrapButtons.fire({
//                         title: "Activated!",
//                         text: "User has been activated.",
//                         icon: "success"
//                     });
//                 } else if (
//                     /* Read more about handling dismissals below */
//                     result.dismiss === Swal.DismissReason.cancel
//                 ) {
//                     swalWithBootstrapButtons.fire({
//                         title: "Cancelled",
//                         text: "User still deactivated :)",
//                         icon: "error"
//                     });
//                 }
//             });
//         }
//     };

//     return (
//         <>
//             <div className="p-6 min-h-screen flex justify-center items-center">
//                 <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-6xl min-h-[500px]">
//                     <div className='flex justify-between'>
//                         <h2 className="text-3xl font-semibold">Manage User</h2>
//                         <div className="mb-4">
//                             <label htmlFor="roleFilter" className="mr-2">Filter by Role:</label>
//                             <select
//                                 id="roleFilter"
//                                 value={roleFilter}
//                                 onChange={(e) => setRoleFilter(e.target.value)}
//                                 className="p-2 border rounded"
//                             >
//                                 <option value="">All</option>
//                                 <option value="ADMIN">Admin</option>
//                                 <option value="BUYER">Buyer</option>
//                                 <option value="SELLER">Seller</option>
//                             </select>
//                         </div>
//                     </div>
//                     <hr className='my-4' />
//                     <div className='min-h-[880px]'>

//                         <table className="w-full  text-left">
//                             <thead>
//                                 <tr>
//                                     <th className="pb-2 border-b text-center">รูปภาพ</th>
//                                     <th className="pb-2 border-b text-center">ชื่อ</th>
//                                     <th className="pb-2 border-b text-center">Email</th>
//                                     <th className="pb-2 border-b text-center">Role</th>
//                                     <th className="pb-2 border-b text-center">รายละเอียด</th>
//                                     <th className="pb-2 border-b text-center">สถานะ</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {user?.map(user => (
//                                     <tr key={user.id} className="hover:bg-gray-50">
//                                         <td className="py-4 flex items-center justify-center space-x-4">
//                                             <div className="w-24 h-24 rounded-full flex items-center justify-center">
//                                                 <img src={user.profilePicture} alt="User Avatar" className="rounded-full" />
//                                             </div>
//                                             {/* <span>{user.name}</span> */}
//                                         </td>
//                                         <td className="py-4 text-center">
//                                             <p className="py-1">
//                                                 {user.firstName + ' ' + user.lastName}
//                                             </p>
//                                         </td>
//                                         <td className="py-4 text-center w-24">
//                                             <p className="py-1">
//                                                 {user.email}
//                                             </p>
//                                         </td>
//                                         <td className="py-4 text-center">
//                                             <p className="py-1">
//                                                 {user.role}
//                                             </p>
//                                         </td>
//                                         <td className="py-4 text-center">
//                                             <button
//                                                 onClick={() => {
//                                                     setUserData(user)
//                                                     setIsOpen(true)
//                                                     document.getElementById('user_detail_modal').showModal()
//                                                 }}
//                                                 className="bg-yellow-200 text-yellow-800 px-4 py-1 rounded-full">
//                                                 View
//                                             </button>
//                                         </td>
//                                         <td className="py-4 space-x-4 w-36 ">
//                                             <div className="flex items-center justify-center space-x-2 gap-2">
//                                                 {/* Toggle Switch */}
//                                                 {user.role === 'ADMIN' ? null : (
//                                                     <>
//                                                         <label className="flex cursor-pointer gap-2">
//                                                             <input
//                                                                 type="checkbox"
//                                                                 checked={user.isActive}
//                                                                 onChange={() => toggleStatus(user.id)}
//                                                                 className="toggle theme-controller"
//                                                             />
//                                                         </label>
//                                                         <span className={`text-sm font-medium ${user.isActive ? 'text-green-600' : 'text-red-500'}`}>
//                                                             {user.isActive ? 'Active' : 'Deactivate'}
//                                                         </span>
//                                                     </>
//                                                 )}
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
//             <dialog id="user_detail_modal" className="modal" onClose={() => { setIsOpen(false) }}>
//                 <div className="modal-box">

//                     <button
//                         type='button'
//                         className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
//                         onClick={e => e.target.closest('dialog').close()}
//                     >
//                         ✕
//                     </button>
//                     <h2 className="card-title -mb-5 ">ข้อมูลผู้ใช้งาน</h2>
//                     <div className="card xl:card-side w-full">
//                         <figure>
//                             <img
//                                 src={userData.profilePicture}
//                                 alt="Album" 
//                                 className='w-60  object-cover' 
//                                 />

//                         </figure>
//                         <div className="card-body w-100">
//                             <p>ชื่อ : {userData.firstName + ' ' + userData.lastName}</p>
//                             <p>Email : {userData.email}</p>
//                             <p>เบอร์โทรศัพท์ : {userData.phoneNumber}</p>
//                             <p>Role : {userData.role}</p>
//                             <p>ที่อยู่ : {userData.address}</p>
//                         </div>
//                     </div>


//                 </div>
//             </dialog>
//         </>
//     );
// };

// export default ManageUser;

// =========================codeเก่า======================================================
// import React, { useEffect, useState } from 'react';
// import useUserStore from '../../stores/userStore';
// import Swal from 'sweetalert2';
// import useSearchStore from '../../stores/SearchStore';
// import Pagination from '../../components/Pagination';
// import { getUserByQueryAPI } from '../../API/UserApi';

// const ManageUser = () => {
//     const activateUser = useUserStore(state => state.activateUser);
//     const searchText = useSearchStore(state => state.searchText);

//     const [user, setUser] = useState(null);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [isOpen, setIsOpen] = useState(false);
//     const [userData, setUserData] = useState({});
//     const [roleFilter, setRoleFilter] = useState('');

//     const fetchUser = async (page) => {
//         try {
//             const result = await getUserByQueryAPI(page, searchText, roleFilter);
//             setTotalPages(result?.data.totalPages);
//             setUser(result?.data.data);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         fetchUser(currentPage);
//     }, [currentPage, searchText, roleFilter]);

//     useEffect(() => {
//         setCurrentPage(1);
//     }, [searchText, roleFilter]);

//     const handlePageChange = (page) => {
//         setCurrentPage(page);
//     };

//     const toggleStatus = async (id) => {
//         const userIndex = user.findIndex((user) => user.id === id);
//         const currentUserStatus = user[userIndex].isActive;

//         const confirmationText = currentUserStatus ?
//             "Do you want to deactivate this user?" :
//             "Do you want to activate this user?";

//         const successText = currentUserStatus ?
//             "User has been deactivated." :
//             "User has been activated.";

//         const result = await Swal.fire({
//             title: "Are you sure?",
//             text: confirmationText,
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonText: currentUserStatus ? "Yes, deactivate it!" : "Yes, activate it!",
//             cancelButtonText: "No, cancel!",
//             reverseButtons: true,
//             customClass: {
//                 confirmButton: "btn btn-success ml-2",
//                 cancelButton: "btn btn-error mr-2"
//             },
//             buttonsStyling: false,
//         });

//         if (result.isConfirmed) {
//             try {
//                 await activateUser(id);
//                 setUser(
//                     user.map(user =>
//                         user.id === id ? { ...user, isActive: !user.isActive } : user
//                     )
//                 );
//                 Swal.fire("Success!", successText, "success");
//             } catch (error) {
//                 console.log(error);
//             }
//         } else if (result.dismiss === Swal.DismissReason.cancel) {
//             Swal.fire("Cancelled", "User status remains unchanged", "error");
//         }
//     };

//     return (
//         <>
//             <div className="p-0 sm:p-6 min-h-screen flex justify-center items-center w-full">
//                 <div className="bg-white rounded-lg shadow-md w-full sm:max-w-6xl sm:min-h-[500px]">
//                     <div className="flex flex-col md:flex-row md:justify-between mb-4 px-4 py-6 sm:px-6">
//                         <h2 className="text-3xl font-semibold">Manage User</h2>
//                         <div className="flex items-center mt-4 md:mt-0">
//                             <label htmlFor="roleFilter" className="mr-2">Filter by Role:</label>
//                             <select
//                                 id="roleFilter"
//                                 value={roleFilter}
//                                 onChange={(e) => setRoleFilter(e.target.value)}
//                                 className="p-2 border rounded"
//                             >
//                                 <option value="">All</option>
//                                 <option value="ADMIN">Admin</option>
//                                 <option value="BUYER">Buyer</option>
//                                 <option value="SELLER">Seller</option>
//                             </select>
//                         </div>
//                     </div>

//                     <div className="overflow-x-auto">
//                         <table className="w-full text-left">
//                             <thead>
//                                 <tr>
//                                     <th className="pb-4 pt-2 pl-4  border-b text-center">รูปภาพ</th>
//                                     <th className="pb-4 pt-2 border-b text-center">ชื่อ</th>
//                                     <th className="pb-4 pt-2 border-b text-center">Email</th>
//                                     <th className="pb-4 pt-2 border-b text-center">Role</th>
//                                     <th className="pb-4 pt-2 border-b text-center">รายละเอียด</th>
//                                     <th className="pb-4 pt-2 border-b text-center">สถานะ</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {user?.map(user => (
//                                     <tr key={user.id} className="hover:bg-gray-50">
//                                         <td className="py-4 pl-4  px-2 text-center">
//                                             <img src={user.profilePicture} alt="User Avatar" className="w-12 h-12 rounded-full mx-auto" />
//                                         </td>
//                                         <td className="py-4 px-2 text-center whitespace-nowrap">
//                                             {user.firstName} {user.lastName}
//                                         </td>
//                                         <td className="py-4 px-2 text-center">
//                                             <p className="truncate w-32 sm:w-full">{user.email}</p>
//                                         </td>
//                                         <td className="py-4 px-2 text-center">{user.role}</td>
//                                         <td className="py-4 px-2 text-center">
//                                             <button
//                                                 onClick={() => {
//                                                     setUserData(user);
//                                                     setIsOpen(true);
//                                                     document.getElementById('user_detail_modal').showModal();
//                                                 }}
//                                                 className="bg-yellow-200 text-yellow-800 px-4 py-1 rounded-full hover:bg-yellow-300"
//                                             >
//                                                 View
//                                             </button>
//                                         </td>
//                                         <td className="py-4 px-2 text-center">
//                                             {user.role !== 'ADMIN' && (
//                                                 <label className="flex items-center justify-center">
//                                                     <input
//                                                         type="checkbox"
//                                                         checked={user.isActive}
//                                                         onChange={() => toggleStatus(user.id)}
//                                                         className="toggle toggle-success"
//                                                     />
//                                                     <span className={`ml-2 text-sm font-medium ${user.isActive ? 'text-green-600' : 'text-red-500'}`}>
//                                                         {user.isActive ? 'Active' : 'Deactivate'}
//                                                     </span>
//                                                 </label>
//                                             )}
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>

//                     {/* Pagination */}
//                     <div className="flex justify-center mt-6 px-4 sm:px-0 overflow-x-auto">
//                         <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
//                     </div>
//                 </div>
//             </div>

//             {/* User Detail Modal */}
//             <dialog id="user_detail_modal" className="modal" onClose={() => setIsOpen(false)}>
//                 <div className="modal-box max-w-lg p-6 bg-white rounded-lg shadow-lg">
//                     <button
//                         type="button"
//                         className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
//                         onClick={(e) => e.target.closest('dialog').close()}
//                     >
//                         ✕
//                     </button>
//                     <h2 className="text-2xl font-semibold mb-6 text-center">User Details</h2>

//                     <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
//                         {/* Profile Picture */}
//                         <img
//                             src={userData.profilePicture}
//                             alt="User Profile"
//                             className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-lg"
//                         />

//                         {/* User Details */}
//                         <div className="text-left space-y-2 w-full">
//                             <p className="text-gray-700">
//                                 <strong className="text-gray-900">Name:</strong> {userData.firstName} {userData.lastName}
//                             </p>
//                             <p className="text-gray-700">
//                                 <strong className="text-gray-900">Email:</strong> {userData.email}
//                             </p>
//                             <p className="text-gray-700">
//                                 <strong className="text-gray-900">Phone:</strong> {userData.phoneNumber}
//                             </p>
//                             <p className="text-gray-700">
//                                 <strong className="text-gray-900">Role:</strong> {userData.role}
//                             </p>
//                             <p className="text-gray-700">
//                                 <strong className="text-gray-900">Address:</strong> {userData.address}
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </dialog>
//         </>
//     );
// };

// export default ManageUser;
// ==========================================================================================================================



import React, { useEffect, useState } from 'react';
import useUserStore from '../../stores/userStore';
import Swal from 'sweetalert2';
import useSearchStore from '../../stores/SearchStore';
import Pagination from '../../components/Pagination';
import { getUserByQueryAPI } from '../../API/UserApi';

// InfoRow Component for Modal
const InfoRow = ({ label, value }) => (
    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
        <span className="text-gray-900 font-medium min-w-[80px]">{label}:</span>
        <span className="text-gray-700">{value}</span>
    </div>
);

// UserCard Component for Mobile View
const UserCard = ({ user, onToggleStatus, onViewDetails }) => (
    <div className="bg-white rounded-lg shadow-md p-4">
        {/* User Header with Image and Basic Info */}
        <div className="flex items-center gap-4 mb-4 border-b pb-4">
            <img 
                src={user.profilePicture} 
                alt="User Avatar" 
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
            />
            <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base">
                    {user.firstName} {user.lastName}
                </h3>
                <p className="text-sm text-gray-500 truncate">{user.email}</p>
                <p className="text-sm text-gray-600 mt-1">
                    <span className="inline-block bg-gray-100 px-2 py-0.5 rounded-full">
                        {user.role}
                    </span>
                </p>
            </div>
        </div>

        {/* Status and Actions Section */}
        <div className="flex flex-col gap-3">
            {/* Status Toggle */}
            {user.role !== 'ADMIN' && (
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <span className="text-sm font-medium text-gray-600">Status</span>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={user.isActive}
                            onChange={() => onToggleStatus(user.id)}
                            className="toggle toggle-success"
                        />
                        <span className={`text-sm font-medium ${
                            user.isActive ? 'text-green-600' : 'text-red-500'
                        }`}>
                            {user.isActive ? 'Active' : 'Deactivate'}
                        </span>
                    </div>
                </div>
            )}

            {/* View Details Button */}
            <button
                onClick={() => onViewDetails(user)}
                className="w-full bg-yellow-200 text-yellow-800 py-2.5 px-4 rounded-lg hover:bg-yellow-300 transition-colors text-sm font-medium"
            >
                View Details
            </button>
        </div>
    </div>
);

const ManageUser = () => {
    const activateUser = useUserStore(state => state.activateUser);
    const searchText = useSearchStore(state => state.searchText);
    const [user, setUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [userData, setUserData] = useState({});
    const [roleFilter, setRoleFilter] = useState('');

    const fetchUser = async (page) => {
        try {
            const result = await getUserByQueryAPI(page, searchText, roleFilter);
            setTotalPages(result?.data.totalPages);
            setUser(result?.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUser(currentPage);
    }, [currentPage, searchText, roleFilter]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchText, roleFilter]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const toggleStatus = async (id) => {
        const userIndex = user.findIndex((user) => user.id === id);
        const currentUserStatus = user[userIndex].isActive;

        const confirmationText = currentUserStatus ?
            "Do you want to deactivate this user?" :
            "Do you want to activate this user?";

        const successText = currentUserStatus ?
            "User has been deactivated." :
            "User has been activated.";

        const result = await Swal.fire({
            title: "Are you sure?",
            text: confirmationText,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: currentUserStatus ? "Yes, deactivate it!" : "Yes, activate it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true,
            customClass: {
                confirmButton: "btn btn-success ml-2",
                cancelButton: "btn btn-error mr-2"
            },
            buttonsStyling: false,
        });

        if (result.isConfirmed) {
            try {
                await activateUser(id);
                setUser(
                    user.map(user =>
                        user.id === id ? { ...user, isActive: !user.isActive } : user
                    )
                );
                Swal.fire("Success!", successText, "success");
            } catch (error) {
                console.log(error);
            }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire("Cancelled", "User status remains unchanged", "error");
        }
    };

    const handleViewDetails = (user) => {
        setUserData(user);
        setIsOpen(true);
        document.getElementById('user_detail_modal').showModal();
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md">
                {/* Header Section */}
                <div className="p-4 md:p-6 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h2 className="text-2xl font-bold text-gray-800">Manage Users</h2>
                        <div className="flex items-center gap-4">
                            <select
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                                className="px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm md:text-base"
                            >
                                <option value="">All Roles</option>
                                <option value="ADMIN">Admin</option>
                                <option value="BUYER">Buyer</option>
                                <option value="SELLER">Seller</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Desktop View - Table */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Profile</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Name</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Email</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Role</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {user?.map(user => (
                                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <img 
                                            src={user.profilePicture} 
                                            alt={`${user.firstName}'s avatar`}
                                            className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="font-medium text-gray-900">
                                            {user.firstName} {user.lastName}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-gray-600 truncate max-w-[200px]">
                                            {user.email}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.role !== 'ADMIN' && (
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={user.isActive}
                                                    onChange={() => toggleStatus(user.id)}
                                                    className="toggle toggle-success"
                                                />
                                                <span className={user.isActive ? 'text-green-600' : 'text-red-500'}>
                                                    {user.isActive ? 'Active' : 'Deactivate'}
                                                </span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleViewDetails(user)}
                                            className="bg-yellow-200 text-yellow-800 px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors text-sm"
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile View - Cards */}
                <div className="md:hidden">
                    <div className="grid gap-4 p-4">
                        {user?.map(user => (
                            <UserCard
                                key={user.id}
                                user={user}
                                onToggleStatus={toggleStatus}
                                onViewDetails={handleViewDetails}
                            />
                        ))}
                    </div>
                </div>

                {/* Pagination */}
                <div className="border-t border-gray-200 px-4 py-5">
                    <div className="flex justify-center">
                        <Pagination 
                            currentPage={currentPage} 
                            totalPages={totalPages} 
                            onPageChange={handlePageChange} 
                        />
                    </div>
                </div>
            </div>

            {/* User Detail Modal */}
            <dialog id="user_detail_modal" className="modal" onClose={() => setIsOpen(false)}>
                <div className="modal-box max-w-lg p-4 md:p-6 bg-white rounded-lg shadow-lg">
                    <button
                        type="button"
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={(e) => e.target.closest('dialog').close()}
                    >
                        ✕
                    </button>
                    <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center">User Details</h2>

                    <div className="flex flex-col items-center gap-6">
                        {/* Profile Picture */}
                        <div className="relative">
                            <img
                                src={userData.profilePicture}
                                alt="User Profile"
                                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-gray-200 shadow-lg"
                            />
                            <span className={`absolute bottom-0 right-0 px-2 py-1 rounded-full text-xs font-medium ${
                                userData.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                                {userData.isActive ? 'Active' : 'Deactivate'}
                            </span>
                        </div>

                        {/* User Details */}
                        <div className="w-full space-y-4 bg-gray-50 p-4 rounded-lg">
                            <InfoRow label="Name" value={`${userData.firstName} ${userData.lastName}`} />
                            <InfoRow label="Email" value={userData.email} />
                            <InfoRow label="Phone" value={userData.phoneNumber || 'Not provided'} />
                            <InfoRow label="Role" value={userData.role} />
                            <InfoRow label="Address" value={userData.address || 'Not provided'} />
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default ManageUser;