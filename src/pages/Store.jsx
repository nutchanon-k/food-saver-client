import React, { useEffect, useState } from "react";
import {
  ChevronRight,
  Clock,
  Heart,
  Info,
  Minus,
  Plus,
  ShoppingCart,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/icons/FoodLoading.json";
import useStoreForUser from "../stores/StoreforUser";
import useCartStore from "../stores/CartStore";
import useUserStore from "../stores/userStore";

const Store = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const [storeData, setStoreData] = useState(null); // Changed to null for loading state
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [liked, setLiked] = useState(false); // Heart animation toggle
  const getStoreData = useStoreForUser((state) => state.getStoreData);
  const addCartData = useCartStore((state) => state.addCartData);
  const ChangeQuantityItem = useCartStore((state) => state.ChangeQuantityItem);
  const getCartData = useCartStore((state) => state.getCartData);
  const DeleteCartItem = useCartStore((state) => state.DeleteCartItem);
  const [warning, setWarning] = useState(null); // To hold the product ID for which the warning is shown
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    StoreData();
    CartData();
  }, [storeId]);

  const CartData = async () => {
    try {
      // console.log("user id ", user?.id);
      const result = await getCartData(user?.id);
      console.log(result, "data in cart");
      if (result?.data) {
        setCartData(result.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const StoreData = async () => {
    try {
      const result = await getStoreData(storeId);
      if (result?.data) {
        const targetStore = result.data.find(
          (store) => store.id === parseInt(storeId)
        );
        if (targetStore) setStoreData(targetStore);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setTimeout(() => setLoading(false), 2500); // Adds a 1.5-second delay before hiding the loading state;
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    const hour = timeString.split("T")[1].split(":")[0];
    return `${hour.padStart(2, "0")}:00`;
  };

  const Increment = async (productId, quantity) => {
    const cartItem = cartData.find((cart) => cart.productId === productId);
    const currentQuantity = cartItem ? cartItem.quantity : 0;

    if (currentQuantity < quantity) {
      // if (cartItem) {
      //   await ChangeQuantityItem(cartItem.id, currentQuantity + 1);
      //   setCartData((prev) =>
      //     prev.map((item) =>
      //       item.productId === productId
      //         ? { ...item, quantity: currentQuantity + 1 }
      //         : item
      //     )
      //   );
      // } else {
      await addCartData(productId, 1);
      CartData();
      // if(!cartItem){
      //   setCartData((prev) => [...prev, { productId, quantity: 1 }]);
      // }
      // setCartData((prev) =>
      //   prev.map((item) =>
      //     item.productId === productId
      //       ? { ...item, quantity: currentQuantity + 1 }
      //       : item
      //   )
      // );

      setWarning(null); // Clear any existing warning if increment is successful
    } else {
      setWarning(productId); // Set warning for this product
    }
  };

  const Decrement = async (productId) => {
    const cartItem = cartData.find((cart) => cart.productId === productId);
    if (!cartItem) return; // Early return if item not found

    if (cartItem.quantity > 1) {
      // Decrement quantity
      await ChangeQuantityItem(cartItem.id, cartItem.quantity - 1);
      setCartData((prev) =>
        prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: cartItem.quantity - 1 }
            : item
        )
      );
    } else {
      // Remove item if quantity is 1
      await DeleteCartItem(cartItem.id);
      setCartData((prev) =>
        prev.filter((item) => item.productId !== productId)
      );
    }
  };

  const handleLike = () => {
    setLiked(!liked); // Toggle liked state for heart animation
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Lottie
          animationData={loadingAnimation}
          loop={true}
          className="w-56 h-56"
        />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto bg-white min-h-screen pb-20">
      {/* Header Image */}
      <div className="relative h-64 md:h-72">
        <img
          src={storeData?.profilePicture || "/api/placeholder/400/320"}
          alt="restaurant cover"
          className="w-full h-full object-cover rounded-b-lg"
        />
        <button
          className={`absolute top-4 right-4 p-2 bg-white rounded-full shadow hover:bg-gray-100 transition-transform ${liked ? "scale-125" : ""
            }`}
          onClick={handleLike}
        >
          <Heart
            className={`w-6 h-6 ${liked ? "text-red-500 fill-current" : "text-gray-600"
              }`}
          />
        </button>
      </div>

      {/* Restaurant Info */}
      <div className="p-4 border-b">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">{storeData.storeName}</h1>
            <p className="text-gray-700">{storeData.storeAddress}</p>
            <p className="italic text-gray-500">{storeData.storeDetails}</p>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>
                Open: {formatTime(storeData.timeOpen)} -{" "}
                {formatTime(storeData.timeClose)}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>35 km away</span>
              <span>•</span>
              <span>99+ orders</span>
            </div>
            <p className="font-medium">Phone: {storeData.phoneNumber}</p>
          </div>
          <button className="btn btn-outline btn-circle mt-4 md:mt-0">
            <Info className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Status and Rating */}
        <div className="flex items-center space-x-2 mt-4 text-sm">
          <span className="badge badge-success text-sm">
            {storeData.status}
          </span>
          <span>•</span>
          <span className="text-yellow-500 font-medium">
            4.8 (1.2k reviews)
          </span>
        </div>
      </div>
      {/* Restaurant Info */}
      {/* <div className="p-4 border-b">
                <div className="flex justify-between items-start">
                    <div className="space-y-2">
                        <h1 className="text-xl font-bold">{storeData.storeName}</h1>
                        <div className="flex flex-col space-y-1 text-sm text-gray-600">
                            <p className="text-gray-700">{storeData.storeAddress}</p>
                            <p className="text-gray-600 italic">{storeData.storeDetails}</p>
                            <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4" />
                                <span>เวลาทำการ: {storeData.timeOpen} - {storeData.timeClose} น.</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="line-clamp-1">35 กิโลเมตรจากคุณ</span>
                                <span>•</span>
                                <span>95+ orders</span>
                            </div>
                            <p className="font-medium">เบอร์โทร: {storeData.phoneNumber}</p>
                        </div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                        <Info className="w-6 h-6 text-gray-600" />
                    </button>
                </div> */}

      {/* Menu Items */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {storeData.products?.map((item) => {
            const cartItem = cartData.find(
              (cart) => cart.productId === item.id
            );
            return (
              <div
                key={item.id}
                className={`relative border rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 ${item.quantity === 0 ? " cursor-not-allowed" : ""
                  }`}
              >
                {/* "Out of Stock" overlay */}
                {item.quantity === 0 && (
                  <div className="absolute -bottom-20 inset-0 flex items-center justify-center z-10">
                    <span className="text-red-500 font-bold text-2xl">
                      สินค้าหมด
                    </span>
                  </div>
                )}

                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-48 rounded-lg object-cover"
                  style={{
                    filter: item.quantity === 0 ? "grayscale(100%)" : "none", // Add grayscale if out of stock
                  }}
                />
                <div className="flex flex-col justify-between mt-4">
                  <div>
                    <h3 className="font-medium text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <div>
                        <span className="text-gray-500 line-through text-sm">
                          ฿{item.originalPrice}
                        </span>
                        <span className="ml-2 text-red-500 font-semibold">
                          ฿{item.salePrice}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          In stock:{" "}
                          <span
                            className={`font-medium ${item.quantity === 0
                              ? "text-red-500"
                              : "text-orange-500"
                              }`}
                          >
                            {item.quantity}
                          </span>
                        </p>
                      </div>
                      <div className="flex items-center">
                        {/* Decrement button with red hover */}
                        <button
                          className="btn btn-sm btn-outline p-2 hover:bg-error hover:text-white"
                          onClick={() => Decrement(item.id)}
                          disabled={item.quantity === 0}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {cartItem ? cartItem.quantity : 0}
                        </span>

                        {/* Increment button with green hover */}
                        <button
                          className="btn btn-sm btn-outline p-2 hover:bg-primary hover:text-white"
                          onClick={() => Increment(item.id, item.quantity)}
                          disabled={item.quantity === 0}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Warning message if stock is exceeded */}
                    {warning === item.id && (
                      <p className="text-xs text-red-500 mt-1">
                        ⚠️ คุณสั่งสินค้าเกินจำนวนที่มีอยู่ในสต๊อก!
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fixed Cart Button with Floating Badge */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-10">
        <div className="flex items-center justify-between max-w-5xl mx-auto p-4">
          <div className="flex items-center space-x-3 relative">
            <ShoppingCart className="w-6 h-6 text-blue-600" />
            {/* <span className="absolute -top-2 -right-5 bg-red-500 text-white text-xs rounded-full px-2 py-1 "> */}
            {/* {cartData.reduce((total, item) => total + item.quantity, 0)} */}
            {/* </span> */}
            <div>
              <p className="text-sm text-gray-600 ">Items in cart</p>
              <p className="font-medium text-blue-600">
                {cartData.reduce((total, item) => total + item.quantity, 0)}{" "}
                items
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/cart")}
            className="btn btn-primary px-6 py-3 text-white"
          >
            <span>ตรวจสอบตะกร้าสินค้า</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Store;
