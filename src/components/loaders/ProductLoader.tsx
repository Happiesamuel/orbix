import React from "react";
import { Skeleton } from "../ui/skeleton";
import { FaOpencart } from "react-icons/fa";

export default function ProductLoader() {
  return (
    <div className="flex relative  flex-col bg-[#ffffff] md:w-[100%] lg:w-[88%] w-full max-w-[200px]  md:max-w-[400px] shadow-md cursor-pointer shadow-zinc-200 border border-zinc-300 rounded-lg">
      <Skeleton className="relative loader  aspect-square w-full flex items-center justify-center  rounded-t-lg h-[60px] lg:h-[130px] md:h-[80px] ">
        <div className="circle">
          <FaOpencart className="text-zinc-500 text-xl md:text-3xl" />
        </div>
      </Skeleton>
      <div className="p-1 py-2 space-y-1 md:space-y-4">
        <div className="flex items-center text-dark justify-between  gap-2">
          <Skeleton className="h-2 w-[70%]" />
          <Skeleton className="h-2 w-[20%]" />
        </div>
        <Skeleton className="h-12 rounded-sm w-full" />
        <div className="flex justify-center  items-center gap-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    </div>
  );
}
