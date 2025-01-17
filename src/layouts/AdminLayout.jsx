import React, { useState } from 'react';
import AdminHeader from '../components/admin/AdminHeader';
import AdminSidebar from '../components/admin/AdminSidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const toggleMobileSidebar = () => {
        setIsMobileSidebarOpen(!isMobileSidebarOpen);
    };

    return (
        <div className="flex flex-col h-screen">
            {/* Header */}
            <AdminHeader toggleMobileSidebar={toggleMobileSidebar} />

            {/* Main Content */}
            <div className="flex flex-grow overflow-hidden">
                
                {/* Sidebar */}
                <AdminSidebar 
                    isMobileSidebarOpen={isMobileSidebarOpen} 
                    toggleMobileSidebar={toggleMobileSidebar} 
                />

                {/* Content */}
                <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;

