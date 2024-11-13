import React from 'react';
import OrderList from '../../components/seller/OrderList';
import OrderDetail from '../../components/seller/OrderDetail';

const ManageOrder = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-start h-screen w-full bg-gray-50 p-4">
      <div className="lg:w-1/3 w-full lg:mr-4">
        <OrderList />
      </div>
      <div className="lg:w-2/3 w-full lg:ml-4 mt-4 lg:mt-0">
        <OrderDetail />
      </div>
    </div>
  );
};

export default ManageOrder;
