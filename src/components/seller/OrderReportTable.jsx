// src/components/dashboard/OrderReportTable.jsx

import React from 'react';

const OrderReportTable = ({ orders }) => {
  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Order Report</h2>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg">Filter Order</button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="pb-2">Customer</th>
              <th className="pb-2">Menu</th>
              <th className="pb-2">Total Payment</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="border-t">
                <td className="py-2 flex items-center">
                  <img src={order.profilePicture} alt="Customer avatar" className="rounded-full mr-2 w-8" />
                  {order.customer}
                </td>
                <td className="py-2 ">{order.menu}</td>
                <td className="py-2 ">฿ {order.totalPayment.toLocaleString()}</td>
                <td className={`py-2 ${order.status === 'COMPLETED' ? 'text-green-500' : order.status === 'PENDING' ? 'text-purple-500' : 'text-orange-500'}`}>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderReportTable;
