import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SellerHeader from '../components/seller/SellerHeader';
import SellerSidebar from '../components/seller/SellerSidebar';

const SellerLayout = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Function to toggle the sidebar visibility on mobile
  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <SellerHeader toggleMobileSidebar={toggleMobileSidebar} />

      {/* Main Content */}
      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar */}
        <SellerSidebar
          isMobileSidebarOpen={isMobileSidebarOpen}
          toggleMobileSidebar={toggleMobileSidebar}
        />

        {/* Content Area */}
        <div 
          className={`flex-grow p-4 overflow-y-auto bg-gray-50 transition-all duration-300 
          ${isMobileSidebarOpen ? 'pointer-events-none' : 'pointer-events-auto'}`} // Remove opacity styling
          onClick={() => isMobileSidebarOpen && setIsMobileSidebarOpen(false)} // Close sidebar when clicking on content in mobile view
        >
          <Outlet />
        </div>
      </div>

      {/* Mobile overlay to close sidebar */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-20 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default SellerLayout;
