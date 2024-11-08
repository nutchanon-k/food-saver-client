import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { getOrdersByStatusAPI } from '../../../API/adminAPI';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const OrdersByStatusChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
      });
    
      useEffect(() => {
        const fetchOrdersByStatus = async () => {
          try {
            const response = await getOrdersByStatusAPI();
            const data = response.data;
    
            const labels = data.map(item => item.status);
            const counts = data.map(item => item.count);
    
            setChartData({
              labels,
              datasets: [
                {
                  label: 'Orders by Status',
                  data: counts,
                  backgroundColor: [
                    'rgba(75, 192, 192, 0.6)', // PENDING
                    'rgba(54, 162, 235, 0.6)', // COMPLETED
                    
                    'rgba(255, 206, 86, 0.6)', // FAILED
                  ],
                  borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                  ],
                  borderWidth: 1,
                },
              ],
            });
          } catch (error) {
            console.error('Error fetching Orders by Status:', error);
          }
        };
    
        fetchOrdersByStatus();
      }, []);
    
      return (
        <div className="card bg-base-100 shadow-xl p-4">
          <h2 className="card-title mb-4">Orders by Status</h2>
          <Pie data={chartData} />
        </div>
      );
    };
    

export default OrdersByStatusChart