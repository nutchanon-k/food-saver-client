import React, { useEffect, useState } from 'react';
import axiosInstance from '../../API/Interceptor';
import KPICard from '../../components/seller/KPICard';
import OrderReportTable from '../../components/seller/OrderReportTable';
import MostOrderedList from '../../components/seller/MostOrderedList';
import MostTypeOfOrderChart from '../../components/seller/MostTypeOfOrderChart';

const SellerDashboard = () => {
    const [kpi, setKpi] = useState({
        totalRevenue: 0,
        totalDishOrdered: 0,
        totalCustomer: 0,
    });
    const [orderReport, setOrderReport] = useState([]);
    const [mostOrdered, setMostOrdered] = useState([]);
    const [mostTypeOfOrder, setMostTypeOfOrder] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [kpiRes, orderReportRes, mostOrderedRes, mostTypeOfOrderRes] = await Promise.all([
                    axiosInstance.get('/seller-data/kpi'),
                    axiosInstance.get('/seller-data/order-report'),
                    axiosInstance.get('/seller-data/most-ordered'),
                    axiosInstance.get('/seller-data/most-type-order'),
                ]);

                setKpi(kpiRes.data);
                setOrderReport(orderReportRes.data);
                setMostOrdered(mostOrderedRes.data);
                setMostTypeOfOrder(mostTypeOfOrderRes.data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <>
            <div>
                <div className="container mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold">Dashboard</h1>
                        <p className="text-gray-500">{new Date().toDateString()}</p>
                    </div>

                    {/* KPI Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <KPICard title="Total Revenue" value={`฿ ${new Intl.NumberFormat('en-US').format(kpi.totalRevenue)}`} />
                        <KPICard title="Total Dish Ordered" value={kpi.totalDishOrdered.toLocaleString()} />
                        <KPICard title="Total Customer" value={kpi.totalCustomer.toLocaleString()} />
                    </div>


                    {/* Order Report Table */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">Order Report</h2>
                        <OrderReportTable orders={orderReport} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <MostOrderedList mostOrdered={mostOrdered} />
                        <div className="bg-white p-6 rounded-lg shadow">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">Most Type of Order</h2>
                                <button className="bg-green-500 text-white px-4 py-2 rounded-lg">Today</button>
                            </div>
                            <div className="flex justify-center">
                                <MostTypeOfOrderChart data={mostTypeOfOrder} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>


    )
}

export default SellerDashboard