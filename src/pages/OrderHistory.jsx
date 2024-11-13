import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useOrderStore from '../stores/OrderStore';
import useUserStore from '../stores/userStore';
import { CSSTransition } from 'react-transition-group';

const PAGE_SIZE = 10; // Number of orders per page

const OrderHistory = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openOrderIds, setOpenOrderIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const orderHistory = useOrderStore((state) => state.orderHistory);
  const fetchOrderHistory = useOrderStore((state) => state.fetchOrderHistory);
  const userId = useUserStore((state) => state.user?.id);

  useEffect(() => {
    const loadOrderHistory = async () => {
      if (!userId) {
        setError("User ID not found. Please log in again.");
        navigate('/login');
        return;
      }
      try {
        await fetchOrderHistory(userId);
        setLoading(false);
      } catch (e) {
        setError("Failed to fetch order history. Please try again later.");
        setLoading(false);
      }
    };
    loadOrderHistory();
  }, [fetchOrderHistory, navigate, userId]);

  const toggleOrderDetails = (orderId) => {
    setOpenOrderIds((prev) =>
      prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]
    );
  };

  const totalPages = Math.ceil(orderHistory.length / PAGE_SIZE);
  const currentOrders = useMemo(() => {
    const startIdx = (currentPage - 1) * PAGE_SIZE;
    return orderHistory.slice(startIdx, startIdx + PAGE_SIZE);
  }, [orderHistory, currentPage]);

  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePreviousPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  const formatDateTime = (date) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // 24-hour format
    };
    return new Date(date).toLocaleString('th-TH', options);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'COMPLETED':
        return <span className="badge bg-green-500 text-white">Completed</span>;
      case 'PENDING':
        return <span className="badge bg-yellow-500 text-white">Pending</span>;
      case 'CANCELLED':
        return <span className="badge bg-red-500 text-white">Cancelled</span>;
      default:
        return <span className="badge bg-error text-white">{status}</span>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-8">Order History</h1>

      {currentOrders.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>No past orders found.</p>
        </div>
      ) : (
        <div className="w-full max-w-5xl space-y-6">
          {currentOrders.map((order) => {
            const isOrderOpen = openOrderIds.includes(order.id);
            return (
              <div key={order.id} className="w-full bg-white border border-gray-300 shadow-md rounded-lg">
                
                {/* Toggle Button for Order Details */}
                <button
                  onClick={() => toggleOrderDetails(order.id)}
                  className="w-full flex justify-between items-center bg-[#5abd4f] text-white p-5 rounded-t-lg hover:bg-[#4caf50] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  aria-expanded={isOrderOpen}
                  aria-controls={`order-details-${order.id}`}
                >
                  <div>
                    <h2 className="text-xl font-semibold">Order #{order.id}</h2>
                    <p className="text-sm">{formatDateTime(order.createdAt)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(order.paymentStatus)}
                    <svg
                      className={`w-6 h-6 transform transition-transform duration-300 ${isOrderOpen ? "rotate-180" : ""}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </button>

                {/* Collapsible Order Details */}
                <CSSTransition in={isOrderOpen} timeout={300} classNames="fade" unmountOnExit>
                  <div id={`order-details-${order.id}`} className="p-5 border-b border-gray-300">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="text-lg font-bold">Total Payment: ฿{parseFloat(order.totalPrice).toLocaleString()}</p>
                        <p>Status: {order.paymentStatus}</p>
                      </div>
                      {/* Conditionally render Accept Order button */}
                      {!order.isPickUpped && order.paymentStatus === 'COMPLETED' }
                    </div>

                    {/* Order Items */}
                    <div className="space-y-4">
                      {order.orderItems.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4">
                          <div className="relative">
                            <div className="bg-[#5abd4f] text-white text-xs font-semibold rounded-full w-6 h-6 flex items-center justify-center absolute -left-3 -top-3">
                              {item.quantity}x
                            </div>
                            <img
                              src={item.product.imageUrl}
                              alt={item.product.name}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-md font-semibold">{item.product.name}</p>
                            <p className="text-sm text-gray-500">{item.product.store.storeName}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-md font-semibold">฿{(item.unitPrice * item.quantity).toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Store Details and Payment Method */}
                    {order.orderItems[0]?.product.store && (
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">Store Details</h3>
                        <p className="text-sm">Store: {order.orderItems[0].product.store.storeName}</p>
                        <p className="text-sm">Address: {order.orderItems[0].product.store.storeAddress}</p>
                        <p className="text-sm">Phone: {order.orderItems[0].product.store.phoneNumber}</p>
                        <p className="text-sm">
                          Hours: {order.orderItems[0].product.store.timeOpen} - {order.orderItems[0].product.store.timeClose}
                        </p>
                        <p className="text-sm mt-4 font-semibold">Payment Method: {order.paymentMethod}</p>
                      </div>
                    )}
                  </div>
                </CSSTransition>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex items-center space-x-4 mt-8">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`btn ${currentPage === 1 ? 'btn-disabled' : 'btn-primary'} flex items-center space-x-2`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M12.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 111.414 1.414L9.414 10l3.293 3.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          <span>Previous</span>
        </button>

        <span className="text-lg font-semibold">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`btn ${currentPage === totalPages ? 'btn-disabled' : 'btn-primary'} flex items-center space-x-2`}
        >
          <span>Next</span>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M7.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 11-1.414-1.414L10.586 10 7.293 6.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default OrderHistory;
