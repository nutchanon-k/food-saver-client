import React, { useEffect, useState } from 'react';
import { ChevronLeft, MapPin, Phone, Store } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../stores/cartStore';
import { placeOrderAPI } from '../API/placeOrderAPI';
import useUserStore from '../stores/userStore';

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const getCartData = useCartStore((state) => state.getCartData);
  const [orderDataFromCart, setOrderDataFromCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('CREDIT_CARD');
  const [isLoading, setIsLoading] = useState(false);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const result = await getCartData(user.id);
        setOrderDataFromCart(result);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCartData();
  }, [getCartData]);

  const calculateTotals = () => {
    const originalTotal = orderDataFromCart.data?.reduce((sum, item) => sum + item.product.originalPrice * item.quantity, 0);
    const discount = orderDataFromCart.data?.reduce((sum, item) => sum + (item.product.originalPrice - item.product.salePrice) * item.quantity, 0);
    const finalTotal = originalTotal - discount;

    return { original: originalTotal, discount, final: finalTotal };
  };

  const totals = calculateTotals();

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const orderItems = orderDataFromCart.data?.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        unitPrice: item.product.salePrice,
        name: item.product.name,
      }));

      const orderData = { paymentMethod, orderItems };
      const response = await placeOrderAPI(orderData);
      window.location.href = response.session_url;
    } catch (error) {
      console.error('Error placing order:', error.message || error);
    } finally {
      setIsLoading(false);
    }
  };
  // console.log(orderDataFromCart?.data[0].id)
  const rand = Math.floor(Math.random() * 1000);
  return (
    <div className="max-w-md mx-auto p-4 sm:p-6 lg:max-w-[850px]">
      <div className="flex items-center mb-4">
        <button onClick={() => navigate(-1)} className="p-2">
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold flex-1 text-center">Order Confirm</h1>
      </div>

      {/* Map and Restaurant Info */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
        <img src="https://i.postimg.cc/nr8YdhTm/image-116.png" alt="Map location" className="w-full" />
        <div className="p-4">
          <div className="flex items-start mb-4">
            <MapPin className="text-green-500 w-6 h-6 mr-2" />
            <div>
              <p className="font-semibold">Pick-up Address:</p>
              <p className="text-gray-600">35 อาคารวรรณสรณ์ ถ. พญาไท แขวงถนนพญาไท เขตราชเทวี กรุงเทพมหานคร 10400</p>
              <p className="font-semibold mt-2">Phone: <span className="text-gray-600">099-999-9999</span></p>
              <p className="font-semibold mt-2">Pick-up until: <span className="text-gray-600">19:00</span></p>
            </div>
          </div>

          {/* Order Items */}
          <div className="border-t border-gray-200">
            {orderDataFromCart?.data?.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="bg-green-500 text-white text-sm font-bold px-2 py-1 rounded-full mr-2">{item.quantity}x</div>
                  <img src={item.product.imageUrl} alt={item.product.name} className="w-16 h-16 rounded mr-4 object-cover" />
                  <span className="font-semibold">{item.product.name}</span>
                </div>
                <span className="font-semibold text-gray-700">฿{(item.product.salePrice * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Checkout Details */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <h2 className="text-xl font-bold mb-4">Checkout Details</h2>
        <div className="flex justify-between mb-2">
          <span className="font-semibold">Original price:</span>
          <span className="line-through text-gray-500">฿{totals.original?.toLocaleString()}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="font-semibold">Discount:</span>
          <span className="text-green-600">-฿{totals.discount?.toLocaleString()}</span>
        </div>
        <div className="flex justify-between border-t pt-3">
          <span className="font-bold">Total payment</span>
          <span className="text-[#ff5722] text-2xl font-bold">฿{totals.final?.toLocaleString()}</span>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <h3 className="text-xl font-bold mb-2">Payment Method</h3>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text font-semibold">Credit Card</span>
            <input
              type="radio"
              name="paymentMethod"
              value="CREDIT_CARD"
              checked={paymentMethod === 'CREDIT_CARD'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="radio checked:bg-green-500 ml-2"
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text font-semibold">PromptPay</span>
            <input
              type="radio"
              name="paymentMethod"
              value="PROMPTPAY"
              checked={paymentMethod === 'PROMPTPAY'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="radio checked:bg-blue-500 ml-2"
            />
          </label>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">

        <div className="flex justify-between mb-2">
          <span className="font-bold">Receiver</span>
          <span>{user?.firstName} {user?.lastName}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">Phone number</span>
          <span>{user?.phone}</span>
        </div>
      </div>

      {/* Confirm Button with Loading */}
      <div className="relative">
        <button
          onClick={handleSubmit}
          className="bg-[#5abd4f] text-white text-lg font-bold py-3 rounded-3xl w-full shadow-lg hover:bg-green-600 transition disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loading loading-dots loading-lg"></span>
          ) : (
            'Confirm Order'
          )}
        </button>
      </div>
    </div>
  );
};

export default ConfirmOrder;
