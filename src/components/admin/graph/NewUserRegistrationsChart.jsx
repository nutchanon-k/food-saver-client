import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
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
import { getNewUserRegistrationsAPI } from '../../../API/adminAPI';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const NewUserRegistrationsChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });

    useEffect(() => {
        const fetchNewUserRegistrations = async () => {
            try {
                const response = await getNewUserRegistrationsAPI();
                const data = response.data;

                const labels = data.map(item => item.month);
                const newUsers = data.map(item => item.newUsers);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'New User Registrations',
                            data: newUsers,
                            fill: false,
                            backgroundColor: 'rgba(255, 99, 132, 0.6)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching New User Registrations:', error);
            }
        };

        fetchNewUserRegistrations();
    }, []);

    return (
        <div className="card bg-base-100 shadow-xl p-4">
            <h2 className="card-title mb-4">New User Registrations Over Time</h2>
            <Line data={chartData} />
        </div>
    );
};


export default NewUserRegistrationsChart