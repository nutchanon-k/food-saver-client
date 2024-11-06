<<<<<<< HEAD
import React from "react";
import { Outlet } from "react-router-dom";

const BuyerLayout = () => {
  return (
    <div className="h-screen flex flex-col">
      <div className="h-16">
        {/* Your navbar goes here */}
        <div>Navbar</div>
      </div>
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
