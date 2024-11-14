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
    productCategories,
  } = product;
  const [isInCart, setIsInCart] = useState(-1);
  const [isEdited, setIsEdited] = useState(false);
  const cartRef = useRef([]);
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const getCart = useCartStore((state) => state.getCart);
  const [orderQuantity, setorderQuantity] = useState(1);
  const activeMarker = useMapStore((state) => state.activeMarker);
  const filter = useMapStore((state) => state.filter);
  const navigate = useNavigate();

  const allergensArray = productAllergens.map(
    (allergen) => allergen.allergenId
  );
  const categoriesArray = productCategories.map(
    (category) => category.categoryId
  );

  useEffect(() => {
    // console.log(allergensArray, categoriesArray, "---------------------------");
    cartRef.current = cart;
    const indexInCart = cart.findIndex((item) => item.productId === id);
    if (indexInCart === -1) {
      setIsInCart(-1);
    } else {
      setIsInCart(cart[indexInCart].quantity);
      setorderQuantity(cart[indexInCart].quantity);
    }
  }, [cart, id]);

  const handleNavigate = (e) => {
    e.stopPropagation();
    const storeId = activeMarker.id;
    navigate(`/store/${storeId}`);
  };

  return allergensArray.some((el) => filter.allergen.includes(el)) ||
    !categoriesArray.some((el) => filter.category.includes(el)) ? null : (
    <div className="hover:scale-105 p-1 transition-all card card-compact rounded-lg bg-base-100 w-[250px] md:w-full shadow-xl min-h-[90px]">
      <div className="collapse w-full">
        <input type="checkbox" />
        <div className="collapse-title relative w-full py-0 px-1 text-xs font-medium flex flex-row justify-between items-center gap-1">
          <div className="flex min-w-[70px] md:min-w-[85px] md:w-1/3 h-[70px] md:h-full rounded-lg overflow-hidden">
            <img
              className=" md:h-full w-full object-cover"
              src={imageUrl}
              alt={name}
            />
          </div>
          <div className="flex flex-col w-full">
            <h2 className="card-title text-[1rem] md:text-lg leading-tight line-clamp-2">
              {name}
            </h2>
            <div className="flex flex-col">
              <div className="relative ml-2 flex gap-1 items-center">
                <h1 className="text-xs md:text-lg text-primary font-bold">
                  ฿{salePrice}
                </h1>
                <h1 className="text-xs line-through text-gray-500">
                  ฿{originalPrice}
                </h1>
              </div>
              <div className="md:hidden ml-2">
                <h1 className="md:text-left justify-center md:justify-start text-center text-xs whitespace-nowrap">
                  เหลือ {quantity} ชิ้น
                </h1>
              </div>
            </div>
          </div>
          <div className="flex md:flex-col w-full items-center gap-1 justify-between">
            <h1 className="hidden md:block text-xs">เหลือ {quantity} ชิ้น</h1>
            <div className="flex w-full justify-end">
              {isInCart !== -1 && !isEdited ? (
                <button
                  onClick={(e) => handleNavigate(e)}
                  className="text-[10px] md:text-md z-10 btn min-h-0 h-7 w-fit md:w-full px-1 rounded-full btn-base-200 text-primary"
                >
                  Added <br/> {isInCart}
                </button>
              ) : (
                <button
                  onClick={(e) => handleNavigate(e)}
                  className="text-[15px] md:text-md z-10 btn min-h-0 aspect-square h-8 md:h-12 w-fit px-1 rounded-full btn-primary text-white"
                >
                  +
                </button>
              )}
            </div>
          </div>

          <motion.div
            className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 mb-0.5"
            animate={{
              y: [0, 5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ChevronDown size={12} />
          </motion.div>
        </div>

        <div className="collapse-content flex flex-col w-full gap-1 px-2 py-1">
          <p className="text-xs md:text-sm">{description}</p>
          {productAllergens.map((el, index) => (
            <div key={index} className="flex gap-2">
              <div className="badge badge-warning badge-outline text-[10px]">
                {el.allergen.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
