import Image from "next/image";
import React from "react";

export default function SideImage() {
  return (
    <div className="h-full w-full  items-center justify-center hidden lg:flex">
      <div className="relative aspect-square w-[96%] flex items-center justify-center ">
        <Image
          src={"/login_1.jpg"}
          alt="img"
          fill
          className="object-center   object-cover rounded-4xl"
          quality={100}
        />
        <div className="absolute bottom-[5%]  rounded-lg bg-black/10 backdrop-blur-sm p-4 w-[92%]">
          <h3 className="text-white text-3xl font-semibold">
            Your Journey, Your Dashboard
          </h3>
          <p className="text-lg text-zinc-300">
            Access assignments, path performance, and stay connected—all in one
            place.
          </p>
        </div>
      </div>
    </div>
  );
}
