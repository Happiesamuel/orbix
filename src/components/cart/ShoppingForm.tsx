import React from "react";
import SubTotal from "./SubTotal";
import { Button } from "../ui/button";

export default function ShoppingForm({ cart }: { cart: Cart[] }) {
  const quantity = cart.map((x) => x.quantity).reduce((a, b) => a + b);
  const price = cart
    .map((x) => x.quantity * x.product.price)
    .reduce((a, b) => a + b).toFixed(2);
  return (
    <div className="w-full">
      <div className="flex items-center justify-between border-b border-zinc-300 pb-3">
        <h2 className="text-base lg:text-2xl text-dark font-bold">
          Shopping Cart
        </h2>
        <p className="text-gray-ash text-xs md:text-sm space-x-4">
          <span className="text-dark text-sm md:text-lg font-bold">
            {quantity}
          </span>{" "}
          Items
        </p>
      </div>

      <SubTotal price={price} />
      <Button
        style={{
          background:
            "linear-gradient(to right, black, #1a1a1a, #2a2a2a, #404040, #666666)",
        }}
        className=" w-full text-white text-sm mt-4 cursor-pointer "
      >
        Checkout (${price})
      </Button>
    </div>
  );
}
