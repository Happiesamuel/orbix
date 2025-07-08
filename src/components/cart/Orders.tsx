"use client";
import Image from "next/image";
import React from "react";

export default function Orders() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between border-b border-zinc-300 pb-2.5">
        <h2 className="text-base lg:text-2xl text-dark font-bold">Order Summary</h2>
      </div>

      <div className="flex flex-col border-b h-[450px] px-3 hide-scrollbar overflow-y-scroll my-3  py-2 md:py-4 gap-1.5 md:gap-2">
        {Array.from({ length: 5 }).map((x) => (
          <div
            key={x}
            className="grid grid-cols-[0.2fr_1fr_0.5fr] gap-4 border-b border-zinc-300 pb-1.5 md:pb-2 items-center"
          >
            <div className="bg-light rounded-md border border-zinc-300  relative flex items-center justify-center aspect-square w-[65px] h-[75px] lg:w-[90px] lg:h-[100px]">
              <Image
                src="/img_2.png"
                className=" w-[70%] scale-80 object-center object-contain cursor-pointer"
                alt="order-img"
                fill
              />
            </div>

            <div className="flex text-xs md:text-sm flex-col">
              <h2 className="tetx-dark font-bold text-xs md:text-sm">Red T-Shirt</h2>
              <p>sam</p>
              <p>Enjoy</p>
            </div>

            <div className=" flex flex-col gap-4 items-end justify-between">
              <h6 className="text-dark font-semibold text-xs md:text-sm">$60.00</h6>
              <div className="flex items-center  gap-1">
                <button
                  style={{
                    background:
                      "linear-gradient(to top, black, #1a1a1a, #2a2a2a, #404040, #666666)",
                  }}
                  className="size-[20px] md:size-[25px] flex items-center justify-center cursor-pointer pb-1 text-white rounded-full"
                >
                  -
                </button>
                <p className="bg-light size-[20px] md:size-[25px] rounded-[2px] text-xs md:text-sm flex items-center justify-center">
                  3
                </p>
                <button
                  style={{
                    background:
                      "linear-gradient(to top, black, #1a1a1a, #2a2a2a, #404040, #666666)",
                  }}
                  className="size-[20px] md:size-[25px] flex items-center justify-center cursor-pointer pb-0.5 text-white rounded-full"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
