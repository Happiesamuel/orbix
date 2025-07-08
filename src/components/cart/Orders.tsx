"use client";
import React, { Dispatch, SetStateAction } from "react";
import OrderList from "./OrderList";

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

      <div className="flex flex-col border-b h-[450px] px-3 hide-scrollbar overflow-y-scroll my-3  py-2 md:py-4 gap-1.5 md:gap-2">
        {cart.map((cat) => (
          <OrderList
            cat={cat}
            cart={cart}
            setCart={setCart}
            key={cat.product.id}
          />
        ))}
      </div>
    </div>
  );
}
