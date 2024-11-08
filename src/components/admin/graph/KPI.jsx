// src/components/admin/graph/KPI.jsx

import React, { useEffect, useState } from 'react';
import { getMetricAPI } from '../../../API/adminAPI';
import { DollarSign, ShoppingCart, Users, Package } from 'lucide-react';
import "../../../index.css";

const KPI = () => {
    const [kpis, setKpis] = useState({
        totalRevenue: 0,
        totalOrders: 0,
        totalUsers: [],
        totalProducts: 0,
    });

    useEffect(() => {
        const fetchKPIs = async () => {
            try {
                const response = await getMetricAPI();
                setKpis(response.data);
            } catch (error) {
                console.error('Error fetching KPIs:', error);
            }
        };

        fetchKPIs();
    }, []);
    console.log(kpis)

    // กำหนดข้อมูลสำหรับแต่ละ KPI
    const kpiData = [
        {
            title: 'Total Revenue',
            value: `฿${kpis.totalRevenue.toLocaleString()}`,
            icon: <DollarSign className="w-6 h-6 text-blue-500" />,
            iconBgColor: 'bg-blue-100',
        },
        {
            title: 'Total Orders',
            value: kpis.totalOrders,
            icon: <ShoppingCart className="w-6 h-6 text-green-500" />,
            iconBgColor: 'bg-green-100',
        },
        {
            title: 'Total Users',
            value: kpis.totalUsers.reduce((acc, user) => acc + user._count.role, 0),
            icon: <Users className="w-6 h-6 text-yellow-500" />,
            iconBgColor: 'bg-yellow-100',
        },
        {
            title: 'Total Products',
            value: kpis.totalProducts,
            icon: <Package className="w-6 h-6 text-red-500" />,
            iconBgColor: 'bg-red-100',
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiData.map((kpi, index) => (
                <div
                    key={index}
                    className="card bg-white shadow-md rounded-lg p-4 flex items-center justify-center hover:shadow-lg transition-shadow duration-300"
                >
                    <div className={`p-3 rounded-full ${kpi.iconBgColor}`}>
                        {kpi.icon}
                    </div>
                    <div className="ml-4 flex flex-col items-center justify-center">
                        <h3 className="text-lg font-semibold text-gray-700">{kpi.title}</h3>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default KPI;
