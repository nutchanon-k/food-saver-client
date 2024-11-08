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

    return (
        <div className="card bg-base-100 shadow-xl p-4">
            <h2 className="card-title mb-4">Sales by Seller</h2>
            <Bar
                data={chartData}
                options={{
                    scales: {
                        y: {
                            beginAtZero: true,
                            suggestedMax: 5000
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

export default SalesBySellerChart;
