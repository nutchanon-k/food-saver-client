// OrderSuccess.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import successAnimation from '../assets/icons/PaymentSuccess.json';
import useOrderStore from '../stores/OrderStore';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const orderDetails = useOrderStore((state) => state.orderDetails);

  useEffect(() => {
    if (!orderDetails) {
      navigate('/');
    }
  }, [orderDetails, navigate]);

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  const { id, totalPrice, paymentMethod, createdAt, orderItems, user } = orderDetails;
  const store = orderItems[0]?.product?.store;

  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Success Message Section */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left px-4">
          <div className="w-48 h-48 sm:w-64 sm:h-64 mx-auto lg:mx-0">
            <Lottie animationData={successAnimation} loop={false} />
          </div>
          <h2 className="text-primary text-2xl sm:text-3xl font-semibold mt-4">การชำระเงินสำเร็จ!</h2>
          <p className="text-neutral mt-2">
            ขอบคุณสำหรับการสั่งซื้อของคุณ การสั่งซื้อของคุณได้ถูกดำเนินการเรียบร้อยแล้ว รายละเอียดการสั่งซื้อของคุณอยู่ด้านล่างนี้:
          </p>
          <div className="w-full mt-6 lg:mt-8">
            <button
              onClick={() => navigate('/home')}
              className="btn btn-primary w-full text-white"
            >
              ช้อปปิ้งต่อ
            </button>
          </div>
        </div>

        {/* Order Details Section */}
        <div className="w-full lg:w-auto bg-white border border-gray-300 shadow-lg rounded-lg">
          <div className="bg-[#5abd4f] text-white p-4 rounded-t-lg">
            <h1 className="text-lg font-bold">Order Detail</h1>
          </div>
          <div className="p-4 border-b border-gray-300 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="mb-4 sm:mb-0">
              <h2 className="text-lg font-semibold">Order#{id}</h2>
              <p>{new Date(createdAt).toLocaleDateString('th-TH')}</p>
              <p>ช่องทางการชำระเงิน: {paymentMethod}</p>
            </div>
            <div className="flex items-center space-x-4">
              <img src={user.profilePicture || "https://www.google.com/imgres?q=profile%20picture%20asian&imgurl=https%3A%2F%2Fmedia.istockphoto.com%2Fid%2F1217962587%2Fphoto%2Fportrait-of-a-young-confident-smiling-asian-chinese-businessman.jpg%3Fs%3D612x612%26w%3D0%26k%3D20%26c%3D_2_An_UyM2EiLreTqEj3i8RciDlcSaRdvss6e1ZOqP8%3D&imgrefurl=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fasian-man-profile&docid=uKujsEfoKTx0zM&tbnid=-GYJjbGN-oq77M&vet=12ahUKEwj1o9_Jz9aJAxUXVWwGHcOhOxIQM3oECD4QAA..i&w=612&h=408&hcb=2&ved=2ahUKEwj1o9_Jz9aJAxUXVWwGHcOhOxIQM3oECD4QAA"} alt="Profile" className="w-14 h-14 rounded-full"/>
              <div className="text-sm">
                <p className="font-bold">{user.firstName} {user.lastName}</p>
                <p>เบอร์ : {user.phoneNumber}</p>
              </div>
            </div>
          </div>

          {/* Order Items Section */}
          <div className="p-4">
            {orderItems.map((item, index) => (
              <div key={index} className="flex items-center mb-4">
                <div className="relative">
                  <div className="bg-[#5abd4f] font-semibold text-sm sm:text-lg text-white rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center mr-4 absolute left-[-12px] top-[-12px]">
                    {item.quantity}x
                  </div>
                  <img src={item.product.imageUrl} alt={item.product.name} className="w-[90px] sm:w-[130px] h-[60px] sm:h-[75px] rounded mr-4"/>
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{item.product.name}</p>
                  <p className="text-sm text-gray-500">{item.product.description}</p>
                </div>
                <div className="text-right font-semibold">
                  <p>฿{(item.unitPrice * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Total Section */}
          <div className="p-4 border-t border-gray-300">
            <div className="flex justify-between mb-2 text-sm sm:text-base">
              <p className="font-bold">Quantity ({orderItems.reduce((sum, item) => sum + item.quantity, 0)} items)</p>
              <p className="font-bold">฿{totalPrice}</p>
            </div>
            <div className="flex justify-between text-lg sm:text-xl">
              <p className="font-bold">Total payment</p>
              <p className="text-[#ff5722] font-bold">฿{totalPrice}</p>
            </div>
          </div>

          {/* Store Details Section */}
          {store && (
            <div className="p-4 border-t border-gray-300">
              <h3 className="text-lg font-semibold mb-4">รายละเอียดร้านค้า</h3>
              <div className="text-sm mb-2">
                <span className="text-gray-600">ชื่อร้านค้า:</span> {store.storeName}
              </div>
              <div className="text-sm mb-2">
                <span className="text-gray-600">ที่อยู่:</span> {store.storeAddress}
              </div>
              <div className="text-sm mb-2">
                <span className="text-gray-600">เบอร์โทร:</span> {store.phoneNumber}
              </div>
              <div className="text-sm mb-2">
                <span className="text-gray-600">เปิด:</span> {store.timeOpen} - {store.timeClose}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
