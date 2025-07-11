import Image from "next/image";
import React from "react";

export default function SideImage() {
  return (
    <div className="w-full">
      <div className="relative aspect-square w-full h-full">
        <Image src={"/login_1.jpg"} alt="img" fill className="object-center object-cover rounded-3xl" quality={100}/>
      </div>
    </div>
  );
}
