// import React, { useEffect, useState } from 'react';
// import { ChevronRight, ClipboardList, Search } from 'lucide-react';
// import useSellerOrderStore from '../../stores/SellerOrderStore';

// const OrderList = () => {
//   const {
//     orders,
//     fetchOrders,
//     selectOrder,
//     loading,
//     error,
//     currentPage,
//     ordersPerPage,
//     setCurrentPage,
//   } = useSellerOrderStore();
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     fetchOrders();
//   }, [fetchOrders]);

//   // Filter orders based on search term (order ID or date)
//   const filteredOrders = orders.filter((order) => {
//     const orderIdMatch = order.id.toString().includes(searchTerm);
//     const date = new Date(order.createdAt).toLocaleDateString('th-TH');
//     const dateMatch = date.includes(searchTerm);
//     return orderIdMatch || dateMatch;
//   });

//   console.log('Filtered Orders:', filteredOrders); // Debugging log

//   // Calculate pagination
//   const indexOfLastOrder = currentPage * ordersPerPage;
//   const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
//   const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
//   const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

//   console.log(`Current Page: ${currentPage}, Orders Per Page: ${ordersPerPage}`);
//   console.log('Current Orders:', currentOrders);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   return (
//     <div className="w-full bg-white shadow-md overflow-hidden">
//       {/* Header */}
//       <div className="p-4 flex items-center">
//         <ClipboardList className="text-[#5abd4f]" />
//         <h1 className="text-[#5abd4f] text-xl font-bold ml-2">Orders In</h1>
//       </div>

//       {/* Search Bar */}
//       <div className="p-4">
//         <div className="relative">
//           <Search className="text-gray-400 absolute top-2.5 left-4" />
//           <input
//             type="text"
//             placeholder="Search Order"
//             className="pl-12 pr-4 py-2 w-full border rounded-full focus:outline-none focus:ring-2 focus:ring-[#5abd4f]"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Loading, Error, or Orders List */}
//       {loading ? (
//         <div className="flex items-center justify-center min-h-[200px]">
//           <span className="loading loading-ball loading-lg"></span>
//         </div>
//       ) : error ? (
//         <div className="text-red-500 text-center p-4">{error}</div>
//       ) : filteredOrders.length === 0 ? (
//         <div className="text-center p-4 text-gray-500">No orders found.</div>
//       ) : (
//         <>
//           <div className="divide-y divide-gray-200">
//             {currentOrders.map((order) => (
//               <div
//                 key={order.id}
//                 className={`flex items-center justify-between p-4 cursor-pointer ${
//                   order.isPickUpped ? 'bg-blue-100' : order.paymentStatus === 'COMPLETED' ? 'bg-green-100' : ''
//                 }`}
//                 onClick={() => selectOrder(order)}
//               >
//                 <div>
//                   <div className="text-xl font-semibold">Order #{order.id}</div>
//                   <div className="text-xs text-gray-400">
//                     {new Date(order.createdAt).toLocaleDateString('th-TH')} {new Date(order.createdAt).toLocaleTimeString('th-TH')}
//                   </div>
//                 </div>
//                 <div
//                   className={`text-xl font-semibold ${
//                     order.isPickUpped ? 'text-blue-500' : order.paymentStatus === 'COMPLETED' ? 'text-[#5abd4f]' : 'text-[#ff5722]'
//                   }`}
//                 >
//                   ฿{parseFloat(order.totalPrice).toLocaleString()}
//                 </div>
//                 <button className="bg-[#5abd4f] text-white rounded-full p-2">
//                   <ChevronRight />
//                 </button>
//               </div>
//             ))}
//           </div>

//           {/* Pagination Controls */}
//           <div className="flex justify-between items-center p-4">
//             <button
//               className={`btn btn-sm ${currentPage === 1 ? 'btn-disabled' : 'btn-primary'}`}
//               onClick={handlePreviousPage}
//               disabled={currentPage === 1}
//             >
//               Previous
//             </button>
//             <span className="text-sm text-gray-600">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               className={`btn btn-sm ${currentPage === totalPages ? 'btn-disabled' : 'btn-primary'}`}
//               onClick={handleNextPage}
//               disabled={currentPage === totalPages}
//             >
//               Next
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default OrderList;



import React, { useEffect, useState } from 'react';
import { ChevronRight, ClipboardList, Search } from 'lucide-react';
import useSellerOrderStore from '../../stores/SellerOrderStore';

// Custom Order Card Component
const OrderCard = ({ order, onSelect }) => {
  const getStatusColor = (order) => {
    if (order.isPickUpped) return 'bg-blue-50 hover:bg-blue-100';
    if (order.paymentStatus === 'COMPLETED') return 'bg-green-50 hover:bg-green-100';
    return 'hover:bg-gray-50';
  };

  const getPriceColor = (order) => {
    if (order.isPickUpped) return 'text-blue-500';
    if (order.paymentStatus === 'COMPLETED') return 'text-[#5abd4f]';
    return 'text-[#ff5722]';
  };

  return (
    <div
      className={`p-4 cursor-pointer transition-colors duration-200 ${getStatusColor(order)}`}
      onClick={() => onSelect(order)}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-semibold truncate">Order #{order.id}</h3>
            <span className={`text-lg font-semibold ${getPriceColor(order)}`}>
              ฿{parseFloat(order.totalPrice).toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">
              {new Date(order.createdAt).toLocaleDateString('th-TH')}
            </p>
            <p className="text-xs text-gray-500">
              {new Date(order.createdAt).toLocaleTimeString('th-TH')}
            </p>
          </div>
        </div>
        <button 
          className="bg-[#5abd4f] text-white rounded-full p-2 hover:bg-[#4caf50] active:scale-95 transition-transform"
          aria-label="View order details"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Custom Search Bar Component
const SearchBar = ({ value, onChange }) => (
  <div className="relative">
    <Search className="text-gray-400 absolute top-1/2 transform -translate-y-1/2 left-4 w-5 h-5" />
    <input
      type="text"
      placeholder="Search by Order ID or Date"
      className="w-full pl-12 pr-4 py-3 border rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-[#5abd4f] focus:border-transparent transition-shadow duration-200"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

// Custom Pagination Component
const Pagination = ({ currentPage, totalPages, onPrevious, onNext }) => (
  <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200">
    <button
      onClick={onPrevious}
      disabled={currentPage === 1}
      className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
        currentPage === 1
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
          : 'bg-[#5abd4f] text-white hover:bg-[#4caf50] active:scale-95'
      }`}
    >
      Previous
    </button>
    <span className="text-sm text-gray-600">
      Page {currentPage} of {totalPages}
    </span>
    <button
      onClick={onNext}
      disabled={currentPage === totalPages}
      className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
        currentPage === totalPages
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
          : 'bg-[#5abd4f] text-white hover:bg-[#4caf50] active:scale-95'
      }`}
    >
      Next
    </button>
  </div>
);

// Main Component
const OrderList = () => {
  const {
    orders,
    fetchOrders,
    selectOrder,
    loading,
    error,
    currentPage,
    ordersPerPage,
    setCurrentPage,
  } = useSellerOrderStore();
  
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const filteredOrders = orders.filter((order) => {
    const orderIdMatch = order.id.toString().includes(searchTerm);
    const date = new Date(order.createdAt).toLocaleDateString('th-TH');
    const dateMatch = date.includes(searchTerm);
    return orderIdMatch || dateMatch;
  });

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-md mx-auto w-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <ClipboardList className="text-[#5abd4f] w-6 h-6" />
          <h1 className="text-[#5abd4f] text-xl font-bold">Orders In</h1>
        </div>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>

      {/* Content */}
      <div className="divide-y divide-gray-200">
        {loading ? (
          <div className="flex items-center justify-center min-h-[200px]">
            <span className="loading loading-ball loading-lg text-[#5abd4f]"></span>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">{error}</div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No orders found</div>
        ) : (
          <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
            {currentOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onSelect={selectOrder}
              />
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {!loading && filteredOrders.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevious={handlePreviousPage}
          onNext={handleNextPage}
        />
      )}
    </div>
  );
};

export default OrderList;