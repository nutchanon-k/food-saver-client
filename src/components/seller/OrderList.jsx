import React, { useEffect, useState } from 'react';
import { ChevronRight, ClipboardList, Search } from 'lucide-react';
import useSellerOrderStore from '../../stores/SellerOrderStore';

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

  // Filter orders based on search term (order ID or date)
  const filteredOrders = orders.filter((order) => {
    const orderIdMatch = order.id.toString().includes(searchTerm);
    const date = new Date(order.createdAt).toLocaleDateString('th-TH');
    const dateMatch = date.includes(searchTerm);
    return orderIdMatch || dateMatch;
  });

  console.log('Filtered Orders:', filteredOrders); // Debugging log

  // Calculate pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  console.log(`Current Page: ${currentPage}, Orders Per Page: ${ordersPerPage}`);
  console.log('Current Orders:', currentOrders);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="w-full bg-white shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-4 flex items-center">
        <ClipboardList className="text-[#5abd4f]" />
        <h1 className="text-[#5abd4f] text-xl font-bold ml-2">Orders In</h1>
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <Search className="text-gray-400 absolute top-2.5 left-4" />
          <input
            type="text"
            placeholder="Search Order"
            className="pl-12 pr-4 py-2 w-full border rounded-full focus:outline-none focus:ring-2 focus:ring-[#5abd4f]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Loading, Error, or Orders List */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <span className="loading loading-ball loading-lg"></span>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center p-4">{error}</div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center p-4 text-gray-500">No orders found.</div>
      ) : (
        <>
          <div className="divide-y divide-gray-200">
            {currentOrders.map((order) => (
              <div
                key={order.id}
                className={`flex items-center justify-between p-4 cursor-pointer ${
                  order.isPickUpped ? 'bg-blue-100' : order.paymentStatus === 'COMPLETED' ? 'bg-green-100' : ''
                }`}
                onClick={() => selectOrder(order)}
              >
                <div>
                  <div className="text-xl font-semibold">Order #{order.id}</div>
                  <div className="text-xs text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString('th-TH')} {new Date(order.createdAt).toLocaleTimeString('th-TH')}
                  </div>
                </div>
                <div
                  className={`text-xl font-semibold ${
                    order.isPickUpped ? 'text-blue-500' : order.paymentStatus === 'COMPLETED' ? 'text-[#5abd4f]' : 'text-[#ff5722]'
                  }`}
                >
                  ฿{parseFloat(order.totalPrice).toLocaleString()}
                </div>
                <button className="bg-[#5abd4f] text-white rounded-full p-2">
                  <ChevronRight />
                </button>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center p-4">
            <button
              className={`btn btn-sm ${currentPage === 1 ? 'btn-disabled' : 'btn-primary'}`}
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className={`btn btn-sm ${currentPage === totalPages ? 'btn-disabled' : 'btn-primary'}`}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderList;
