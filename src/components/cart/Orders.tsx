"use client";
import React, { Dispatch, SetStateAction } from "react";
import OrderList from "./OrderList";
import { MdRemoveShoppingCart } from "react-icons/md";
export default function Orders({
  cart,
  setCart,
}: {
  cart: Cart[];
  setCart: Dispatch<SetStateAction<Cart[]>>;
}) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between border-b border-zinc-300 pb-2.5">
        <h2 className="text-base lg:text-2xl text-dark font-bold">
          Order Summary
        </h2>
      </div>

      {cart.length ? (
        <div className="flex flex-col border-b max-h-[450px] px-3 hide-scrollbar overflow-y-scroll my-3  py-2 md:py-4 gap-1.5 md:gap-2">
          {cart.map((cat) => (
            <OrderList
              cat={cat}
              cart={cart}
              setCart={setCart}
              key={cat.product.id}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 justify-center h-[200px] lg:h-full">
          <div className="bg-light rounded-full size-[60px] border border-zinc-300 flex items-center justify-center"><MdRemoveShoppingCart className="text-xl text-dark" /></div>
          <h3 className="text-dark text-sm lg:text-base">You have no item in your cart</h3>
        </div>
      )}
    </div>
  );
}
