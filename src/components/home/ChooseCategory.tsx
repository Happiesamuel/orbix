"use client";
import React, { useState } from "react";
import useGetProducts from "../hooks/useGetProducts";
import useGetCatList from "../hooks/useGetCatList";

import Choose from "./Choose";

export default function ChooseCategory() {
  const { products, status } = useGetProducts();

  const { category, status: catStat } = useGetCatList();
  const [product, setProduct] = useState<CatProduct[]>([]);

  if (status === "pending" || catStat === "pending")
    return <div>Loading...</div>;
  const catList = category.map((cat: Category) =>
    products.products.filter(
      (product: Product) => product.category === cat.slug
    )
  );

  return <Choose catList={catList} product={product} setProduct={setProduct} />;
}
