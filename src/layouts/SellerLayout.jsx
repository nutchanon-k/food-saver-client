import React from 'react'
import { Outlet } from 'react-router-dom';
import SellerHeader from '../components/seller/SellerHeader';
import SellerSidebar from '../components/seller/SellerSidebar';

const SellerLayout = () => {
  return (
    <div className="flex flex-col h-screen">
    {/* Header */}
    <SellerHeader />

    {/* Main Content */}
    <div className="flex flex-grow overflow-hidden">
        {/* Sidebar */}
        <SellerSidebar />

        {/* Content */}
        <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
            <Outlet />
        </div>
    </div>
</div>
  )
}

export default SellerLayout