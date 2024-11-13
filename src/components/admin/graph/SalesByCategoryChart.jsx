
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { getSalesByCategoryAPI } from '../../../API/adminAPI';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const SalesByCategoryChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchSalesByCategory = async () => {
      try {
        const response = await getSalesByCategoryAPI();
        const data = response.data;

        // Filter out categories with 0 revenue
        const filteredData = data.filter(item => item.totalRevenue > 0);

        const labels = filteredData.map(item => item.categoryName);
        const revenues = filteredData.map(item => item.totalRevenue);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Sales by Category',
              data: revenues,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching Sales by Category:', error);
      }
    };

    fetchSalesByCategory();
  }, []);

  // Options สำหรับ responsive Chart.js
  const options = {
    responsive: true,
    maintainAspectRatio: false, // ปิดการคงอัตราส่วนไว้เพื่อให้ปรับขนาดตาม container
    indexAxis: 'y', // ตั้งค่ากราฟแนวนอน
    scales: {
      x: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false, // ซ่อน legend เพื่อความเรียบง่าย
      },
    },
  };

  return (
    <div className="card bg-base-100 shadow-xl p-4 flex flex-col items-center w-full lg:max-w-6xl lg:max-h-6xl mx-auto mb-4">
      <h2 className="card-title mb-4 text-xl sm:text-2xl p-4 text-center">Sales by Category</h2>
      <div className="w-full h-64 sm:h-80 lg:h-[600px]"> {/* ปรับขนาดกราฟให้เต็ม container */}
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default SalesByCategoryChart;

