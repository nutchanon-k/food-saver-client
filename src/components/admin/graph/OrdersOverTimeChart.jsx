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
    
            const labels = data.map(item => item.month);
            const orders = data.map(item => item.totalOrders);
    
            setChartData({
              labels,
              datasets: [
                {
                  label: 'Orders Over Time',
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
        <div className="card bg-base-100 shadow-xl p-4">
          <h2 className="card-title mb-4">Orders Over Time</h2>
          <Bar data={chartData} />
        </div>
      );
    };

export default OrdersOverTimeChart