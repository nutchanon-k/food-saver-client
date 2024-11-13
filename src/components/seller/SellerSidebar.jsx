import React, { useState, useEffect } from 'react';
import {
    Search, Grid, User, Store, Utensils, FileText, MessageCircle, Bell, Settings, HelpCircle, LogOut, ChevronLeft, ChevronRight
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import Avatar from './Avatar';
import useUserStore from '../../stores/userStore';

const SellerSidebar = ({ isMobileSidebarOpen, toggleMobileSidebar }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
    const user = useUserStore(state => state.user);

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        const handleResize = () => setIsMobileView(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = () => {
        console.log("User logged out");
    };

    return (
        <div
            className={`lg:relative fixed z-30 transition-all duration-300
            ${isMobileSidebarOpen ? 'left-0' : 'lg:left-0 -left-full'} 
            ${isExpanded ? 'w-72' : 'w-24'} 
            h-full bg-white border-r shadow-lg flex flex-col px-2 py-4`}
        >
            {/* User Profile Section */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <div className="avatar flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                            <Avatar
                                className="w-11 h-11 rounded-full"
                                imgSrc={user?.profilePicture}
                            />
                        </div>
                    </div>
                    {isExpanded && (
                        <div className="ml-3">
                            <p className="font-semibold">{user?.firstName} {user?.lastName}</p>
                            <p className="text-xs font-medium text-gray-500">{user?.role}</p>
                        </div>
                    )}
                </div>
                <button onClick={toggleSidebar} className="text-gray-500">
                    {isExpanded ? <ChevronLeft /> : <ChevronRight />}
                </button>
            </div>

            {/* Search Bar */}
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

            {/* Navigation Menu */}
            <ul className="menu flex-grow space-y-2">
                <li>
                    <NavLink to="/" end className={({ isActive }) => `flex items-center w-full rounded-lg hover:bg-green-50 ${isActive ? 'text-green-600 bg-green-50' : 'text-gray-700'}`}>
                        <Grid className="mr-2" />
                        {isExpanded && <span>Dashboard</span>}
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/seller-profile" end className={({ isActive }) => `flex items-center w-full rounded-lg hover:bg-green-50 ${isActive ? 'text-green-600 bg-green-50' : 'text-gray-700'}`}>
                        <User className="mr-2" />
                        {isExpanded && <span>Profile</span>}
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/store-profile" end className={({ isActive }) => `flex items-center w-full rounded-lg hover:bg-green-50 ${isActive ? 'text-green-600 bg-green-50' : 'text-gray-700'}`}>
                        <Store className="mr-2" />
                        {isExpanded && <span>Store</span>}
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/manage-product" end className={({ isActive }) => `flex items-center w-full rounded-lg hover:bg-green-50 ${isActive ? 'text-green-600 bg-green-50' : 'text-gray-700'}`}>
                        <Utensils className="mr-2" />
                        {isExpanded && <span>Manage Product</span>}
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/manage-order" end className={({ isActive }) => `flex items-center w-full rounded-lg hover:bg-green-50 ${isActive ? 'text-green-600 bg-green-50' : 'text-gray-700'}`}>
                        <FileText className="mr-2" />
                        {isExpanded && <span>Manage Order</span>}
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/inbox" end className={({ isActive }) => `flex items-center w-full rounded-lg hover:bg-green-50 ${isActive ? 'text-green-600 bg-green-50' : 'text-gray-700'}`}>
                        <MessageCircle className="mr-2" />
                        {isExpanded && <span>Inbox</span>}
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/notifications" end className={({ isActive }) => `flex items-center w-full rounded-lg hover:bg-green-50 ${isActive ? 'text-green-600 bg-green-50' : 'text-gray-700'}`}>
                        <Bell className="mr-2" />
                        {isExpanded && <span>Notifications</span>}
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/settings" end className={({ isActive }) => `flex items-center w-full rounded-lg hover:bg-green-50 ${isActive ? 'text-green-600 bg-green-50' : 'text-gray-700'}`}>
                        <Settings className="mr-2" />
                        {isExpanded && <span>Settings</span>}
                    </NavLink>
                </li>
                {/* เพิ่ม Help และ Logout ในกลุ่มเมนูหลักเมื่อเป็น mobile */}
                {isMobileView && (
                    <>
                        <li>
                            <NavLink to="/help" className={({ isActive }) => `flex items-center w-full rounded-sm hover:bg-green-50 hover:text-green-600 focus:bg-green-50 focus:text-green-600 ${isExpanded ? 'justify-start' : 'justify-center'} ${isActive ? 'text-green-600 bg-green-50 border-l-4 border-green-600' : ''}`}>
                                <HelpCircle className="mr-2" />
                                {isExpanded && <span>Help</span>}
                            </NavLink>
                        </li>
                        <li>
                            <button onClick={handleLogout} className="flex items-center w-full  md:justify-start text-red-500">
                                <LogOut className="mr-2" />
                                {isExpanded && <span>Logout</span>}
                            </button>
                        </li>
                    </>
                )}
            </ul>

            {/* แยก Help และ Logout ด้านล่างเฉพาะ Desktop */}
            {!isMobileView && (
                <ul className="menu space-y-2">
                    <li>
                        <NavLink to="/help" className={({ isActive }) => `flex items-center w-full rounded-sm hover:bg-green-50 hover:text-green-600 focus:bg-green-50 focus:text-green-600 ${isExpanded ? 'justify-start' : 'justify-center'} ${isActive ? 'text-green-600 bg-green-50 border-l-4 border-green-600' : ''}`}>
                            <HelpCircle className="mr-2" />
                            {isExpanded && <span>Help</span>}
                        </NavLink>
                    </li>
                    <li>
                        <button onClick={toggleMobileSidebar} className="flex items-center w-full justify-center md:justify-start text-red-500">
                            <LogOut className="mr-2" />
                            {isExpanded && <span>Logout</span>}
                        </button>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default SellerSidebar;
