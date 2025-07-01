"use client";
import React from "react";
import useGetProducts from "../hooks/useGetProducts";

import { BreadcrumbWithCustomSeparator } from "../layout/BreadCumb";
import useSearchProduct from "../hooks/useSearchProduct";
import SearchProduct from "./SearchProduct";
import { useSearchParams } from "next/navigation";

export default function CatalogLayout() {
  const { products, status } = useGetProducts();
  const searchParams = useSearchParams();
  const { product: searchProduct, status: searchStatus } = useSearchProduct();
  if (status === "pending" || searchStatus === "pending")
    return <div>Loading...</div>;
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
    <div className="space-y-3">
      <BreadcrumbWithCustomSeparator array={array} />
      <SearchProduct search={searchProduct} default={products} />
    </div>
  );
}
