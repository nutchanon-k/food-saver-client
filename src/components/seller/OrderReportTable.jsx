// // src/components/dashboard/OrderReportTable.jsx

import React from 'react';

// const OrderReportTable = ({ orders }) => {
//   return (
//     <>
//       <div className="bg-white p-6 rounded-lg shadow mb-8">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">Order Report</h2>
//           <button className="bg-green-500 text-white px-4 py-2 rounded-lg">Filter Order</button>
//         </div>
//         <table className="w-full">
//           <thead>
//             <tr className="text-left text-gray-500">
//               <th className="pb-2">Customer</th>
//               <th className="pb-2">Menu</th>
//               <th className="pb-2">Total Payment</th>
//               <th className="pb-2">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order, index) => (
//               <tr key={index} className="border-t">
//                 <td className="py-2 flex items-center">
//                   <img src={order.profilePicture} alt="Customer avatar" className="rounded-full mr-2 w-8" />
//                   {order.customer}
//                 </td>
//                 <td className="py-2 ">{order.menu}</td>
//                 <td className="py-2 ">฿ {order.totalPayment.toLocaleString()}</td>
//                 <td className={`py-2 ${order.status === 'COMPLETED' ? 'text-green-500' : order.status === 'PENDING' ? 'text-purple-500' : 'text-orange-500'}`}>{order.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default OrderReportTable;


const OrderReportTable = ({ orders }) => {
  return (
      <div className="bg-white p-4 md:p-6 rounded-lg shadow">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
              <h2 className="text-xl font-bold">Order Report</h2>
              <button className="bg-green-500 text-white px-3 py-1.5 rounded-lg text-sm w-full md:w-auto">
                  Filter Order
              </button>
          </div>
          <div className="overflow-x-auto -mx-4 md:mx-0">
              <div className="min-w-[600px] md:w-full p-4 md:p-0">
                  <table className="w-full">
                      <thead>
                          <tr className="text-left text-gray-500">
                              <th className="pb-2 text-sm md:text-base">Customer</th>
                              <th className="pb-2 text-sm md:text-base">Menu</th>
                              <th className="pb-2 text-sm md:text-base">Total Payment</th>
                              <th className="pb-2 text-sm md:text-base">Status</th>
                          </tr>
                      </thead>
                      <tbody>
                          {orders.map((order, index) => (
                              <tr key={index} className="border-t">
                                  <td className="py-2">
                                      <div className="flex items-center">
                                          <img 
                                              src={order.profilePicture} 
                                              alt="Customer" 
                                              className="w-6 h-6 md:w-8 md:h-8 rounded-full mr-2"
                                          />
                                          <span className="text-sm md:text-base">{order.customer}</span>
                                      </div>
                                  </td>
                                  <td className="py-2 text-sm md:text-base">{order.menu}</td>
                                  <td className="py-2 text-sm md:text-base">
                                      ฿ {order.totalPayment.toLocaleString()}
                                  </td>
                                  <td className={`py-2 text-sm md:text-base ${
                                      order.status === 'COMPLETED' 
                                          ? 'text-green-500' 
                                          : order.status === 'PENDING' 
                                              ? 'text-purple-500' 
                                              : 'text-orange-500'
                                  }`}>
                                      {order.status}
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
  );
};

export default OrderReportTable;