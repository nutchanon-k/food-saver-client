import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useUserStore from "../../stores/userStore";
import useSearchStore from "../../stores/SearchStore";
import { Bell, Search, Menu } from "lucide-react";
import Avatar from "../seller/Avatar";

const BuyerNavBar = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const searchText = useSearchStore((state) => state.searchText);
  const setSearchText = useSearchStore((state) => state.setSearchText);
  const hdlLogout = useUserStore((state) => state.hdlLogout);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [text, setText] = useState(searchText);

  useEffect(() => {
    const delay = setTimeout(() => {
      setSearchText(text);
    }, 500);
    return () => clearTimeout(delay);
  }, [text]);

  const handleLogout = async () => {
    await hdlLogout();
  };

  return (
    <div className="flex items-center w-full justify-between bg-white px-4 py-4 border-b shadow-sm">
      {/* Logo */}
      <Link to="/home" className="flex items-center">
        <img src='../../src/assets/pictures/FoodSaver.png' alt="Logo" className="w-24 h-12 mr-2" />
      </Link>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Desktop Search Bar */}
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

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-4">
        <button className="relative rounded-full hover:bg-gray-100">
          <Bell className="text-gray-500" />
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 py-0.5 bg-red-500 text-white text-xs rounded-full">
            3
          </span>
        </button>

        <div className="flex items-center space-x-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-xs font-medium text-gray-500">{user?.role}</p>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <Avatar
                  className="w-11 h-11 rounded-full !flex justify-center items-center"
                  imgSrc={user?.profilePicture}
                  menu={true}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li onClick={handleLogout}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>



      {/* Mobile Menu */}
      {
        isMenuOpen && (
          <div className="md:hidden border-t">
            <div className="px-4 py-3 space-y-3">
              {/* Mobile Search */}
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
                <Search className="text-gray-500 mr-2" />
                <input
                  type="text"
                  value={text}
                  placeholder="Search..."
                  className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-500"
                  onChange={(e) => setText(e.target.value)}
                />
              </div>

              {/* Mobile User Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar
                    className="w-8 h-8 rounded-full !flex justify-center items-center"
                    imgSrc={user?.profilePicture}
                    menu={true}
                  />
                  <div>
                    <p className="text-sm font-semibold">
                      {user?.firstName + " " + user?.lastName}
                    </p>
                    <p className="text-xs text-gray-500">{user?.role}</p>
                  </div>
                </div>
                <button onClick={handleLogout} className="text-sm text-red-500">
                  Logout
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
};

export default BuyerNavBar;
