import React, { useState } from 'react';
import {
    Search,
    Grid,
    User,
    Users,
    Store,
    Gift,
    MessageCircle,
    Bell,
    Settings,
    HelpCircle,
    LogOut,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import Avatar from './Avatar';
<<<<<<< HEAD
=======
import useUserStore from '../../stores/userStore';
>>>>>>> dev


const AdminSidebar = () => {
    const [isExpanded, setIsExpanded] = useState(true);

<<<<<<< HEAD
=======

    const user = useUserStore(state => state.user);

>>>>>>> dev
    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    const handleLogout = () => {

        console.log("User logged out");

    };
    return (
        <div className={`h-full bg-white border-r shadow-lg flex flex-col ${isExpanded ? 'w-64' : 'w-24'} px-2 py-4 transition-all duration-300`}>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <div className="avatar flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
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
                    {isExpanded && (
                        <div className="ml-3">
<<<<<<< HEAD
                            <p className="font-semibold">John Doe</p>
                            <p className="text-xs text-gray-500">ADMIN</p>
=======
                            <p className="font-semibold">{user?.firstName + " " + user?.lastName}</p>
                            <p className="text-xs font-medium text-gray-500">{user?.role}</p>
>>>>>>> dev
                        </div>
                    )}
                </div>
                <button onClick={toggleSidebar} className="text-gray-500">
                    {isExpanded ? <ChevronLeft /> : <ChevronRight />}
                </button>
            </div>

            <div className="form-control mb-4">
                <div className={`flex items-center ${isExpanded ? 'border rounded-lg p-2' : 'px-5 py-2'}`}>
                    <Search className="text-gray-400" />
                    {isExpanded && (
                        <input
                            type="text"
                            placeholder="Search"
                            className="outline-none w-full ml-2 text-sm text-gray-600"
                        />
                    )}
                </div>
            </div>

            <ul className="menu flex-grow space-y-2">
                <li>
<<<<<<< HEAD
                    <NavLink to="/" end className={({ isActive })  => `flex items-center w-full ${isExpanded ? 'justify-start' : 'justify-center'} ${isActive ? 'text-green-600' : ''}`}>
=======
                    <NavLink to="/" end className={({ isActive }) => `flex items-center w-full rounded-sm hover:bg-green-50 hover:text-green-600 focus:bg-green-50 focus:text-green-600 ${isExpanded ? 'justify-start' : 'justify-center'} ${isActive ? 'text-green-600 bg-green-50 border-l-4 border-green-600' : ''}`}>
>>>>>>> dev
                        <Grid className="mr-2" />
                        {isExpanded && <span>Dashboard</span>}
                    </NavLink>
                </li>
                <li>
<<<<<<< HEAD
                    <NavLink to="/admin-profile" end className={({ isActive }) => `flex items-center w-full ${isExpanded ? 'justify-start' : 'justify-center'} ${isActive ? 'text-green-600' : ''}`}>
=======
                    <NavLink to="/admin-profile" end className={({ isActive }) => `flex items-center w-full rounded-sm hover:bg-green-50 hover:text-green-600 focus:bg-green-50 focus:text-green-600 ${isExpanded ? 'justify-start' : 'justify-center'} ${isActive ? 'text-green-600 bg-green-50 border-l-4 border-green-600' : ''}`}>
>>>>>>> dev
                        <User className="mr-2" />
                        {isExpanded && <span>Profile</span>}
                    </NavLink>
                </li>
                <li>
<<<<<<< HEAD
                    <NavLink to="/manage-user" end className={({ isActive }) => `flex items-center w-full ${isExpanded ? 'justify-start' : 'justify-center'} ${isActive ? 'text-green-600' : ''}`}>
=======
                    <NavLink to="/manage-user" end className={({ isActive }) => `flex items-center w-full rounded-sm hover:bg-green-50 hover:text-green-600 focus:bg-green-50 focus:text-green-600 ${isExpanded ? 'justify-start' : 'justify-center'} ${isActive ? 'text-green-600 bg-green-50 border-l-4 border-green-600' : ''}`}>
>>>>>>> dev
                        <Users className="mr-2" />
                        {isExpanded && <span>Manage User</span>}
                    </NavLink>
                </li>
                <li>
<<<<<<< HEAD
                    <NavLink to="/manage-store" end className={({ isActive }) => `flex items-center w-full ${isExpanded ? 'justify-start' : 'justify-center'} ${isActive ? 'text-green-600' : ''}`}>
=======
                    <NavLink to="/manage-store" end className={({ isActive }) => `flex items-center w-full rounded-sm hover:bg-green-50 hover:text-green-600 focus:bg-green-50 focus:text-green-600 ${isExpanded ? 'justify-start' : 'justify-center'} ${isActive ? 'text-green-600 bg-green-50 border-l-4 border-green-600' : ''}`}>
>>>>>>> dev
                        <Store className="mr-2" />
                        {isExpanded && <span>Manage Store</span>}
                    </NavLink>
                </li>
                <li>
<<<<<<< HEAD
                    <NavLink to="/manage-charity" end  className={({ isActive }) => `flex items-center w-full ${isExpanded ? 'justify-start' : 'justify-center'} ${isActive ? 'text-green-600' : ''}`}>
=======
                    <NavLink to="/manage-charity" end className={({ isActive }) => `flex items-center w-full rounded-sm hover:bg-green-50 hover:text-green-600 focus:bg-green-50 focus:text-green-600 ${isExpanded ? 'justify-start' : 'justify-center'} ${isActive ? 'text-green-600 bg-green-50 border-l-4 border-green-600' : ''}`}>
>>>>>>> dev
                        <Gift className="mr-2" />
                        {isExpanded && <span>Manage Charity</span>}
                    </NavLink>
                </li>
                <li>
<<<<<<< HEAD
                    <NavLink to="/inbox" end className={({ isActive }) => `flex items-center w-full ${isExpanded ? 'justify-start' : 'justify-center'} ${isActive ? 'text-green-600' : ''}`}>
=======
                    <NavLink to="/inbox" end className={({ isActive }) => `flex items-center w-full rounded-sm hover:bg-green-50 hover:text-green-600 focus:bg-green-50 focus:text-green-600 ${isExpanded ? 'justify-start' : 'justify-center'} ${isActive ? 'text-green-600 bg-green-50 border-l-4 border-green-600' : ''}`}>
>>>>>>> dev
                        <MessageCircle className="mr-2" />
                        {isExpanded && <span>Inbox</span>}
                    </NavLink>
                </li>
                <li>
<<<<<<< HEAD
                    <NavLink to="/notifications" end className={({ isActive }) => `flex items-center w-full ${isExpanded ? 'justify-start' : 'justify-center'} ${isActive ? 'text-green-600' : ''}`}>
=======
                    <NavLink to="/notifications" end className={({ isActive }) => `flex items-center w-full rounded-sm hover:bg-green-50 hover:text-green-600 focus:bg-green-50 focus:text-green-600 ${isExpanded ? 'justify-start' : 'justify-center'} ${isActive ? 'text-green-600 bg-green-50 border-l-4 border-green-600' : ''}`}>
>>>>>>> dev
                        <Bell className="mr-2" />
                        {isExpanded && <span>Notifications</span>}
                    </NavLink>
                </li>
                <li>
<<<<<<< HEAD
                    <NavLink to="/settings" end className={({ isActive }) => `flex items-center w-full ${isExpanded ? 'justify-start' : 'justify-center'} ${isActive ? 'text-green-600' : ''}`}>
=======
                    <NavLink to="/settings" end className={({ isActive }) => `flex items-center w-full rounded-sm hover:bg-green-50 hover:text-green-600 focus:bg-green-50 focus:text-green-600 ${isExpanded ? 'justify-start' : 'justify-center'} ${isActive ? 'text-green-600 bg-green-50 border-l-4 border-green-600' : ''}`}>
>>>>>>> dev
                        <Settings className="mr-2" />
                        {isExpanded && <span>Settings</span>}
                    </NavLink>
                </li>
            </ul>

            <ul className="menu space-y-2">
                <li>
<<<<<<< HEAD
                    <NavLink to="/help" className={({ isActive }) => `flex items-center w-full ${isExpanded ? 'justify-start' : 'justify-center'} text-gray-600 ${isActive ? 'text-green-600' : ''}`}>
=======
                    <NavLink to="/help" className={({ isActive }) => `flex items-center w-full rounded-sm hover:bg-green-50 hover:text-green-600 focus:bg-green-50 focus:text-green-600 ${isExpanded ? 'justify-start' : 'justify-center'} ${isActive ? 'text-green-600 bg-green-50 border-l-4 border-green-600' : ''}`}>
>>>>>>> dev
                        <HelpCircle className="mr-2" />
                        {isExpanded && <span>Help</span>}
                    </NavLink>
                </li>
                <li>
                    <button onClick={handleLogout} className="flex items-center w-full justify-center md:justify-start text-red-500">
                        <LogOut className="mr-2" />
                        {isExpanded && <span>Logout</span>}
                    </button>
                </li>
            </ul>
        </div>
    );
};


export default AdminSidebar