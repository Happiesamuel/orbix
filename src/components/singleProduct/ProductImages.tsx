"use client";
import Image from "next/image";
import React, { useState } from "react";

export default function ProductImages({ images }: { images: string[] }) {
  const [img, setImg] = useState<string>(images?.at(0) ?? "");
  return (
    <div className="flex w-[50%] gap-4">
      <div className="flex flex-col  gap-5 ">
        {images.map((imgs: string) => (
          <div
            key={imgs}
            className="relative flex items-center justify-center aspect-square w-[85px] rounded-md bg-[#f2f0ea]"
          >
            <Image
              className=" w-[70%] "
              onClick={() => setImg(imgs)}
              src={imgs}
              fill
              alt="prod"
            />
          </div>
        ))}
      </div>

  <div className="flex w-full  justify-center">
        <div className="relative size-[400px]  rounded-xl bg-[#f2f0ea]">
      <Image key={img} src={img} fill alt="prod" />
      </div>
  </div>
    </div>
  );
}
