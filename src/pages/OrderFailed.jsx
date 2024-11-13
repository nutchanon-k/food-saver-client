import React, { useState } from 'react';
import Lottie from 'lottie-react';
import failureAnimation from '../assets/icons/PaymetFail.json';
import { Link } from 'react-router-dom';
import Order from '../pages/Order';

const OrderFailed = () => {
  // State to manage collapse status
  const [isFailureMessageOpen, setFailureMessageOpen] = useState(true);
  const [isOrderDetailsOpen, setOrderDetailsOpen] = useState(true);

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl space-y-4">
        
        {/* Failure Message Section */}
        <div className="bg-white rounded-xl shadow-lg p-4">
          {/* Toggle Button */}
          <button
            onClick={() => setFailureMessageOpen(!isFailureMessageOpen)}
            className="flex justify-between items-center w-full text-left font-semibold text-lg text-error focus:outline-none"
          >
            <span>การชำระเงินล้มเหลวหรือถูกยกเลิก</span>
            <svg
              className={`w-5 h-5 transform ${isFailureMessageOpen ? "rotate-180" : ""}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </button>
          
          {/* Collapsible Content */}
          {isFailureMessageOpen && (
            <div className="flex flex-col items-center text-center p-4 space-y-4">
              <div className="w-32 h-32">
                <Lottie animationData={failureAnimation} loop={false} />
              </div>
              <p className="text-gray-600 ">
                ขออภัย การชำระเงินของคุณไม่สำเร็จ โปรดลองอีกครั้ง.
              </p>
              <Link
                to="/Home"
                className="btn btn-primary w-full md:w-auto px-6 py-3 text-white font-semibold transition-transform hover:scale-105"
              >
                ดูสินค้าอืน
              </Link>
            </div>
          )}
        </div>

        {/* Order Details Section */}
        <div className="bg-white rounded-xl shadow-lg p-4">
          {/* Toggle Button */}
          <button
            onClick={() => setOrderDetailsOpen(!isOrderDetailsOpen)}
            className="flex justify-between items-center w-full text-left font-semibold text-lg text-gray-700 focus:outline-none"
          >
            <span>Order Details</span>
            <svg
              className={`w-5 h-5 transform ${isOrderDetailsOpen ? "rotate-180" : ""}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </button>
          
          {/* Collapsible Content */}
          {isOrderDetailsOpen && (
            <div className="p-4 border-t mt-4">
              <Order />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderFailed;
