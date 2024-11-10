// pages/VerifyPayment.jsx
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import usePaymentStore from '../stores/PaymentStore';
import useCartStore from '../stores/cartStore';

const VerifyPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const verifyOrder = usePaymentStore((state) => state.verifyOrder);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    const verifyPayment = async () => {
      const params = new URLSearchParams(location.search);
      const success = params.get('success');
      const orderIdString = params.get('orderId');

      // Parse orderId to integer
      const orderId = parseInt(orderIdString, 10);
      if (isNaN(orderId)) {
        console.error('Invalid orderId:', orderIdString);
        alert('Invalid order ID');
        return navigate('/order-failed');
      }

      console.log('Sending verification data:', { orderId, success });

      try {
        const verificationData = {
          orderId,
          success,
        };

        // Call the verifyOrder function from the store
        const response = await verifyOrder(verificationData);

        console.log('Verification response:', response);

        if (response.success) {
          // Payment successful
          clearCart(); // Clear the cart
          alert(response.message);
          navigate('/order-success');
        } else {
          // Payment failed or canceled
          alert(response.message);
          navigate('/order-failed');
        }
      } catch (error) {
        console.error('Error verifying payment:', error.message || error);
        alert('Error verifying payment');
        navigate('/order-failed');
      }
    };

    verifyPayment();
  }, [location, navigate, verifyOrder, clearCart]);

  return (
    <div>
      <h1>Verifying your payment...</h1>
    </div>
  );
};

export default VerifyPayment;
