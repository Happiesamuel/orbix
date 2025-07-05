"use client";
import React, { useState } from "react";
import Product from "../layout/Product";
import Link from "next/link";
import useGetHomeProduct from "../hooks/useGetHomeProducts";

export default function FirstRow({ category, slice = 4, text, route, key }) {
  const { product, status } = useGetHomeProduct(category, key);
  const [active, setActive] = useState(null);
  if (status === "pending") return <p>Loading...</p>;
  return (
    <div className="py-2 lg:py-6">
      <div className="flex justify-between items-center pb-2 gap-2">
        <h2 className="text-xs md:text-xl font-bold text-dark">{text}</h2>
        <Link
          style={{
            background:
              "linear-gradient(to right, black, #1a1a1a, #2a2a2a, #404040, #666666)",
          }}
          href={route}
          className="hover:scale-110 transition-all duration-500 text-[8px] md:text-sm text-light rounded-md  border border-zinc-400 bg px-3 py-1.5 md:px-3 md:py-1.5"
        >
          See More
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-y-4 lg:gap-y-6 gap-2 md:gap-4 place-items-center pt-2 pb-4">
        {product.products.slice(0, slice).map((product) => (
          <Product
            setActive={setActive}
            active={active}
            product={product}
            key={product.id}
          />
        ))}
      </div>
    </div>
  );
}
