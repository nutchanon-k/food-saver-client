import React from "react";
import useMapStore from "../../stores/mapStore";

export default function ProductCard({ product }) {
  const { imageUrl, name, originalPrice, salePrice } = product;
  return (
    <div className="hover:scale-105 transition-all card card-compact rounded-lg bg-base-100 w-full p-1 shadow-xl">
      <div className="card-body">
        <div className="aspect-[4/3] overflow-hidden">
          <img className="h-full w-full object-cover" src={imageUrl} alt="" />
        </div>
        <h2 className="card-title text-lg">{name}</h2>
        <div className="flex gap-2">
          <div className="bg-red-600 p-1 rounded-lg">
            <h1 className="text-white">
              -
              {(((originalPrice - salePrice) / originalPrice) * 100).toFixed(0)}
              %
            </h1>
          </div>
          <div className="relative ml-2">
            <h1 className="line-through absolute top-[-8px] left-[-8px] text-xs">฿{originalPrice}</h1>
            <h1 className="text-lg font-bold">฿{salePrice}</h1>
          </div>
        </div>
        <div className="card-actions justify-end">
          {/* <button className="btn btn-primary">Buy Now</button> */}
        </div>
      </div>
    </div>
  );
}
