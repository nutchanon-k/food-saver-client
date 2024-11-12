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
        // console.log("tttttt", data)


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
        // console.log('5555',updatedMonthsData);

        updatedMonthsData?.sort((a, b) => a.monthNumber - b.monthNumber);

        const labels = updatedMonthsData.map(item => item.month);
        const orders = updatedMonthsData.map(item => item.totalOrders);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Orders',
              data: orders,
              backgroundColor: 'rgba(54, 162, 235, 0.2)', // Change the color here
              borderColor: 'rgba(54, 162, 235, 1)', // Optional: set border color for each bar
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

  return (
    <div className="card bg-base-100 shadow-xl p-4 flex flex-col items-center">
      <h2 className="card-title mb-4 text-3xl p-4 ">Monthly Order Quantity</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default OrdersOverTimeChart