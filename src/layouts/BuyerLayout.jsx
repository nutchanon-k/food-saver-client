import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import BuyerNavBar from "../components/buyer/BuyerNavBar";
import useUserStore from "../stores/userStore";
import useSearchStore from "../stores/SearchStore";

const BuyerLayout = () => {
  return (
    <div className="h-screen flex flex-col">
      {/* Navbar section */}
      <div className="">
        {/* Replace with your actual navbar content */}
        <BuyerNavBar />
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default BuyerLayout;
