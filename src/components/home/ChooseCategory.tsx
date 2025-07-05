"use client";
import React, { useState } from "react";
import useGetProducts from "../hooks/useGetProducts";
import useGetCatList from "../hooks/useGetCatList";

import Choose from "./Choose";

export default function ChooseCategory() {
  const { products, status } = useGetProducts();

  const { category, status: catStat } = useGetCatList();
  const [product, setProduct] = useState([]);

  if (status === "pending" || catStat === "pending")
    return <div>Loading...</div>;
  const catList = category.map((cat) =>
    products.products.filter((product) => product.category === cat.slug)
  );
  // .map((x) => {
  //   return {
  //     length: x.length,
  //     product: x.at(0),
  //   };
  // });
  return (
    <Choose catList={catList} product={product} setProduct={setProduct} />
  );
}

