"use client";
import React from "react";
import useGetProducts from "../hooks/useGetProducts";

import { BreadcrumbWithCustomSeparator } from "../layout/BreadCumb";
import useSearchProduct from "../hooks/useSearchProduct";
import SearchProduct from "./SearchProduct";

export default function CatalogLayout() {
  const { products, status } = useGetProducts();
  const { product: searchProduct, status: searchStatus } = useSearchProduct();
  if (status === "pending" || searchStatus === "pending")
    return <div>Loading...</div>;
  return (
    <div>
      <BreadcrumbWithCustomSeparator />
      <SearchProduct search={searchProduct} default={products} />
    </div>
  );
}
