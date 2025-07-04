import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

export default function BannerOne() {
  return (
    <div className="flex px-5 lg:px-16 relative items-center border border-zinc-200 justify-evenly gap-4 bg-light rounded-xl">
      <div className="space-y-4 w-full my-2">
        <h4 className="font-bold text-dark text-base lg:text-3xl leading-[20px] lg:leading-[40px] ">
          Flash Sale! Save Up to 50% on Smartphones You Love
        </h4>
        <Button className="rounded-full text-xs    cursor-pointer">Buy Now</Button>
      </div>
        <div className="hidden md:flex lg:w-full  items-center justify-end">
        <Image src="/img_1.png" width={150} height={150} alt="display" />
      </div>
        <div className="lg:w-full relative flex items-center justify-end">
        <Image src="/img_2.png" className="relative left-0 bottom-[-112px] top-[0px] " width={150} height={150} alt="display" />
      </div>
    </div>
  );
}
