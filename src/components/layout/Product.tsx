"use client";
import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import { FaOpencart, FaRegHeart } from "react-icons/fa";
import useCart from "../hooks/useCart";

export default function Product({
  type = "others",
  product,
  setActive,
  active,
}: {
  product: Product;
  type?: string;
  active: number | null;
  setActive: Dispatch<SetStateAction<number | null>>;
}) {
  const { cart, setCart } = useCart();
  function addToCart() {
    const newObj = {
      product: product,
      quantity: 1,
    };
    setCart((i) =>
      i.some((x: Cart) => x.product.id === product.id) ? [...i] : [...i, newObj]
    );
  }
  function removeFromCart() {
    setCart((i) => i.filter((x) => x.product.id !== product.id));
  }
  const isInCart = cart.some((x) => x.product.id === product.id);
  return (
    <div
      onMouseEnter={() => setActive(product.id)}
      onMouseLeave={() => setActive(null)}
      className="flex relative  flex-col bg-[#ffffff] md:w-[100%] lg:w-[88%] w-full max-w-[200px]  md:max-w-[400px] shadow cursor-pointer shadow-zinc-100 border border-zinc-300 rounded-lg"
    >
      <div className="relative aspect-square w-full flex items-center justify-center bg-light rounded-t-lg h-[60px] lg:h-[130px] md:h-[80px] ">
        <p className="text-[7px] md:text-[10px] lg:text-xs text-red-500 absolute right-0 top-[-1] rounded-bl-md md:round-bl-xl flex items-center justify-center w-[30px] h-[15px] md:w-[40px] md:h-[20px] lg:w-[50px] lg:h-[25px]  rounded-tr-md md:rounded-tr-md bg-white">
          -{product.discountPercentage}%
        </p>
        <p className="text-[7px] md:text-[10px] lg:text-xs text-red-500 absolute left-[0%] bottom-0  flex items-center justify-center w-[20px] h-[10px] lg:w-[40px] lg:h-[25px] md:w-[30px] md:h-[15px] rounded-tr-md  lg:rounded-tr-xl  bg-white">
          <FaRegHeart />
        </p>
        <Image
          src={
            product?.images.at(
              !active || product.images.length === 1 || active !== product.id
                ? 0
                : Math.floor(Math.random() * product.images.length)
            ) || ""
          }
          alt={product.title}
          fill
          className={`object-center  object-contain ${
            active === product.id ? "scale-90" : "scale-80"
          } transition-transform duration-300`}
        />
        {type === "home" ? (
          <div className="absolute bottom-0 right-1 z-20 inline-block transform rotate-[-5deg] border border-red-700 bg-red-700">
            <p className="border border-white px-1 text-white text-[10px] md:text-xs">
              {product.stock} items left
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="p-1 py-2 space-y-1 md:space-y-4">
        <div className="flex items-center text-dark justify-between  gap-2">
          <h2 className="text-[10px] md:text-xs lg:text-sm font-[700] ">
            {product.title}
          </h2>
          <p className=" text-[8.5px] md:text-[10px] lg:text-base">
            ${product.price}
          </p>
        </div>
        <p className="text-[8.5px] font-semibold lg:font-normal md:text-[11px] lg:text-[13px] text-gray-700">
          {product.description.slice(0, 100)}...
        </p>
        <div className="flex justify-center  items-center gap-3">
          <Link
            href={`/product/${product.sku}`}
            className="cursor-pointer text-[7px] md:text-[10px] lg:text-xs border hover:bg-transparent border-zinc-300  md:py-1.5 md:px-4  py-1 px-1.5 bg-transparent rounded-full text-dark flex items-center gap-2"
          >
            View Details
          </Link>
          <button
            onClick={() => (isInCart ? removeFromCart() : addToCart())}
            style={{
              background:
                "linear-gradient(to top, black, #1a1a1a, #2a2a2a, #404040, #666666)",
            }}
            className="cursor-pointer text-[7px] md:text-[10px]  lg:text-xs flex items-center gap-2 rounded-full py-1 px-1.5  md:py-1.5 md:px-3  bg-dark text-light"
          >
            <FaOpencart className={`${!isInCart ? "" : "hidden md:block"}`} />
            {isInCart ? "Remove from Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
