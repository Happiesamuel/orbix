"use client";
import React from "react";
import useGetProducts from "../hooks/useGetProducts";

import { BreadcrumbWithCustomSeparator } from "../layout/BreadCumb";
import useSearchProduct from "../hooks/useSearchProduct";
import SearchProduct from "./SearchProduct";
import { useSearchParams } from "next/navigation";
import ProductLoader from "../loaders/ProductLoader";

export default function CatalogLayout() {
  const { products, status } = useGetProducts();
  const searchParams = useSearchParams();
  const { product: searchProduct, status: searchStatus } = useSearchProduct();
  if (status === "pending" || searchStatus === "pending")
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-y-4 lg:gap-y-6 gap-2 md:gap-4 place-items-center py-4 pb-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <ProductLoader key={i + 1} />
        ))}
      </div>
    );
  const query = searchParams?.get("query") || "";
  let array = [
    {
      route: "/",
      name: "Home",
    },
    {
      route: "/catalog",
      name: "Catalog",
    },
  ];

  if (query)
    array = [...array, { name: query, route: `/catalog?query=${query}` }];
  return (
    <div className="space-y-3 pt-2">
      <BreadcrumbWithCustomSeparator array={array} />
      <SearchProduct search={searchProduct} default={products} />
    </div>
  );
}
