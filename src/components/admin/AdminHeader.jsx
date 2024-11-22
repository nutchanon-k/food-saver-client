import React, { useEffect, useState } from 'react';
import { Search, Bell, Menu } from 'lucide-react'; // เพิ่ม Menu icon
import Avatar from './Avatar';
import useSearchStore from '../../stores/SearchStore';
import useUserStore from '../../stores/userStore';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/pictures/FoodSaver.png';

const AdminHeader = ({ toggleMobileSidebar }) => {
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
        <header className="flex items-center justify-between bg-white px-4 py-4 border-b shadow-sm">
            {/* Hamburger Menu Icon for Mobile */}
            <button className="lg:hidden text-gray-500" onClick={toggleMobileSidebar}>
                <Menu size={24} />
            </button>

            {/* Logo */}
            <div className="flex items-center">
                <img src={Logo} alt="Logo"  className="aspect-auto  h-12 mr-2" />
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center w-1/2 bg-gray-100 rounded-full px-4 py-2 mx-4">
                <Search className="text-gray-500 mr-2" />
                <input
                    type="text"
                    value={text}
                    placeholder="Search..."
                    className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-500"
                    onChange={(e) => setText(e.target.value)}
                />
            </div>

            {/* Notifications and User Info */}
            <div className="flex items-center space-x-4">
                {/* <button className="relative rounded-full hover:bg-gray-100">
                    <Bell className="text-gray-500" />
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 py-0.5 bg-red-500 text-white text-xs rounded-full">3</span>
                </button> */}

                {/* User Info */}
                <div className="flex items-center space-x-2">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-semibold">{user?.firstName + " " + user?.lastName}</p>
                        <p className="text-xs font-medium text-gray-500">{user?.role}</p>
                    </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <Avatar
                                    className="w-11 h-11 rounded-full !flex justify-center items-center"
                                    imgSrc={user?.profilePicture}
                                    menu={true}
                                />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li onClick={()=>navigate('/admin-profile')}><a>Profile</a></li>
                            <li onClick={handleLogout}><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
