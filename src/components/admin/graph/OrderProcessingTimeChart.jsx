import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react'; // นำเข้าไอคอนจาก Lucide React
import { orderProcessingTimeAPI } from '../../../API/adminAPI';

const OrderProcessingTimeChart = () => {
  const [averageProcessingTime, setAverageProcessingTime] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrderProcessingTime = async () => {
      try {
        const response = await orderProcessingTimeAPI();
        setAverageProcessingTime(response.data.averageProcessingTime);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Order Processing Time:', error);
        setError('Failed to fetch order processing time.');
        setLoading(false);
      }
    };

    fetchOrderProcessingTime();
  }, []);

  // กำหนดค่าที่ต้องการสำหรับโปรเกรสบาร์
  const maxProcessingTime = 1000; // คุณสามารถปรับเปลี่ยนตามความเหมาะสม
  const percentage = Math.min((averageProcessingTime / maxProcessingTime) * 100, 100);

  return (
    <div className="card bg-base-100 shadow-xl p-6 text-center">
      <div className="flex flex-col items-center">
        {/* ไอคอน */}
        <Clock className="w-12 h-12 text-blue-500 mb-4" />

        {/* หัวข้อ */}
        <h2 className="text-xl font-semibold mb-2">Average Order Processing Time</h2>

        {/* แสดงเวลาเฉลี่ย */}
        {loading ? (
          <div className="flex items-center justify-center">
            <span className="loading loading-spinner text-primary"></span>
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <p className="text-3xl font-bold mb-4">{averageProcessingTime} minutes</p>
        )}

        {/* โปรเกรสบาร์ */}
        {!loading && !error && (
          <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
            <div
              className={`h-4 rounded-full ${
                percentage > 80
                  ? 'bg-red-500'
                  : percentage > 50
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
              }`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        )}

        {/* แสดงเปอร์เซ็นต์ */}
        {!loading && !error && (
          <p className="text-sm text-gray-600">{percentage.toFixed(1)}% of {maxProcessingTime} minutes</p>
        )}
      </div>
    </div>
  );
};

export default OrderProcessingTimeChart;