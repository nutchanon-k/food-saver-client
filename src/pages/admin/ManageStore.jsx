import React, { useEffect, useState } from 'react';
import useUserStore from '../../stores/userStore';
import Swal from 'sweetalert2';
import useSearchStore from '../../stores/SearchStore';
import Pagination from '../../components/Pagination';
import { getUserByQueryAPI } from '../../API/UserApi';
import useStore from '../../stores/Store';

const ManageStore = () => {
    const activateUser = useUserStore(state => state.activateUser);
    const searchText = useSearchStore(state => state.searchText);
    const getStoreQuery = useStore(state => state.getStoreQuery);
    const verifyStore = useStore(state => state.verifyStore);

    const [user, setUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [userData, setUserData] = useState({});
    const [roleFilter, setRoleFilter] = useState('')


    const [store, setStore] = useState(null);
    const [storeData, setStoreData] = useState({});
    const [verifyFilter, setVerifyFilter] = useState('')


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
        setCurrentPage(1)
    }, [searchText, roleFilter]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const toggleStatus = async (id) => {
        let index = store.findIndex((store) => store.id === id);
        if (store[index].isVerify === true) {

            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: "btn btn-success ml-2",
                    cancelButton: "btn btn-error mr-2"
                },
                buttonsStyling: false
            });
            swalWithBootstrapButtons.fire({
                title: "Are you sure?",
                text: "Do you want to deactivate this store!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, deactivate it!",
                cancelButtonText: "No, cancel!",
                reverseButtons: true
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const result = await verifyStore(id);
                        console.log(result)
                        if (result) {
                            console.log("success")
                        }
                        setStore(
                            store.map(store =>
                                store.id === id ? { ...store, isVerify: !store.isVerify } : store
                            )
                        );
                    } catch (error) {
                        console.log(error)
                    }
                    swalWithBootstrapButtons.fire({
                        title: "Deactivated!",
                        text: "Store has been deactivated.",
                        icon: "success"
                    });
                } else if (

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
                text: "Do you want to verify this store!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, verify it!",
                cancelButtonText: "No, cancel!",
                reverseButtons: true
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {

                        const result = await verifyStore(id);
                        if (result) {
                            console.log("success")
                        }
                        setStore(
                            store.map(store =>
                                store.id === id ? { ...store, isVerify: !store.isVerify } : store
                            )
                        );
                    } catch (error) {
                        console.log(error)
                    }
                    swalWithBootstrapButtons.fire({
                        title: "Verified!",
                        text: "Store has been Verified.",
                        icon: "success"
                    });
                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire({
                        title: "Cancelled",
                        text: "Store is still unverified :)",
                        icon: "error"
                    });
                }
            });
        }
    };

    console.log(store)
    console.log(currentPage, totalPages)

    return (
        <>
            <div className="p-6 min-h-screen flex justify-center items-center">
                <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-6xl min-h-[500px]">
                    <div className='flex justify-between'>
                        <h2 className="text-3xl font-semibold">Manage Store</h2>
                        <div className="mb-4">
                            <label htmlFor="roleFilter" className="mr-2">Filter verified:</label>
                            <select
                                id="verifyFilter"
                                value={verifyFilter}
                                onChange={(e) => setVerifyFilter
                                    (e.target.value)}
                                className="py-2 px-4 border rounded"
                            >
                                <option value="">All</option>
                                <option value={true}>verified</option>
                                <option value={false}>unverified</option>

                            </select>
                        </div>
                    </div>
                    <hr className='my-4' />
                    <div className='min-h-[880px]'>

                        <table className="w-full  text-left">
                            <thead>
                                <tr>
                                    <th className="pb-2 border-b text-center">รูปภาพ</th>
                                    <th className="pb-2 border-b text-center">ชื่อร้าน</th>
                                    <th className="pb-2 border-b text-center">ที่อยู่</th>
                                    <th className="pb-2 border-b text-center">รายละเอียด</th>
                                    <th className="pb-2 border-b text-center">สถานะ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {store?.map(store => (
                                    <tr key={store.id} className="hover:bg-gray-50">
                                        <td className="py-4 flex items-center justify-center space-x-4">
                                            <div className="w-24 h-24  flex items-center justify-center overflow-hidden">
                                                <img src={store.profilePicture} alt="User Avatar" className="" />
                                            </div>
                                            {/* <span>{user.name}</span> */}
                                        </td>
                                        <td className="py-4 text-center w-56">
                                            <p className="py-1">
                                                {store.storeName}
                                            </p>
                                        </td>
                                        <td className="py-4 text-center w-80">
                                            <p className="py-1">
                                                {store.storeAddress}
                                            </p>
                                        </td>
                                        <td className="py-4 text-center">
                                            <button
                                                onClick={() => {
                                                    setStoreData(store)
                                                    setIsOpen(true)
                                                    document.getElementById('store_detail_modal').showModal()
                                                }}
                                                className="bg-yellow-200 text-yellow-800 px-4 py-1 rounded-full">
                                                View
                                            </button>
                                        </td>
                                        <td className="py-4 space-x-4 w-36 ">
                                            <div className="flex items-center justify-center space-x-2 gap-2">
                                                {/* Toggle Switch */}

                                                <>
                                                    <label className="flex cursor-pointer gap-2">
                                                        <input
                                                            type="checkbox"
                                                            checked={store.isVerify}
                                                            onChange={() => toggleStatus(store.id)}
                                                            className="toggle theme-controller"
                                                        />
                                                    </label>
                                                    <span className={`text-sm font-medium ${store.isVerify ? 'text-green-600' : 'text-red-500'}`}>
                                                        {store.isVerify ? 'verified' : 'unverified'}
                                                    </span>
                                                </>

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

            {/* User Detail Modal */}
            <dialog id="store_detail_modal" className="modal" onClose={() => setIsOpen(false)}>
                <div className="modal-box w-full max-w-3xl p-6">
                    <button
                        type="button"
                        className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
                        onClick={(e) => e.target.closest('dialog').close()}
                    >
                        ✕
                    </button>
                    <h2 className="text-3xl font-bold mb-4 text-gray-800">ข้อมูลร้านค้า</h2>

                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* รูปภาพ */}
                        <figure className="lg:w-1/2">
                            <img
                                src={storeData.profilePicture}
                                alt="Album"
                                className="w-72 h-72 object-cover rounded-lg shadow-md" // กำหนดขนาดรูปภาพให้คงที่
                            />
                        </figure>

                        {/* ข้อมูลร้านค้า */}
                        <div className="lg:w-1/2 flex flex-col space-y-4">
                            <p className="text-gray-700">
                                <span className="font-semibold">ID:</span> {storeData.id}
                            </p>
                            <p className="text-gray-700">
                                <span className="font-semibold">ชื่อร้านค้า:</span> {storeData.storeName}
                            </p>
                            <p className="text-gray-700">
                                <span className="font-semibold">ที่อยู่:</span> {storeData.storeAddress}
                            </p>
                            <p className="text-gray-700">
                                <span className="font-semibold">เบอร์โทรศัพท์:</span> {storeData.phoneNumber}
                            </p>
                            <p className="text-gray-700">
                                <span className="font-semibold">รายละเอียดอื่นๆ:</span> {storeData.storeDetails}
                            </p>

                        </div>
                    </div>
                </div>
            </dialog>

        </>
    );
};

export default ManageStore