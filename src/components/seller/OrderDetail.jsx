import React from 'react';
import useSellerOrderStore from '../../stores/SellerOrderStore';







const OrderDetail = () => {
  const { selectedOrder, acceptOrder, fetchOrders } = useSellerOrderStore();

  console.log('Selected Order:', selectedOrder); // Debugging log

  if (!selectedOrder) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Select an order to see the details.</p>
      </div>
    );
  }

  const {
    id,
    createdAt,
    paymentMethod,
    user,
    orderItems,
    totalPrice,
    paymentStatus,
    isPickUpped,
  } = selectedOrder;

  // Disable the Accept button if the order is already picked up
  const isAcceptDisabled = isPickUpped || paymentStatus !== 'COMPLETED';

  const handleAccept = () => {
    if (window.confirm('Are you sure you want to mark this order as picked up?')) {
      acceptOrder(id);
    }
  };




  ///////////////////////////////////////////////////////////////////////////////////
  // Custom Component: Order Status Badge
const OrderStatusBadge = ({ status, isPickUpped }) => {
  let bgColor = 'bg-gray-100';
  let textColor = 'text-gray-600';

  if (isPickUpped) {
    bgColor = 'bg-blue-100';
    textColor = 'text-blue-600';
  } else if (status === 'COMPLETED') {
    bgColor = 'bg-green-100';
    textColor = 'text-green-600';
  }

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${bgColor} ${textColor}`}>
      {isPickUpped ? 'Picked Up' : status}
    </span>
  );
};

// Custom Component: User Information
const UserInfo = ({ user }) => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
    <img
      src={user?.profilePicture || 'https://placehold.co/50x50'}
      alt={`Profile of ${user?.firstName} ${user?.lastName}`}
      className="w-16 h-16 rounded-full"
    />
    <div className="space-y-1">
      <p className="font-bold">
        {user?.firstName} {user?.lastName}
      </p>
      <p className="text-sm text-gray-600">📱 {user?.phoneNumber}</p>
      <p className="text-sm text-gray-600">✉️ {user?.email}</p>
    </div>
  </div>
);

// Custom Component: Order Item
const OrderItem = ({ item }) => (
  <div className="flex flex-col md:flex-row items-start gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
    <div className="relative w-full md:w-auto">
      <div className="bg-[#5abd4f] font-semibold text-lg text-white rounded-full w-8 h-8 flex items-center justify-center absolute -left-2 -top-2 z-10">
        {item.quantity}x
      </div>
      <img
        src={item.product.imageUrl}
        alt={item.product.name}
        className="w-full md:w-[130px] h-[120px] md:h-[75px] rounded object-cover"
      />
    </div>
    <div className="flex-1 space-y-2">
      <p className="font-semibold text-lg">{item.product.name}</p>
      <div className="space-y-1 text-sm text-gray-600">
        <p>{item.product.store.storeName}</p>
        <p className="line-clamp-2">{item.product.store.storeAddress}</p>
        <p>📞 {item.product.store.phoneNumber}</p>
        <p>
          🕒 {new Date(item.product.store.timeOpen).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })} -{' '}
          {new Date(item.product.store.timeClose).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
    <div className="text-right font-semibold w-full md:w-auto">
      <p className="text-lg">฿{(parseFloat(item.unitPrice) * item.quantity).toLocaleString()}</p>
    </div>
  </div>
);




  return (

    <div className="w-full bg-white border border-gray-200 shadow-lg overflow-auto max-w-3xl mx-auto">
      {/* Header */}
      <div className="bg-[#5abd4f] text-white p-4 sticky top-0 z-10">
        <h1 className="text-xl font-bold">Order Detail</h1>
      </div>

      {/* Order Info Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="text-xl font-semibold">Order#{id}</h2>
              <OrderStatusBadge status={paymentStatus} isPickUpped={isPickUpped} />
            </div>
            <p className="text-sm text-gray-600">
              {new Date(createdAt).toLocaleString('th-TH')}
            </p>
            <p className="text-sm text-gray-600">💳 {paymentMethod}</p>
          </div>
          <UserInfo user={user} />
        </div>
      </div>

      {/* Order Items Section */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4">Items</h3>
        <div className="space-y-4">
          {orderItems?.map((item) => (
            <OrderItem key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Order Summary Section */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-base md:text-lg">
              Quantity ({orderItems?.reduce((sum, item) => sum + item.quantity, 0)} items)
            </p>
            <p className="font-semibold text-base md:text-lg">
              ฿{parseFloat(totalPrice).toLocaleString()}
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
            <p className="font-bold text-lg md:text-xl">Total Payment</p>
            <p className="text-[#ff5722] font-bold text-2xl md:text-3xl">
              ฿{parseFloat(totalPrice).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Action Button Section */}
      <div className="p-4 border-t border-gray-200 sticky bottom-0 bg-white">
        <button
          className={`w-full md:w-auto bg-[#5abd4f] text-white font-semibold py-3 md:py-2 px-6 rounded-full ${
            isAcceptDisabled 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-[#4caf50] active:scale-95 transition-transform'
          }`}
          onClick={handleAccept}
          disabled={isAcceptDisabled}
        >
          {isPickUpped ? 'Order Picked Up' : 'Mark as Picked Up'}
        </button>
      </div>
    </div>
    // <div className="w-full bg-white border border-gray-300 shadow-lg overflow-auto">
    //   {/* Header */}
    //   <div className="bg-[#5abd4f] text-white p-4">
    //     <h1 className="text-xl font-bold">Order Detail</h1>
    //   </div>

    //   {/* Order Info */}
    //   <div className="p-4 border-b border-gray-300 flex justify-between items-center">
    //     <div>
    //       <h2 className="text-xl font-semibold">Order#{id}</h2>
    //       <p>{new Date(createdAt).toLocaleString('th-TH')}</p>
    //       <p>Payment Method: {paymentMethod}</p>
    //       <p>Status: {paymentStatus}</p>
    //       <p>Picked Up: {isPickUpped ? 'Yes' : 'No'}</p>
    //     </div>
    //     <div className="flex items-center">
    //       <img
    //         src={user?.profilePicture || 'https://placehold.co/50x50'}
    //         alt={`Profile of ${user?.firstName} ${user?.lastName}`}
    //         className="w-16 h-16 rounded-full mr-2"
    //       />
    //       <div>
    //         <p className="font-bold">
    //           {user?.firstName} {user?.lastName}
    //         </p>
    //         <p>Phone: {user?.phoneNumber}</p>
    //         <p>Email: {user?.email}</p>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Order Items */}
    //   <div className="p-4">
    //     <h3 className="text-lg font-semibold mb-4">Items</h3>
    //     {orderItems?.map((item) => (
    //       <div key={item.id} className="flex items-center mb-6">
    //         <div className="relative">
    //           <div className="bg-[#5abd4f] font-semibold text-lg text-white rounded-full w-8 h-8 flex items-center justify-center absolute -left-4 -top-4">
    //             {item.quantity}x
    //           </div>
    //           <img
    //             src={item.product.imageUrl}
    //             alt={item.product.name}
    //             className="w-[130px] h-[75px] rounded mr-4 object-cover"
    //           />
    //         </div>
    //         <div className="flex-1">
    //           <p className="font-semibold">{item.product.name}</p>
    //           <p className="text-sm text-gray-500">{item.product.store.storeName}</p>
    //           <p className="text-sm text-gray-500">{item.product.store.storeAddress}</p>
    //           <p className="text-sm text-gray-500">Phone: {item.product.store.phoneNumber}</p>
    //           <p className="text-sm text-gray-500">
    //             Hours: {new Date(item.product.store.timeOpen).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })} -{' '}
    //             {new Date(item.product.store.timeClose).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}
    //           </p>
    //         </div>
    //         <div className="text-right font-semibold">
    //           <p>฿{(parseFloat(item.unitPrice) * item.quantity).toLocaleString()}</p>
    //         </div>
    //       </div>
    //     ))}
    //   </div>

    //   {/* Summary */}
    //   <div className="p-4 border-t border-gray-300">
    //     <div className="flex justify-between mb-2">
    //       <p className="font-bold text-xl">
    //         Quantity ({orderItems?.reduce((sum, item) => sum + item.quantity, 0)} items)
    //       </p>
    //       <p className="font-bold text-xl">฿{parseFloat(totalPrice).toLocaleString()}</p>
    //     </div>
    //     <div className="flex justify-between">
    //       <p className="font-bold text-xl">Total Payment</p>
    //       <p className="text-[#ff5722] font-bold text-3xl">฿{parseFloat(totalPrice).toLocaleString()}</p>
    //     </div>
    //   </div>

    //   {/* Accept Order Button */}
    //   <div className="p-4 border-t border-gray-300 flex justify-end">
    //     <button
    //       className={`bg-[#5abd4f] text-white font-semibold py-2 px-4 rounded-3xl ${
    //         isAcceptDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#4caf50]'
    //       }`}
    //       onClick={handleAccept}
    //       disabled={isAcceptDisabled}
    //     >
    //       {isPickUpped ? 'Order Picked Up' : 'Mark as Picked Up'}
    //     </button>
    //   </div>
    // </div>
  );
};

export default OrderDetail;
