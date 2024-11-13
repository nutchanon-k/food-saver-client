import React, { useEffect, useState } from 'react';
import { CircleX, Plus, Minus, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import emptyCartAnimation from '../assets/icons/emptyCart.json';
import useUserStore from '../stores/userStore';
import useCartStore from '../stores/cartStore';

const Cart = () => {
  const navigate = useNavigate();
  const getCartData = useCartStore((state) => state.getCartData);
  const ChangeQuantityItem = useCartStore((state) => state.ChangeQuantityItem);
  const DeleteCartItem = useCartStore((state) => state.DeleteCartItem);
  const token = useUserStore((state) => state.token);
  const [resultGetCartData, setResultGetCartData] = useState(null); // Initialize as null
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isTimeUpModalOpen, setIsTimeUpModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(null); // For delete confirmation

  useEffect(() => {
    const loadCart = async () => {
      try {
        await CurrentCart(token);
      } catch (error) {
        console.error('Error loading cart:', error);
      } finally {
        setLoading(false); // Ensure loading is set to false regardless of success or error
      }
    };
    loadCart();
  }, [token]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsTimeUpModalOpen(true);
    }
  }, [timeLeft]);

  const CurrentCart = async (token) => {
    try {
      const response = await getCartData(token);
      if (response && response.data) {
        setResultGetCartData(response);
      } else {
        setResultGetCartData(null); // Set to null if no data to trigger empty cart message
      }
    } catch (err) {
      console.error('Error fetching cart:', err);
      setResultGetCartData(null); // Ensure it’s null on error to trigger empty state
    } finally {
      setLoading(false); // Always set loading to false once fetch is complete
    }
  };

  const DecreaseCartItem = async (itemId, quantity) => {
    if (quantity > 1) {
      quantity = quantity - 1;
      await ChangeQuantityItem(itemId, quantity);
      CurrentCart(token);
    }
  };

  const IncreaseCartItem = async (itemId, quantity, storeQuantity) => {
    if (quantity < storeQuantity) {
      quantity = quantity + 1;
      await ChangeQuantityItem(itemId, quantity);
      CurrentCart(token);
    }
  };

  const hdlDeleteCartItem = async (itemId) => {
    try {
      await DeleteCartItem(itemId);
      const newCart = await getCartData(token);
      console.log(newCart)
      if (newCart && newCart.data) {
        setResultGetCartData(newCart);
      } else {
        setResultGetCartData(null); // Set to null if no data after deletion
      }
    } catch (err) {
      console.error('Error deleting item:', err);
      setResultGetCartData(null); // Reset to trigger empty state on failure
    } finally {
      CurrentCart(token);; // Always set loading to false once fetch is complete
    }
  };

  const confirmDelete = (itemId) => {
    setDeleteModal(itemId); // Set item for deletion
  };

  const handleDeleteConfirm = async () => {
    if (deleteModal) {
      await hdlDeleteCartItem(deleteModal);
      setDeleteModal(null);
      
    }
  };

  const calculateTotals = () => {
    const originalTotal = resultGetCartData?.data?.reduce((sum, item) => {
      return sum + item.product.originalPrice * item.quantity;
    }, 0);

    const finalTotal = resultGetCartData?.data?.reduce((sum, item) => {
      return sum + item.product.salePrice * item.quantity;
    }, 0);

    const discount = originalTotal - finalTotal;
    const totalItems = resultGetCartData?.data?.reduce((sum, item) => {
      return sum + item.quantity;
    }, 0);

    return {
      original: originalTotal || 0,
      discount: discount || 0,
      final: finalTotal || 0,
      totalItems: totalItems || 0,
    };
  };

  const totals = calculateTotals();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-4xl mx-auto p-4 flex items-center">
          <button onClick={() => navigate(-1)} className="text-gray-600 mr-4">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold flex-1">Cart</h1>
          <div className="flex items-center">
            <div className="grid grid-flow-col gap-2 text-center auto-cols-max">
              <div className="flex flex-col">
                <span
                  className={`countdown font-mono text-xl ${
                    timeLeft < 60 ? "text-red-500" : "text-green-600"
                  }`}
                >
                  <span style={{ "--value": Math.floor(timeLeft / 60) }}></span>
                </span>
                min
              </div>
              <div className="flex flex-col">
                <span
                  className={`countdown font-mono text-xl ${
                    timeLeft < 60 ? "text-red-500" : "text-green-600"
                  }`}
                >
                  <span style={{ "--value": timeLeft % 60 }}></span>
                </span>
                sec
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Items */}
      <div className="max-w-4xl mx-auto p-4 bg-white shadow rounded mt-4">
        {loading ? (
          <div className="flex justify-center">
            <span className="loading loading-dots loading-lg"></span>
          </div>
        ) : !resultGetCartData?.data || resultGetCartData.data.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Lottie
              animationData={emptyCartAnimation}
              loop={true}
              style={{ width: 250, height: 250 }}
            />
            <p className="text-gray-500 mt-6 text-lg">
              Your cart is empty. Please go back and add items to the cart.
            </p>
            <button
              onClick={() => navigate("/Home")}
              className="mt-6 btn btn-primary"
            >
              Go to Shop
            </button>
          </div>
        ) : (
          resultGetCartData?.data?.map((item) => (
            <div
              key={item.id}
              className="flex items-center p-4 bg-white shadow-md rounded-lg mb-4"
            >
              {/* Product Image */}
              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                className="w-16 h-16 sm:w-40 sm:h-20 rounded-md object-cover mr-4"
              />
              {/* Product Details */}
              <div className="flex-1">
                <h2 className="text-sm sm:text-md font-bold">
                  {item.product.name}
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 line-clamp-1">
                  {item.product.description}
                </p>
                <div className="flex items-center mt-1">
                  <span className="text-green-600 font-semibold text-sm sm:text-base">
                    {item.product.salePrice} ฿
                  </span>
                  <span className="text-gray-400 line-through ml-2 text-xs sm:text-sm">
                    {item.product.originalPrice} ฿
                  </span>
                  <span className="ml-4 text-gray-600 text-sm sm:text-base">
                    Total: {(item.product.salePrice * item.quantity).toFixed(2)}{" "}
                    ฿
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  Remaining: {item.product.quantity} units
                </span>
              </div>

              {/* Quantity Control */}
              <div className="flex items-center space-x-1 sm:space-x-2 ml-2 sm:ml-4">
                <button
                  onClick={() => DecreaseCartItem(item.id, item.quantity)}
                  className="text-gray-400 border border-gray-300 rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center"
                >
                  <Minus size={14} />
                </button>
                <span className="text-sm sm:text-lg">{item.quantity}</span>
                <button
                  onClick={() =>
                    IncreaseCartItem(
                      item.id,
                      item.quantity,
                      item.product.quantity
                    )
                  }
                  className="text-gray-400 border border-gray-300 rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center"
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => confirmDelete(item.id)}
                className="text-red-500 ml-2 sm:ml-4"
              >
                <CircleX size={20} />
              </button>
            </div>
          ))
        )}

        {/* Total Summary */}
        {totals.totalItems > 0 && (
          <div className="mt-4">
            <div className="flex justify-between font-semibold text-lg">
              <span>Quantity ({totals.totalItems} items)</span>
              <span>{totals.original.toFixed(2)} ฿</span>
            </div>
            <div className="flex justify-between mt-2 font-semibold text-lg">
              <span>Total Discount</span>
              <span className="text-green-500 bg-green-100 px-2 py-1 rounded-lg">
                - {totals.discount.toFixed(2)} ฿
              </span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-lg font-semibold">Total payment</span>
              <span className="text-2xl font-bold text-[#ff5722]">
                {totals.final.toFixed(2)} ฿
              </span>
            </div>
            <div className="flex justify-end">
              <button
                className={`w-full sm:w-48 py-2 rounded-3xl mt-4 ${
                  totals.totalItems === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#5abd4f] text-white"
                }`}
                onClick={() => totals.totalItems > 0 && navigate("/order")}
                disabled={totals.totalItems === 0}
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Time Up Modal */}
      {isTimeUpModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 animate-fade-in">
          <div className="bg-white p-6 rounded shadow-md">
            <h3 className="font-bold text-lg">หมดเวลาการสั่งซื้อ</h3>
            <p className="py-4">คุณไม่ได้ทำรายการภายในเวลาที่กำหนด</p>
            <div className="text-right">
              <button
                className="bg-primary text-white px-4 py-2 rounded"
                onClick={() => {
                  setIsTimeUpModalOpen(false);
                  navigate(-1);
                }}
              >
                กลับไปก่อนหน้า
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <p>Are you sure you want to delete this item?</p>
            <div className="flex justify-center space-x-4 mt-4">
              <button
                onClick={() => setDeleteModal(null)}
                className="px-4 py-2 rounded bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 rounded bg-red-500 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
