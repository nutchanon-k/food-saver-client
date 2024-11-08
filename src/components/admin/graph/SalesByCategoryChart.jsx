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
              backgroundColor: 'rgba(75, 192, 192, 0.2)', // Set one color for clarity
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

  return (
    <div className="card bg-base-100 shadow-xl p-4">
      <h2 className="card-title mb-4">Sales by Category</h2>
      <Bar
        data={chartData}
        options={{
          indexAxis: 'y', // Set horizontal orientation
          scales: {
            x: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              display: false, // Hide legend for simplicity
            },
          },
        }}
      />
    </div>
  );
};

export default SalesByCategoryChart;
