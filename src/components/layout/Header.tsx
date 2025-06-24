import React from "react";
import { FaOpencart, FaRegHeart } from "react-icons/fa";

export default function Header() {
  return (
    <div className="flex items-center justify-between">
      <h1>
        BR.<span>F</span>
      </h1>
      <input />
      <div className="flex items-center gap-2">
        <div className="flex items-center flex-col gap-1">
          <FaOpencart />
          <p>Cart</p>
        </div>
        <div className="flex items-center flex-col gap-1">
          <FaRegHeart />
          <p>Cart</p>
        </div>
        immage
      </div>
    </div>
  );
}
