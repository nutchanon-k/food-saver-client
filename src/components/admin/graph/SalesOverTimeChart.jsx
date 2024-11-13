import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { getSalesOverTimeAPI } from '../../../API/adminAPI';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const SalesOverTimeChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });

    useEffect(() => {
        const fetchSalesOverTime = async () => {
            try {
                const response = await getSalesOverTimeAPI();
                const data = response?.data;

                // จัดเรียงข้อมูลตามเดือน
                data?.sort((a, b) => a.monthNumber - b.monthNumber);

                const labels = data?.map(item => item.month);
                const revenues = data?.map(item => item.totalRevenue);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Sales',
                            data: revenues,
                            fill: false,
                            backgroundColor: 'rgba(75,192,192,0.4)',
                            borderColor: 'rgba(75,192,192,1)',
                            tension: 0.3, // เพิ่มความโค้งให้กราฟเส้น
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching Sales Over Time:', error);
            }
        };

        fetchSalesOverTime();
    }, []);

    // Options สำหรับ responsive Chart.js
    const options = {
        responsive: true,
        maintainAspectRatio: false, // ปิดการคงอัตราส่วนไว้เพื่อให้ปรับขนาดตาม container
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
        },
    };

    return (
        <div className="card bg-base-100 shadow-xl p-4 flex flex-col items-center w-full lg:max-w-6xl mx-auto mb-4">
            <h2 className="card-title mb-4 text-xl sm:text-2xl p-4 text-center">Monthly Sales</h2>
            <div className="w-full h-64 sm:h-80 lg:h-[600px]"> {/* ปรับขนาดกราฟให้เต็ม container */}
                <Line data={chartData} options={options} />
            </div>
        </div>
    );
};

export default SalesOverTimeChart;
