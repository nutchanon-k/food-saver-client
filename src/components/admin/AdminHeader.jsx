<<<<<<< HEAD
import React from 'react'
import { Search, Bell } from 'lucide-react';
import Avatar from './Avatar';

const handleLogout = () => {

    console.log("User logged out");

};


const AdminHeader = () => {
=======
import React, { useEffect, useState } from 'react'
import { Search, Bell } from 'lucide-react';
import Avatar from './Avatar';
import useUserStore from '../../stores/userStore';
import useSearchStore from '../../stores/SearchStore';



const AdminHeader = () => {
    const user = useUserStore(state => state.user);
    const searchText = useSearchStore(state => state.searchText)
    const setSearchText = useSearchStore(state => state.setSearchText)

    const [text, setText] = useState(searchText)


    useEffect(() => {
        const delay = setTimeout(() => {
          setSearchText(text)
        }, 500)
        return () => clearTimeout(delay)
      }, [text])

    const handleLogout = () => {

        console.log("User logged out");
    
    };



    // console.log(searchText)

    // console.log(user)
>>>>>>> dev
    return (
        <header className="flex items-center justify-between bg-white px-4 py-4 border-b shadow-sm">
            {/* Logo */}
            <div className="flex items-center">
                <h1 className="text-2xl font-bold text-green-600">Logo</h1>
            </div>

            {/* Search Bar */}
            <div className="flex items-center w-1/2 bg-gray-100 rounded-full px-4 py-2 mx-4">
                <Search className="text-gray-500 mr-2" />
                <input
                    type="text"
<<<<<<< HEAD
                    placeholder="Search..."
                    className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-500"
=======
                    value={text}
                    placeholder="Search..."
                    className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-500"
                    onChange={(e) => setText(e.target.value)}
>>>>>>> dev
                />
            </div>

            {/* Notifications and User Info */}
            <div className="flex items-center space-x-4 ">
                {/* Notification Icon */}
                <button className="relative rounded-full hover:bg-gray-100">
                    <Bell className="text-gray-500" />
                    {/* Notification Badge */}
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 py-0.5 bg-red-500 text-white text-xs rounded-full">3</span>
                </button>

                {/* User Info */}
                <div className="flex items-center space-x-2">
                    <div className="text-right">
<<<<<<< HEAD
                        <p className="text-sm font-semibold">John Doe</p>
                        <p className="text-xs text-gray-500">Admin</p>
                    </div>
                    {/* <div className="w-10 h-10 rounded-full overflow-hidden">
                        <Avatar
                            className="w-11 h-11 rounded-full !flex justify-center items-center"
                            // imgSrc={user?.picture}
                            menu={true}
                        />
                    </div> */}
=======
                        <p className="text-sm font-semibold">{user?.firstName + " " + user?.lastName}</p>
                        <p className="text-xs font-medium text-gray-500">{user?.role}</p>
                    </div>
>>>>>>> dev
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <Avatar
                                    className="w-11 h-11 rounded-full !flex justify-center items-center"
<<<<<<< HEAD
                                    // imgSrc={user?.picture}
=======
                                    imgSrc={user?.profilePicture}
>>>>>>> dev
                                    menu={true}
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {/* <li onClick={() => {
                                setShowChangePassword(true)
                                document.getElementById('change_password_modal').showModal()
                            }}
                            >
                                <a>Change Password</a>
                            </li> */}
                            <li onClick={handleLogout}><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
};


export default AdminHeader