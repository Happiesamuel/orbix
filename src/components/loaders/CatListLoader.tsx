import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function CatListLoader() {
  return (
    <div className="flex flex-col  fixed w-[10rem] items-center justify-center    h-[80vh]">
      <div className="flex justify-center bg-light rounded-2xl px-2 py-2 border border-zinc-300 items-center w-full h-[70vh]">
        <div className="flex flex-col py-4 w-full  overflow-y-scroll h-full hide-scrollbar gap-4 cursor-pointer ">
          {Array.from({ length: 15 }).map((_, i) => (
            <Skeleton key={i} className="h-[55px] p-4 rounded-md w-full " />
          ))}
        </div>
      </div>
    </div>
  );
}
