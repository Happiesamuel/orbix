import React from "react";
import { Skeleton } from "../ui/skeleton";
import { FaOpencart } from "react-icons/fa";

export default function ChooseCategoryLoader() {
  return (
    <div
      className={`flex flex-col gap-1 items-center bg-white w-[100%] h-[100px] md:h-full max-w-[200px] justify-center  px-2
duration-500 transition-all border border-zinc-300 rounded-lg py-2
            `}
    >
      <div className={`relative aspect-auto h-16 md:h-20  w-full `}>
        <Skeleton className="relative size-full rounded-t-lg loader  aspect-square w-full flex items-center justify-center   ">
          <div className="circle">
            <FaOpencart className="text-zinc-500 text-xl md:text-3xl" />
          </div>
        </Skeleton>
      </div>
      <div className="flex flex-col gap-1.5 md:gap-2.5 justify-center items-center">
        <Skeleton className="h-2 w-20" />
        <Skeleton className="h-2 w-8" />
      </div>
    </div>
  );
}
