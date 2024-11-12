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
                console.log("xxxxx",data)

                const labels = data?.map(item => item.month);
                const revenues = data?.map(item => item.totalRevenue);
                data?.sort((a, b) => a.monthNumber - b.monthNumber);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Sales',
                            data: revenues,
                            fill: false,
                            backgroundColor: 'rgba(75,192,192,0.4)',
                            borderColor: 'rgba(75,192,192,1)',
                        },
                    ],
                    
                },
                
            
            );
            } catch (error) {
                console.error('Error fetching Sales Over Time:', error);
            }
        };
        
        fetchSalesOverTime();
    }, []);
    console.log(chartData)

    return (
        <div className="card bg-base-100 shadow-xl p-4 flex flex-col items-center">
            <h2 className="card-title mb-4 text-3xl p-4 ">Monthly Sales</h2>
            <Line
                data={chartData}
                options={{
                    scales: {
                        y: {
                            beginAtZero: true,
                            // suggestedMax: 4000,
                        },
                    },
                }}
            />
        </div>
    );
};

export default SalesOverTimeChart