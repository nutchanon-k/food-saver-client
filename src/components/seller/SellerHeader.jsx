import React, { useEffect, useState } from 'react';
import { Search, Bell, Menu } from 'lucide-react';
import Avatar from './Avatar';
import useSearchStore from '../../stores/SearchStore';
import useUserStore from '../../stores/userStore';
import { useNavigate } from 'react-router-dom';

const SellerHeader = ({ toggleMobileSidebar }) => {
    const navigate = useNavigate();
    const user = useUserStore(state => state.user);
    const searchText = useSearchStore(state => state.searchText);
    const setSearchText = useSearchStore(state => state.setSearchText);
    const hdlLogout = useUserStore(state => state.hdlLogout);

    const [text, setText] = useState(searchText);

    useEffect(() => {
        const delay = setTimeout(() => {
            setSearchText(text);
        }, 500);
        return () => clearTimeout(delay);
    }, [text]);

    const handleLogout = async () => {
        await hdlLogout();
        navigate('/');
    };

    return (
        <header className="flex items-center justify-between bg-white px-4 py-2 md:py-4 border-b shadow-sm">
            {/* Hamburger Menu Icon for Mobile */}
            <button className="lg:hidden text-gray-500" onClick={toggleMobileSidebar}>
                <Menu size={24} />
            </button>

            {/* Logo */}
            <div className="flex items-center">
                <img src='../../src/assets/pictures/FoodSaver.png' alt="Logo" className="h-full aspect-auto md:w-24 md:h-full mr-2" />
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-full px-3 py-1 md:px-4 md:py-2 flex-grow md:flex-grow-0 md:w-1/2 lg:w-1/3 mx-4">
                <Search className="text-gray-500 mr-2" />
                <input
                    type="text"
                    value={text}
                    placeholder="Search..."
                    className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-500 text-sm md:text-base"
                    onChange={(e) => setText(e.target.value)}
                />
            </div>

            {/* Notifications and User Info */}
            <div className="flex items-center space-x-2 md:space-x-4">
                {/* Notification Icon */}
                <button className="relative rounded-full p-1 hover:bg-gray-100">
                    <Bell className="text-gray-500 w-6 h-6 md:w-7 md:h-7" />
                    {/* Notification Badge */}
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1 py-0.5 bg-red-500 text-white text-xs rounded-full">3</span>
                </button>

                {/* User Info */}
                <div className="flex items-center space-x-2">
                    <div className="hidden md:flex flex-col gap-2 items-end">
                        <p className="text-sm font-semibold leading-none">{user?.firstName} {user?.lastName}</p>
                        <p className="text-xs font-medium text-gray-500 leading-none">{user?.role}</p>
                    </div>
                    <div className="dropdown dropdown-end">
                        <button tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full">
                                <Avatar
                                    className="w-full h-full rounded-full"
                                    imgSrc={user?.profilePicture}
                                    menu={true}
                                />
                            </div>
                        </button>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-50">
                            <li onClick={handleLogout}><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default SellerHeader;
