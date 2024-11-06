import React, { useEffect, useRef, useState } from "react";
import { ArrowDown, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import useCartStore from "../../stores/cartItemStore";
import { nav } from "framer-motion/client";
import { useNavigate } from "react-router-dom";
import useMapStore from "../../stores/mapStore";

export default function ProductCard({ product }) {
  const {
    id,
    imageUrl,
    name,
    originalPrice,
    salePrice,
    description,
    quantity,
    productAllergens,
  } = product;
  const [isInCart, setIsInCart] = useState(-1);
  const [isEdited, setIsEdited] = useState(false);
  const cartRef = useRef([]);
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const getCart = useCartStore((state) => state.getCart);
  const [orderQuantity, setorderQuantity] = useState(1);
  const activeMarker = useMapStore((state) => state.activeMarker);
  const navigate = useNavigate();

  useEffect(() => {
    cartRef.current = cart;
    const indexInCart = cart.findIndex((item) => item.productId === id);
    if (indexInCart === -1) {
      setIsInCart(-1);
    } else {
      setIsInCart(cart[indexInCart].quantity);
      setorderQuantity(cart[indexInCart].quantity);
    }
  }, [cart, id]);

  // const hdlQuantityChange = (n) => {
  //   if (orderQuantity + n - 1 >= quantity) return;
  //   if (orderQuantity + n >= 1) {
  //     const newQuantity = orderQuantity + n;
  //     setorderQuantity(newQuantity);
  //     // Compare with cart quantity and set isEdited accordingly
  //     setIsEdited(newQuantity !== isInCart);
  //   }
  // };

  // const handleAddToCart = async (e) => {
  //   e.stopPropagation();
  //   const body = {
  //     productId: id,
  //     quantity: orderQuantity,
  //   };
  //   await addToCart(body);
  //   const updatedCart = await getCart();
  //   cartRef.current = updatedCart;
  //   setIsEdited(false);
  // };

  const handleNavigate = (e) => {
    e.stopPropagation();
    const storeId = activeMarker.id;
    navigate(`/store/${storeId}`);
  };

  return (
    <div className="hover:scale-105 p-2 transition-all card card-compact rounded-lg bg-base-100 w-full shadow-xl">
      <div className="collapse w-full">
        <input type="checkbox" />

        <div className="collapse-title relative w-full py-1 px-2 text-xs font-medium flex flex-row justify-between items-center gap-2">
          <div className="w-1/3 flex min-w-[85px] aspect-square rounded-lg overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src={imageUrl}
              alt={name}
            />
          </div>
          <div className="flex flex-col w-full">
            <h2 className="card-title text-lg">{name}</h2>
            <div className="flex">
              <div className="relative ml-2 flex gap-2 items-center">
                <h1 className="text-lg text-primary font-bold">฿{salePrice}</h1>
                <h1 className="line-through text-gray-500">฿{originalPrice}</h1>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full items-center gap-1 justify-between">
            <h1>เหลือ {quantity} ชิ้น</h1>
            {/* <div className="flex items-center border rounded-full gap-2 p-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  hdlQuantityChange(-1);
                }}
                className="z-10 btn aspect-square min-h-0 h-fit p-2 rounded-full"
              >
                -
              </button>
              <h1>{orderQuantity}</h1>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  hdlQuantityChange(1);
                }}
                className="z-10 btn aspect-square min-h-0 h-fit p-2 rounded-full"
              >
                +
              </button>
            </div> */}
            <div className="flex m-0 justify-center">
              {isInCart !== -1 && !isEdited ? (
                <button
                  onClick={(e) => handleNavigate(e)}
                  className="z-10 btn min-h-0 h-fit p-2 rounded-full btn-base-200 text-primary"
                >
                  Added {isInCart}
                </button>
              ) : (
                <button
                  onClick={(e) => handleNavigate(e)}
                  className="z-10 btn min-h-0 h-fit p-2 rounded-full btn-primary text-white"
                >
                  Add to cart
                </button>
              )}
            </div>
          </div>

          {/* Arrow at the bottom center */}

          <motion.div
            className="absolute bottom-[-15px] left-1/2 transform -translate-x-1/2 mb-1"
            animate={{
              y: [0, 5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ChevronDown size={16} />
          </motion.div>
        </div>

        <div className="collapse-content flex flex-col w-full gap-2 px-4 py-2">
          <p className="text-sm">{description}</p>
          {productAllergens.map((el, index) => (
            <div key={index} className="flex gap-2">
              <div className="badge badge-warning badge-outline">
                {el.allergen.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
