import React from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

export default function Rating({ rate }: { rate: number }) {
  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }).map((_, i) =>
       Math.trunc(rate) <= Math.round(rate) && Math.trunc(rate) > i ? (
          <FaStar key={i} className="text-[#edcf5d]" />
        ) : Math.round(rate) > rate && Math.round(rate) > i ? (
          <FaStarHalfAlt key={i} className="text-[#edcf5d]" />
        ) : (
          <FaRegStar key={i} className="text-[#edcf5d]" />
        )
      )}
    </div>
  );
}
