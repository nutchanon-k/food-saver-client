<<<<<<< HEAD
import React from "react";
import { Outlet } from "react-router-dom";

const BuyerLayout = () => {
  return (
    <div className="h-screen flex flex-col">
      {/* Navbar section */}
      <div className="h-16 bg-white shadow-md flex items-center px-4">
        {/* Replace with your actual navbar content */}
        <div className="text-lg font-semibold">asdasdasdasdasdasssssssss</div>
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default BuyerLayout;
=======
import React from 'react'
import { Outlet } from 'react-router-dom'

const BuyerLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default BuyerLayout
>>>>>>> dev
