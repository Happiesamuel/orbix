"use client";
import React, { useState } from "react";
import CatList from "./CatList";
import useGetProducts from "../hooks/useGetProducts";
import CatListLoader from "../loaders/CatListLoader";

export default function MainCatList({
  categories,
}: {
  categories: Category[];
}) {
  const [value, setValue] = useState("");
  const { products, status } = useGetProducts();
  if (status === "pending") return <CatListLoader />;
  const cat = [
    {
      slug: "all",
      name: `All Categories (${products.products.length})`,
    },
    ...categories,
  ];
  return (
    <div className="flex flex-col  fixed w-max items-center justify-center   h-[80vh]">
      <div className="flex justify-center bg-light rounded-2xl px-2 py-2 border border-zinc-300 items-center h-[70vh]">
        <div className="flex flex-col py-4  overflow-y-scroll h-full hide-scrollbar  cursor-pointer ">
          {cat.map((category: Category) => (
            <CatList
              product={products.products}
              key={category.slug}
              category={category}
              value={value}
              setValue={setValue}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
