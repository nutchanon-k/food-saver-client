import React from "react";
import OrderList from "../../components/seller/OrderList";
import OrderDetail from "../../components/seller/OrderDetail";


const ManageOrder = () => {
  return (
    <div className="justify-center flex h-screen w-full">
      <OrderList />
      <OrderDetail />
    </div>
  );
};

export default ManageOrder;
