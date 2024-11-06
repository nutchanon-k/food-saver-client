<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import useUserStore from '../../stores/userStore';

const ManageUser = () => {
    const getAllUser = useUserStore(state => state.getAllUser);
    const [user, setUser] = useState([
        { id: 1, name: 'User 01', status: true },
        { id: 2, name: 'User 02', status: false },
        { id: 3, name: 'User 03', status: true },
        { id: 4, name: 'User 04', status: true },
        { id: 5, name: 'User 05', status: false },
        { id: 6, name: 'User 06', status: true },
        { id: 7, name: 'User 07', status: true },
        { id: 8, name: 'User 08', status: false },
        { id: 9, name: 'User 09', status: true },
        { id: 10, name: 'User 10', status: true },
    ]);
    const [users, setUsers] = useState('');
    
    
    useEffect(() => {
        const users = async () => {
            try {
                const result = await getAllUser();
                setUsers(result.data);
            } catch (error) {
                console.log(error);
            }
        }
        users();
    }, []);
    
    console.log(users)
    const toggleStatus = (id) => {
        setUser(
            user.map(user =>
                user.id === id ? { ...user, status: !user.status } : user
            )
        );
    };


    return (
        <div className="p-6 min-h-screen flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-4xl">
                <h2 className="text-2xl font-semibold mb-4">Manage User</h2>
                <table className="w-full text-left">
                    <thead>
                        <tr>
                            <th className="pb-2 border-b">User</th>
                            <th className="pb-2 border-b">View Profile</th>
                            <th className="pb-2 border-b">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user.map(user => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="py-4 flex items-center space-x-4">
                                    <div className="w-12 h-12 rounded-full bg-orange-300 flex items-center justify-center">
                                        <img src="https://via.placeholder.com/40" alt="User Avatar" className="rounded-full" />
                                    </div>
                                    <span>{user.name}</span>
                                </td>
                                <td className="py-4">
                                    <button className="bg-yellow-200 text-yellow-800 px-4 py-1 rounded-full">
                                        View
                                    </button>
                                </td>
                                <td className="py-4 flex items-center space-x-4">
                                    {/* Toggle Switch */}
                                    <label className="flex cursor-pointer gap-2">
                                        <input
                                            type="checkbox"
                                            checked={user.status}
                                            onChange={() => toggleStatus(user.id)}
                                            className="toggle theme-controller"
                                        />
                                    </label>
                                    <span className={`text-sm font-medium ${user.status ? 'text-green-600' : 'text-red-500'}`}>
                                        {user.status ? 'Active' : 'Deactivate'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUser;
=======
// import React, { useEffect, useState } from 'react';
// import useUserStore from '../../stores/userStore';
// import Swal from 'sweetalert2'
// import axiosInstance from '../../API/Interceptor';
// import { NoPhotoIcon } from '../../assets/icons/Icons';
// import useSearchStore from '../../stores/SearchStore';

// const ManageUser = () => {
//     const getAllUser = useUserStore(state => state.getAllUser);
//     const allUser = useUserStore(state => state.allUser);
//     const activateUser = useUserStore(state => state.activateUser);
//     const searchText = useSearchStore(state => state.searchText)


//     console.log(searchText)

//     const [user, setUser] = useState(null);
//     const [countUser, setCountUser] = useState('');
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [isOpen, setIsOpen] = useState(false);
//     const [userData, setUserData] = useState({});
//     const [roleFilter, setRoleFilter] = useState('')

//     // const [users, setUsers] = useState('');

//     const fetchUser = async (page) => {
//         try {
//             console.log("pageeeeeeee", page)

//             const result = await axiosInstance.get(`/users?page=${page}&limit=10&search=${searchText}&role=${roleFilter}`);
//             console.log(result)
//             setCountUser(result?.data.countUser);
//             setTotalPages(result?.data.totalPages);
//             setUser(result?.data.data);

//             // console.log(result);
//             // setUsers(result?.data);
//         } catch (error) {
//             console.log(error);
//         }
//     }
//     useEffect(() => {
//         fetchUser(currentPage);
//     }, [currentPage, searchText, roleFilter]);




//     // useEffect(() => {
//     //     getAllUser();
//     //     const getUsers = async () => {
//     //         try {
//     //             const result = await getAllUser();
//     //             setCountUser(result?.countUser);
//     //             setTotalPages( Math.ceil(result?.countUser/10));
//     //             // console.log(result);
//     //             // setUsers(result?.data);
//     //         } catch (error) {
//     //             console.log(error);
//     //         }
//     //     }
//     //     getUsers();
//     // }, [activateUser]);

//     useEffect(() => {
//         setUser(allUser);
//     }, [allUser]);


//     // console.log(countUser)
//     // console.log(allUser)
//     // console.log("total page", totalPages)

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
//                         console.log("ssssssssssssssssssssssssssssssssssssssss")
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
//                     /* Read more about handling dismissals below */
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
//                         console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
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
//                         <h2 className="text-2xl font-semibold mb-6 ">Manage User</h2>
//                         {/* Dropdown สำหรับเลือก Role */}
//                         <div className="mb-4">
//                             <label htmlFor="roleFilter" className="mr-2">Filter by Role:</label>
//                             <select
//                                 id="roleFilter"
//                                 value={roleFilter}
//                                 onChange={(e) => {
//                                     setRoleFilter(e.target.value);

//                                 }}
//                                 className="p-2 border rounded"
//                             >
//                                 <option value="">All</option>
//                                 <option value="ADMIN">Admin</option>
//                                 <option value="BUYER">Buyer</option>
//                                 <option value="SELLER">Seller</option>
//                             </select>
//                         </div>
//                     </div>

//                     <table className="w-full text-left">
//                         <thead>
//                             <tr>
//                                 <th className="pb-2 border-b">Profile</th>
//                                 <th className="pb-2 border-b">Name</th>
//                                 <th className="pb-2 border-b">Email</th>
//                                 <th className="pb-2 border-b">Role</th>
//                                 <th className="pb-2 border-b">View Profile</th>
//                                 <th className="pb-2 border-b">Status</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {user?.map(user => (
//                                 <tr key={user.id} className="hover:bg-gray-50" >
//                                     <td className="py-4 flex items-center space-x-4">
//                                         <div className="w-12 h-12 rounded-full bg-orange-300 flex items-center justify-center">
//                                             <img src={user.profilePicture} alt="User Avatar" className="rounded-full" />
//                                         </div>
//                                         <span>{user.name}</span>
//                                     </td>
//                                     <td className="py-4">
//                                         <p className="py-1">
//                                             {user.firstName + ' ' + user.lastName}
//                                         </p>
//                                     </td>
//                                     <td className="py-4 w-24">
//                                         <p className="py-1">
//                                             {user.email}
//                                         </p>
//                                     </td>
//                                     <td className="py-4">
//                                         <p className="py-1">
//                                             {user.role}
//                                         </p>
//                                     </td>
//                                     <td className="py-4 ">
//                                         <button
//                                             onClick={() => {
//                                                 setUserData(user)
//                                                 setIsOpen(true)
//                                                 document.getElementById('user_detail_modal').showModal()
//                                             }}
//                                             className="bg-yellow-200 text-yellow-800 px-4 py-1 rounded-full">
//                                             View
//                                         </button>
//                                     </td>
//                                     <td className="py-4 flex items-center space-x-4 w-24 ">
//                                         {/* Toggle Switch */}
//                                         <label className="flex cursor-pointer gap-2">
//                                             <input
//                                                 type="checkbox"
//                                                 checked={user.isActive}
//                                                 onChange={() => toggleStatus(user.id)}
//                                                 className="toggle theme-controller"
//                                             />
//                                         </label>
//                                         <span className={`text-sm font-medium ${user.isActive ? 'text-green-600' : 'text-red-500'}`}>
//                                             {user.isActive ? 'Active' : 'Deactivate'}
//                                         </span>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>


//                     {/* Pagination */}
//                     <section className="mt-12 mb-12 flex justify-center items-center space-x-2">
//                         <div className="flex space-x-2">
//                             {[...Array(totalPages)].map((_, page) => (
//                                 <button
//                                     key={page + 1}
//                                     onClick={() => setCurrentPage(page + 1)}
//                                     className={`w-10 h-10 flex items-center justify-center rounded-full 
//                           ${currentPage === page + 1 ? 'bg-primary text-white' : 'bg-gray-300 text-gray-600'}`}
//                                 >
//                                     {page + 1}
//                                 </button>
//                             ))}
//                         </div>
//                     </section>
//                 </div>
//             </div>

//             <dialog id="user_detail_modal" className="modal" onClose={() => { setIsOpen(false) }}>
//                 <div className="modal-box">

//                     <button
//                         type='button'
//                         className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
//                         onClick={e => e.target.closest('dialog').close()}
//                     >
//                         ✕
//                     </button>
//                     <div className="card xl:card-side ">
//                         <figure>
//                             <img
//                                 src={userData.profilePicture}
//                                 alt="Album" />
//                         </figure>
//                         <div className="card-body">
//                             <h2 className="card-title">User Detail</h2>
//                             <p>Name : {userData.firstName + ' ' + userData.lastName}</p>
//                             <p>Email : {userData.email}</p>
//                             <p>Phone : {userData.phoneNumber}</p>
//                             <p>Role : {userData.role}</p>
//                             <p>Address : {userData.address}</p>
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
import axiosInstance from '../../API/Interceptor';
import useSearchStore from '../../stores/SearchStore';
import Pagination from '../../components/Pagination';
import { getUserByQueryAPI } from '../../API/UserApi';

const ManageUser = () => {
    const getAllUser = useUserStore(state => state.getAllUser);
    const allUser = useUserStore(state => state.allUser);
    const activateUser = useUserStore(state => state.activateUser);
    const searchText = useSearchStore(state => state.searchText);

    const [user, setUser] = useState(null);
    // const [countUser, setCountUser] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [userData, setUserData] = useState({});
    const [roleFilter, setRoleFilter] = useState('')

    const fetchUser = async (page) => {
        try {
            const result = await getUserByQueryAPI(page, searchText, roleFilter);
            // setCountUser(result?.data.countUser);
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
        setCurrentPage(1)
    }, [searchText, roleFilter]);

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
                    <div className='flex justify-between'>
                        <h2 className="text-3xl font-semibold">Manage User</h2>
                        <div className="mb-4">
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
                    <hr className='my-4' />
                    <div className='min-h-[880px]'>

                        <table className="w-full  text-left">
                            <thead>
                                <tr>
                                    <th className="pb-2 border-b text-center">Profile</th>
                                    <th className="pb-2 border-b text-center">Name</th>
                                    <th className="pb-2 border-b text-center">Email</th>
                                    <th className="pb-2 border-b text-center">Role</th>
                                    <th className="pb-2 border-b text-center">View Profile</th>
                                    <th className="pb-2 border-b text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {user?.map(user => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="py-4 flex items-center justify-center space-x-4">
                                            <div className="w-24 h-24 rounded-full flex items-center justify-center">
                                                <img src={user.profilePicture} alt="User Avatar" className="rounded-full" />
                                            </div>
                                            {/* <span>{user.name}</span> */}
                                        </td>
                                        <td className="py-4 text-center">
                                            <p className="py-1">
                                                {user.firstName + ' ' + user.lastName}
                                            </p>
                                        </td>
                                        <td className="py-4 text-center w-24">
                                            <p className="py-1">
                                                {user.email}
                                            </p>
                                        </td>
                                        <td className="py-4 text-center">
                                            <p className="py-1">
                                                {user.role}
                                            </p>
                                        </td>
                                        <td className="py-4 text-center">
                                            <button
                                                onClick={() => {
                                                    setUserData(user)
                                                    setIsOpen(true)
                                                    document.getElementById('user_detail_modal').showModal()
                                                }}
                                                className="bg-yellow-200 text-yellow-800 px-4 py-1 rounded-full">
                                                View
                                            </button>
                                        </td>
                                        <td className="py-4 space-x-4 w-36 ">
                                            <div className="flex items-center justify-center space-x-2 gap-2">
                                                {/* Toggle Switch */}
                                                {user.role === 'ADMIN' ? null : (
                                                    <>
                                                        <label className="flex cursor-pointer gap-2">
                                                            <input
                                                                type="checkbox"
                                                                checked={user.isActive}
                                                                onChange={() => toggleStatus(user.id)}
                                                                className="toggle theme-controller"
                                                            />
                                                        </label>
                                                        <span className={`text-sm font-medium ${user.isActive ? 'text-green-600' : 'text-red-500'}`}>
                                                            {user.isActive ? 'Active' : 'Deactivate'}
                                                        </span>
                                                    </>
                                                )}
                                            </div>
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
            <dialog id="user_detail_modal" className="modal" onClose={() => { setIsOpen(false) }}>
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
                            <img
                                src={userData.profilePicture}
                                alt="Album" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">User Detail</h2>
                            <p>Name : {userData.firstName + ' ' + userData.lastName}</p>
                            <p>Email : {userData.email}</p>
                            <p>Phone : {userData.phoneNumber}</p>
                            <p>Role : {userData.role}</p>
                            <p>Address : {userData.address}</p>
                        </div>
                    </div>


                </div>
            </dialog>
        </>
    );
};

export default ManageUser;
>>>>>>> dev
