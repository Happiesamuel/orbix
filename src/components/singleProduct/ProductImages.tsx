"use client";
import Image from "next/image";
import React, { useState } from "react";

export default function ProductImages({ images }: { images: string[] }) {
  const [img, setImg] = useState<string>(images?.at(0) ?? "");
  return (
    <div className="flex flex-col-reverse md:flex-row mx-auto w-[85%] justify-center lg:w-[50%]  gap-4">
      <div className="flex flex-row items-center   md:justify-start justify-center  md:flex-col gap-3  md:gap-5  md:h-[400px] overflow-y-scroll hide-scrollbar md:w-[120px]">
        {images.map((imgs: string) => (
          <div
            key={imgs}
            className="relative flex items-center justify-center aspect-square w-[85px] rounded-md bg-[#f2f0ea]"
          >
            <Image
              className=" w-[70%] scale-80 object-center object-contain cursor-pointer"
              onClick={() => setImg(imgs)}
              src={imgs}
              fill
              alt="prod"
            />
          </div>
        ))}
      </div>

  <div className="flex   w-full items-center justify-center">
        <div className="relative   w-full h-[320px] md:h-[400px] md:max-w-[600px] max-w-[360px] md:size-[360px] md:w-[75%]  rounded-xl bg-[#f2f0ea]">
      <Image key={img} src={img} className="object-center object-contain scale-90" fill alt="prod" />
      </div>
  </div>
    </div>
  );
}
