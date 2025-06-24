import React from "react";
import { FaOpencart, FaRegHeart } from "react-icons/fa";
import { Input } from "../ui/input";
import { IoSearch } from "react-icons/io5";
export default function Header() {
  return (
    <div className="flex items-center justify-between">
      <h1>
        BR.<span>F</span>
      </h1>
      <div className="flex items-center gap-2 justify-center px-3 w-[280px] rounded-md text-[#a4a4a4] bg-[#f2f0ea]">
        <IoSearch className="text-2xl"/>
        <Input className="border-none shadow-none p-0 placeholder:text-[#a4a4a4] text-[#010101]" placeholder="Search"/>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center flex-col gap-1">
          <FaOpencart />
          <p>Cart</p>
        </div>
        <div className="flex items-center flex-col gap-1">
          <FaRegHeart />
          <p>Favorite</p>
        </div>
        image
      </div>
    </div>
  );
}
