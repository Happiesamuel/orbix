import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Banners({
  text,
  link,
  firstImg,
  secondImg,
}: {
  text: string;
  link: string;
  firstImg: string;
  secondImg: string;
}) {
  return (
    <div className="flex px-3 lg:px-16 relative items-center border border-zinc-200 justify-evenly gap-4 bg-light rounded-xl">
      <div className="space-y-4 w-full my-5">
        <h4 className="font-bold text-dark text-sm md:text-3xl lg:text-5xl leading-[20px] md:leading-[40px] lg:leading-[50px] w-[100%] lg:w-full">
          {text}
        </h4>
        <Link
          href={link}
          className="rounded-full text-[10px]  bg-dark py-1.5 md:py-3 md:px-4 px-3 text-white  cursor-pointer"
        >
          Buy Now
        </Link>
      </div>
      <div className="flex  lg:w-[50%]  items-center justify-end">
        <Image
          src={`/img_${firstImg}.png`}
          width={link === "/category/smartphones" ? 150 : 180}
          height={link === "/category/smartphones" ? 150 : 180}
          alt="display"
        />
      </div>
      <Image
        src={`/img_${secondImg}.png`}
        className="absolute right-0 bottom-0  size-[100px] md:size-[130px] lg:size-[180px]  object-center object-contain"
        width={100}
        height={100}
        alt="display"
      />
    </div>
  );
}
