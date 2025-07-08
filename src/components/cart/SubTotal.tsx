import React from "react";

export default function SubTotal({ price }: { price: string }) {
  return (
    <div className="flex flex-col border border-zinc-300 rounded-lg p-3 md:p-4  mt-4">
      <div className=" grid grid-cols-[1fr_0.2fr] pb-3">
        <div className="space-y-2.5  text-zinc-500 text-sm md:text-base">
          <p>SubTotal:</p>
          <p>Delivery:</p>
        </div>
        <div className="space-y-2.5 text-sm md:text-base flex flex-col items-end font-semibold text-dark">
          <p>${price}</p>
          <p>$0.00</p>
        </div>
      </div>
      <div className="grid grid-cols-[1fr_0.2fr] border-t border-zinc-300 pt-3">
        <div className="space-y-2.5  text-zinc-500 text-sm md:text-base">
          <p>Total:</p>
        </div>
        <div className="space-y-2.5 text-sm md:text-base flex flex-col items-end font-semibold text-dark">
          <p>${price}</p>
        </div>
      </div>
    </div>
  );
}
