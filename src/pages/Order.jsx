import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 
import useCartStore from '../stores/cartStore';
import usePaymentStore from '../stores/PaymentStore'; // New store for payment
import { placeOrderAPI } from '../API/placeOrderAPI'; // New API file
import useUserStore from '../stores/userStore';


const Order = () => {
  const navigate = useNavigate(); 
  const getCartData = useCartStore((state) => state.getCartData);
  const clearCart = useCartStore((state) => state.clearCart);
  const [orderDataFromCart, setOrderDataFromCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('CREDIT_CARD'); // Default payment method
  const user = useUserStore((state) => state.user);

  // Fetch cart data
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const result = await getCartData();
        setOrderDataFromCart(result);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCartData();
  }, [getCartData]);

  // Calculate totals
  const calculateTotals = () => {
    const originalTotal = orderDataFromCart.data?.reduce((sum, item) => {
      return sum + item.product.originalPrice * item.quantity;
    }, 0);

    const discount = orderDataFromCart.data?.reduce((sum, item) => {
      return sum + (item.product.originalPrice - item.product.salePrice) * item.quantity;
    }, 0);

    const finalTotal = orderDataFromCart.data?.reduce((sum, item) => {
      return sum + item.product.salePrice * item.quantity;
    }, 0);

    return {
      original: originalTotal,
      discount: discount,
      final: finalTotal,
    };
  };

  const totals = calculateTotals();

  // Handle order submission
  const handleSubmit = async () => {
    try {
      const orderItems = orderDataFromCart.data?.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        unitPrice: item.product.salePrice,
        name: item.product.name,
      }));

      const orderData = {
        paymentMethod,
        orderItems,
      };

      const response = await placeOrderAPI(orderData);

      // Redirect to Stripe Checkout
      window.location.href = response.session_url;
    } catch (error) {
      console.error('Error placing order:', error.message || error);
      // Handle error appropriately, e.g., show a notification
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="px-4 py-4 flex items-center bg-white">
        <button className="p-2" onClick={() => navigate(-1)}>
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-xl font-medium flex-1 ml-2">Order Confirm</h1>
      </div>

      {/* Map Preview */}
      <div className="h-40 bg-gray-200">
        {/* Map placeholder */}
      </div>

      {/* Delivery Address */}
      <div className="bg-white p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-start space-x-2">
            <MapPin className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
            <div>
              <p className="text-gray-700">35 ถนนสารวจรังสรรค์ ก. พญาไท...</p>
              <div className="flex items-center text-gray-500 mt-1">
                <Phone className="w-4 h-4 mr-1" />
                <span>099-999-9999</span>
              </div>
              <p className="text-gray-500">รับอาหารได้ที่เวลา: 18:00 น.</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Order Items */}
      <div className="mt-4 bg-white p-4">
        <div className="space-y-4">
          {orderDataFromCart?.data?.map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <img
                src={item.product.imageUrl}
                alt={`${item.product.name}`}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.product.name}</h3>
                <div className="flex items-center mt-2">
                  <div className="flex items-center space-x-1 bg-gray-100 rounded-lg px-2 py-1">
                    <span className="text-gray-500 text-sm">Quantity: {item.quantity}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-1">
                <div className="flex flex-col items-end">
                  <span className="text-sm text-gray-500 line-through">
                    ฿{item.product.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-red-600 font-medium">
                    ฿{item.product.salePrice.toLocaleString()}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  Total: ฿{(item.product.salePrice * item.quantity).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Checkout Details */}
      <div className="mt-4 bg-white p-4">
        <h2 className="font-medium mb-4">Checkout Details</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Original price:</span>
            <div className="flex flex-col items-end">
              <span className="line-through text-gray-500">
                ฿{totals.original?.toLocaleString()}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Discount:</span>
            <span className="text-green-600">-฿{totals.discount?.toLocaleString()}</span>
          </div>
          <div className="border-t pt-3 flex justify-between font-medium">
            <span>Total payment</span>
            <span className="text-orange-500 text-lg">฿{totals.final?.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="mt-4 bg-white p-4">
        <h3 className="font-medium mb-2">Payment Method</h3>
        <div className="flex flex-col space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="CREDIT_CARD"
              checked={paymentMethod === 'CREDIT_CARD'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="form-radio text-green-500"
            />
            <span className="ml-2">Credit Card</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="PROMPTPAY"
              checked={paymentMethod === 'PROMPTPAY'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="form-radio text-green-500"
            />
            <span className="ml-2">PromptPay</span>
          </label>
        </div>
      </div>

      {/* Order Details */}
      <div className="mt-4 bg-white p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Receiver</span>
          <span>
            {user?.firstName} {user?.lastName}
          </span>
        </div>
      </div>

      {/* Confirm Button */}
      <div className="p-4">
        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 text-white py-3 rounded-lg font-medium"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default Order;
