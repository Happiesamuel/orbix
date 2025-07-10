import React from "react";
import { TbError404 } from "react-icons/tb";
export default function notFound() {
  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="flex gap-4  flex-col items-center justify-center ">
        <div className="rounded-full bg-zinc-400/90 flex items-center justify-center size-[50px]">
          <TbError404 className="text-3xl text-white" />
        </div>
        <p className="font-bold text-zinc-400/70 tracking-wider text-lg md:text-2xl lg::text-4xl">
          Page Not Found
        </p>
      </div>
    </div>
  );
}
