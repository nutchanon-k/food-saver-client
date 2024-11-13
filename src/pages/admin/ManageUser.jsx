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


import React, { useEffect, useState } from 'react';
import useUserStore from '../../stores/userStore';
import Swal from 'sweetalert2';
import useSearchStore from '../../stores/SearchStore';
import Pagination from '../../components/Pagination';
import { getUserByQueryAPI } from '../../API/UserApi';

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

    return (
        <>
            <div className="p-0 sm:p-6 min-h-screen flex justify-center items-center w-full">
                <div className="bg-white rounded-lg shadow-md w-full sm:max-w-6xl sm:min-h-[500px]">
                    <div className="flex flex-col md:flex-row md:justify-between mb-4 px-4 py-6 sm:px-6">
                        <h2 className="text-3xl font-semibold">Manage User</h2>
                        <div className="flex items-center mt-4 md:mt-0">
                            <label htmlFor="roleFilter" className="mr-2">Filter by Role:</label>
                            <select
                                id="roleFilter"
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                                className="p-2 border rounded"
                            >
                                <option value="">All</option>
                                <option value="ADMIN">Admin</option>
                                <option value="BUYER">Buyer</option>
                                <option value="SELLER">Seller</option>
                            </select>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr>
                                    <th className="pb-4 pt-2 pl-4  border-b text-center">รูปภาพ</th>
                                    <th className="pb-4 pt-2 border-b text-center">ชื่อ</th>
                                    <th className="pb-4 pt-2 border-b text-center">Email</th>
                                    <th className="pb-4 pt-2 border-b text-center">Role</th>
                                    <th className="pb-4 pt-2 border-b text-center">รายละเอียด</th>
                                    <th className="pb-4 pt-2 border-b text-center">สถานะ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {user?.map(user => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="py-4 pl-4  px-2 text-center">
                                            <img src={user.profilePicture} alt="User Avatar" className="lg:w-24 lg:h-24 sm:w-12 sm:h-12 rounded-full mx-auto" />
                                        </td>
                                        <td className="py-4 px-2 text-center whitespace-nowrap">
                                            {user.firstName} {user.lastName}
                                        </td>
                                        <td className="py-4 px-2 text-center">
                                            <p className="truncate w-32 sm:w-full">{user.email}</p>
                                        </td>
                                        <td className="py-4 px-2 text-center">{user.role}</td>
                                        <td className="py-4 px-2 text-center">
                                            <button
                                                onClick={() => {
                                                    setUserData(user);
                                                    setIsOpen(true);
                                                    document.getElementById('user_detail_modal').showModal();
                                                }}
                                                className="bg-yellow-200 text-yellow-800 px-4 py-1 rounded-full hover:bg-yellow-300"
                                            >
                                                View
                                            </button>
                                        </td>
                                        <td className="py-4 px-2 text-center">
                                            {user.role !== 'ADMIN' && (
                                                <label className="flex items-center justify-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={user.isActive}
                                                        onChange={() => toggleStatus(user.id)}
                                                        className="toggle toggle-success"
                                                    />
                                                    <span className={`ml-2 text-sm font-medium ${user.isActive ? 'text-green-600' : 'text-red-500'}`}>
                                                        {user.isActive ? 'Active' : 'Deactivate'}
                                                    </span>
                                                </label>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-6 px-4 sm:px-0 overflow-x-auto">
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                    </div>
                </div>
            </div>

            {/* User Detail Modal */}
            <dialog id="user_detail_modal" className="modal" onClose={() => setIsOpen(false)}>
                <div className="modal-box max-w-lg p-6 bg-white rounded-lg shadow-lg">
                    <button
                        type="button"
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={(e) => e.target.closest('dialog').close()}
                    >
                        ✕
                    </button>
                    <h2 className="text-2xl font-semibold mb-6 text-center">User Details</h2>

                    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                        {/* Profile Picture */}
                        <img
                            src={userData.profilePicture}
                            alt="User Profile"
                            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 shadow-lg"
                        />

                        {/* User Details */}
                        <div className="text-left space-y-2 w-full">
                            <p className="text-gray-700">
                                <strong className="text-gray-900">Name:</strong> {userData.firstName} {userData.lastName}
                            </p>
                            <p className="text-gray-700">
                                <strong className="text-gray-900">Email:</strong> {userData.email}
                            </p>
                            <p className="text-gray-700">
                                <strong className="text-gray-900">Phone:</strong> {userData.phoneNumber}
                            </p>
                            <p className="text-gray-700">
                                <strong className="text-gray-900">Role:</strong> {userData.role}
                            </p>
                            <p className="text-gray-700">
                                <strong className="text-gray-900">Address:</strong> {userData.address}
                            </p>
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default ManageUser;
