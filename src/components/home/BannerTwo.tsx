import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

export default function BannerTwo() {
  return (
    <div className="flex px-5 lg:px-16  items-center border border-zinc-200 justify-evenly gap-4 bg-light rounded-xl">
      <div className="space-y-4 w-full">
        <h4 className="font-bold text-dark text-xl lg:text-3xl ">
          Hot Deals 🔥 - Selected Laptops Up to 30% Off!
        </h4>
        <Button className="rounded-full cursor-pointer">Buy Now</Button>
      </div>
      <div className="lg:w-full flex items-center justify-end">
        <Image src="/img_3.png" width={150} height={150} alt="display" />
      </div>
    </div>
  );
}
