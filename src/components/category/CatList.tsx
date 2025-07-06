"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";

export default function CatList({
  category,
  value,
  setValue,
  product,
}: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  product: Product[];
  category: Category;
}) {
  const params = useParams();
  const active = params.slug || "all";
  const productLength = product.filter(
    (x) => x.category === category.slug
  ).length;
  return (
    <Link
      onMouseEnter={() => setValue(category.slug)}
      onMouseLeave={() => setValue("")}
      style={{
        cursor: "pointer",
        background:
          value !== category.slug && active !== category.slug
            ? "transparent"
            : "linear-gradient(to right, black, #1a1a1a, #2a2a2a, #404040, #666666)",
      }}
      className={`hover:text-white rounded-md text-[12.5px] p-1.5 pl-3  !cursor-pointer transition-all duration-500  ${
        value === category.slug || active === category.slug
          ? "!text-white"
          : "text-dark"
      }`}
      key={category.slug}
      href={`/category/${category.slug !== "all" ? category.slug : ""}`}
    >
      {category.name} {productLength > 0 && `(${productLength})`}
    </Link>
  );
}
