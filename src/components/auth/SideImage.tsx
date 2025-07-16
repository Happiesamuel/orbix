import Image from "next/image";
import React from "react";

export default function SideImage() {
  return (
    <div className="h-full w-full  items-center justify-center hidden lg:flex">
      <div className="relative aspect-square w-[98%] flex items-center justify-center ">
        <Image
          src={"/login_3.jpg"}
          alt="img"
          fill
          className="object-center   object-cover rounded-2xl"
          quality={100}
        />
        <div className="absolute bottom-[5%]  rounded-lg bg-black/10 backdrop-blur-sm p-4 w-[92%]">
          <h3 className="text-white text-2xl font-semibold">
            Hey there, Welcome to Orbix!
          </h3>
          <p className="text-base text-zinc-300">
            We&apos;re glad you&apos;re here. Log in to continue shopping and
            managing your account.
          </p>
        </div>
      </div>
    </div>
  );
}
