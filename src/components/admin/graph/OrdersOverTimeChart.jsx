import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { getOrderOverTimeAPI } from '../../../API/adminAPI';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const OrdersOverTimeChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchOrdersOverTime = async () => {
      try {
        const response = await getOrderOverTimeAPI();
        const data = response.data;

        const monthMap = {
          'Jan': 1,
          'Feb': 2,
          'Mar': 3,
          'Apr': 4,
          'May': 5,
          'Jun': 6,
          'Jul': 7,
          'Aug': 8,
          'Sep': 9,
          'Oct': 10,
          'Nov': 11,
          'Dec': 12
        };

        const updatedMonthsData = data.map(item => ({
          ...item,
          monthNumber: monthMap[item.month.split(' ')[0]]
        }));

        updatedMonthsData.sort((a, b) => a.monthNumber - b.monthNumber);

        const labels = updatedMonthsData.map(item => item.month);
        const orders = updatedMonthsData.map(item => item.totalOrders);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Orders',
              data: orders,
              backgroundColor: 'rgba(54, 162, 235, 0.2)', 
              borderColor: 'rgba(54, 162, 235, 1)', 
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching Orders Over Time:', error);
      }
    };

    fetchOrdersOverTime();
  }, []);

  // Options สำหรับ responsive Chart.js
  const options = {
    responsive: true,
    maintainAspectRatio: false, // ปิดการคงอัตราส่วนไว้เพื่อให้ปรับขนาดตาม container
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Total Orders',
        },
      },
    },
  };

  return (
    <div className="card bg-base-100 shadow-xl p-4 flex flex-col items-center w-full lg:max-w-6xl mx-auto mb-4">
      <h2 className="card-title mb-4 text-xl sm:text-2xl p-4 text-center">Monthly Order Quantity</h2>
      <div className="w-full h-64 sm:h-80 lg:h-[600px]"> {/* ปรับขนาดกราฟให้เต็ม container */}
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default OrdersOverTimeChart;
