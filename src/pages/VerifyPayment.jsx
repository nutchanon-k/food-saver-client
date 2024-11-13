// VerifyPayment.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import usePaymentStore from '../stores/PaymentStore';
import useCartStore from '../stores/cartStore';
import useOrderStore from '../stores/OrderStore';

const VerifyPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const verifyOrder = usePaymentStore((state) => state.verifyOrder);
  const clearCart = useCartStore((state) => state.clearCart);
  const fetchAndSetOrderDetails = useOrderStore((state) => state.fetchAndSetOrderDetails);
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  useEffect(() => {
    const verifyPayment = async () => {
      const params = new URLSearchParams(location.search);
      const success = params.get('success');
      const orderIdString = params.get('orderId');
      const orderId = parseInt(orderIdString, 10);

      if (isNaN(orderId)) {
        console.error('Invalid orderId:', orderIdString);
        showAlert('Invalid order ID', 'error');
        return navigate('/order-failed');
      }

      try {
        const response = await verifyOrder({ orderId, success });

        if (response.success) {
          clearCart();
          showAlert(response.message, 'success');
          await fetchAndSetOrderDetails(orderId); // Ensure this is fetched before navigation
          navigate('/order-success');
        } else {
          showAlert(response.message, 'error');
          setTimeout(() => navigate('/order-failed'), 3000);
        }
      } catch (error) {
        console.error('Error verifying payment:', error);
        showAlert('Error verifying payment', 'error');
        setTimeout(() => navigate('/order-failed'), 3000);
      }
    };

    verifyPayment();
  }, [location, navigate, verifyOrder, clearCart, fetchAndSetOrderDetails]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center px-4">
      <div className="flex flex-col items-center space-y-4">
        <span className="loading loading-spinner loading-lg text-green-500"></span>
        <h1 className="text-2xl font-semibold text-gray-700">Verifying your payment...</h1>
        <p className="text-gray-500">Please wait a moment while we confirm your transaction.</p>
      </div>
      {alert && (
        <div
          className={`alert alert-${alert.type} bg-yellow-500 fixed top-4 left-1/2 transform -translate-x-1/2 w-3/4 max-w-md shadow-lg`}
        >
          <span>{alert.message}</span>
        </div>
      )}
    </div>
  );
};

export default VerifyPayment;
























// pages/VerifyPayment.jsx
// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import usePaymentStore from '../stores/PaymentStore';
// import useCartStore from '../stores/cartStore';
// import useOrderStore from '../stores/OrderStore'; // Import the order store

// const VerifyPayment = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const verifyOrder = usePaymentStore((state) => state.verifyOrder);
//   const clearCart = useCartStore((state) => state.clearCart); // Keep clearCart as intended
//   const fetchAndSetOrderDetails = useOrderStore((state) => state.fetchAndSetOrderDetails); // Fetch order details from store
//   const clearOrderDetails = useOrderStore((state) => state.clearOrderDetails); // Optional: clear order details
//   const [alert, setAlert] = useState(null); // State to manage custom alert

//   const showAlert = (message, type = 'success') => {
//     setAlert({ message, type });
//     setTimeout(() => setAlert(null), 3000); // Auto-hide alert after 3 seconds
//   };

//   useEffect(() => {
//     const verifyPayment = async () => {
//       const params = new URLSearchParams(location.search);
//       const success = params.get('success');
//       const orderIdString = params.get('orderId');

//       // Parse orderId to integer
//       const orderId = parseInt(orderIdString, 10);
//       if (isNaN(orderId)) {
//         console.error('Invalid orderId:', orderIdString);
//         showAlert('Invalid order ID', 'error'); // Display error alert
//         return navigate('/order-failed');
//       }

//       console.log('Sending verification data:', { orderId, success });

//       try {
//         const verificationData = {
//           orderId,
//           success,
//         };

//         // Call the verifyOrder function from the store
//         const response = await verifyOrder(verificationData);

//         console.log('Verification response:', response);

//         if (response.success) {
//           // Payment successful
//           clearCart(); // Clear the cart
//           showAlert(response.message, 'success'); // Display success alert
          
//           console.log('Order ID being fetched:', orderId);
//           // Fetch and set order details in the store
//           await fetchAndSetOrderDetails(orderId);
//           console.log('Order details set in store:', useOrderStore.getState().orderDetails);
//           // Navigate to OrderSuccess page immediately after fetching order details
//           navigate('/order-success');
//         } else {
//           // Payment failed or canceled
//           showAlert(response.message, 'error'); // Display error alert
//           setTimeout(() => navigate('/order-failed'), 3000);
//         }
//       } catch (error) {
//         console.error('Error verifying payment:', error.message || error);
//         showAlert('Error verifying payment', 'error'); // Display error alert
//         setTimeout(() => navigate('/order-failed'), 3000);
//       }
//     };

//     verifyPayment();

//     // Optional: Clear order details on component unmount to ensure no stale data
//     return () => {
//       clearOrderDetails();
//     };
//   }, [location, navigate, verifyOrder, clearCart, fetchAndSetOrderDetails, clearOrderDetails]);

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center px-4">
//       <div className="flex flex-col items-center space-y-4">
//         <span className="loading loading-spinner loading-lg text-green-500"></span>
//         <h1 className="text-2xl font-semibold text-gray-700">Verifying your payment...</h1>
//         <p className="text-gray-500">Please wait a moment while we confirm your transaction.</p>
//       </div>

//       {/* DaisyUI Alert Notification */}
//       {alert && (
//         <div
//           className={`alert alert-${alert.type} bg-yellow-500 fixed top-4 left-1/2 transform -translate-x-1/2 w-3/4 max-w-md shadow-lg`}
//         >
//           <span>{alert.message}</span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VerifyPayment;
