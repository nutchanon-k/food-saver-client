import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// ลงทะเบียนส่วนประกอบของ Chart.js ที่จะใช้
ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];


// const MostTypeOfOrderChart = ({ data }) => {
//   // เตรียมข้อมูลสำหรับ Pie Chart
//   const chartData = {
//     labels: data.map(item => item.category),
//     datasets: [
//       {
//         data: data.map(item => item.totalOrdered),
//         backgroundColor: COLORS,
//         hoverBackgroundColor: COLORS,
//       },
//     ],
//   };

//   // กำหนดตัวเลือกสำหรับ Chart
//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top', // ตำแหน่งของ Legend
//       },
//       tooltip: {
//         callbacks: {
//           label: function (context) {
//             const label = context.label || '';
//             const value = context.parsed || 0;
//             return `${label}: ${value} orders`;
//           },
//         },
//       },
//     },
//   };

//   return (
//     <div className="bg-white shadow-md rounded-lg p-6">
//       <Pie data={chartData} options={options} />
//     </div>
//   );
// };
const MostTypeOfOrderChart = ({ data }) => {
  const chartData = {
      labels: data.map(item => item.category),
      datasets: [{
          data: data.map(item => item.totalOrdered),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
      }]
  };

  const options = {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
          legend: {
              position: 'bottom',
              labels: {
                  boxWidth: 12,
                  padding: 15,
                  font: {
                      size: 12
                  }
              }
          },
          tooltip: {
              callbacks: {
                  label: function(context) {
                      const label = context.label || '';
                      const value = context.parsed || 0;
                      return `${label}: ${value} orders`;
                  }
              }
          }
      }
  };

  return (
      <div className="w-full max-w-[300px] mx-auto">
          <Pie data={chartData} options={options} />
      </div>
  );
};

export default MostTypeOfOrderChart;