import React from 'react'
import AdminHeader from '../components/admin/AdminHeader'
import AdminSidebar from '../components/admin/AdminSidebar'
import ManageUser from '../pages/admin/ManageUser';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
    return (
        <div className="flex flex-col h-screen">
            {/* Header */}
            <AdminHeader />

            {/* Main Content */}
            <div className="flex flex-grow overflow-hidden">
                {/* Sidebar */}
                <AdminSidebar />

                {/* Content */}
                <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout