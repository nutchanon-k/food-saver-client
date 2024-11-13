// import React from 'react';
// import OrderList from '../../components/seller/OrderList';
// import OrderDetail from '../../components/seller/OrderDetail';

// const ManageOrder = () => {
//   return (
//     <div className="flex flex-col lg:flex-row justify-center items-start h-screen w-full bg-gray-50 p-4">
//       <div className="lg:w-1/3 w-full lg:mr-4">
//         <OrderList />
//       </div>
//       <div className="lg:w-2/3 w-full lg:ml-4 mt-4 lg:mt-0">
//         <OrderDetail />
//       </div>
//     </div>
//   );
// };

// export default ManageOrder;

import React, { useState } from 'react';
import OrderList from '../../components/seller/OrderList';
import OrderDetail from '../../components/seller/OrderDetail';
import useSellerOrderStore from '../../stores/SellerOrderStore';
import { ChevronLeft } from 'lucide-react';

const ManageOrder = () => {
  const { selectedOrder } = useSellerOrderStore();
  const [showList, setShowList] = useState(true);

  // Effect to handle view switching based on selection
  React.useEffect(() => {
    if (selectedOrder) {
      setShowList(false);
    }
  }, [selectedOrder]);

  const handleBack = () => {
    setShowList(true);
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-start min-h-screen w-full bg-gray-50 p-4 gap-4">
      {/* Mobile Back Button */}
      {!showList && selectedOrder && (
        <button
          onClick={handleBack}
          className="lg:hidden flex items-center gap-2 text-[#5abd4f] font-medium mb-4 hover:text-[#4caf50] transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Orders
        </button>
      )}

      {/* Order List Section */}
      <div 
        className={`lg:w-1/3 w-full transition-all duration-300 ease-in-out
          ${!showList && selectedOrder ? 'hidden lg:block' : 'block'}`}
      >
        <OrderList />
      </div>

      {/* Order Detail Section */}
      <div 
        className={`lg:w-2/3 w-full transition-all duration-300 ease-in-out
          ${showList && !selectedOrder ? 'hidden lg:block' : 'block'}`}
      >
        <OrderDetail />
      </div>
    </div>
  );
};

export default ManageOrder;
