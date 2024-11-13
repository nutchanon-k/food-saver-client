
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { getSalesBySellerAPI } from '../../../API/adminAPI';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const SalesBySellerChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });

    useEffect(() => {
        const fetchSalesBySeller = async () => {
            try {
                const response = await getSalesBySellerAPI();
                const data = response.data;

                // Sort by totalRevenue in descending order and take the top 10
                const topSellers = data
                    .sort((a, b) => b.totalRevenue - a.totalRevenue)
                    .slice(0, 10);

                const labels = topSellers.map(item => item.store.storeName);
                const revenues = topSellers.map(item => item.totalRevenue);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Sales by Seller',
                            data: revenues,
                            backgroundColor: 'rgba(255, 206, 86, 0.6)',
                            borderColor: 'rgba(255, 206, 86, 1)',
                            borderWidth: 1,
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching Sales by Seller:', error);
            }
        };

        fetchSalesBySeller();
    }, []);

    // Options สำหรับ responsive Chart.js
    const options = {
        responsive: true,
        maintainAspectRatio: false, // ปิดการคงอัตราส่วนไว้เพื่อให้ปรับขนาดตาม container
        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: 5000
            },
        },
        plugins: {
            legend: {
                display: false, // ซ่อน legend เพื่อความเรียบง่าย
            },
        },
    };

    return (
        <div className="card bg-base-100 shadow-xl p-4 flex flex-col items-center w-full lg:max-w-6xl mx-auto mb-4">
            <h2 className="card-title mb-4 text-xl sm:text-2xl p-4 text-center">Sales by Seller</h2>
            <div className="w-full h-64 sm:h-80 lg:h-[600px]"> {/* ปรับขนาดกราฟให้เต็ม container */}
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
};

export default SalesBySellerChart;
