"use client";
import React, { useState } from "react";
import useGetProducts from "../hooks/useGetProducts";
import useGetCatList from "../hooks/useGetCatList";

import Choose from "./Choose";
import ChooseCategoryLoader from "../loaders/ChooseCategoryLoader";

export default function ChooseCategory() {
  const { products, status } = useGetProducts();

  const { category, status: catStat } = useGetCatList();
  const [product, setProduct] = useState<CatProduct[]>([]);

  if (status === "pending" || catStat === "pending")
    return (
      <div className="grid  place-items-center  grid-cols-3 md:grid-cols-4  lg:grid-cols-6 gap-3 md:gap-y-6 md:gap-x-6 w-full">
        {Array.from({ length: 12 }).map((_, i) => (
          <ChooseCategoryLoader key={i} />
        ))}
      </div>
    );
  const catList = category.map((cat: Category) =>
    products.products.filter(
      (product: Product) => product.category === cat.slug
    )
  );

  return <Choose catList={catList} product={product} setProduct={setProduct} />;
}
