"use client";
import AllCategory from "@/components/category/AllCategory";
import useGetProducts from "@/components/hooks/useGetProducts";
import React, { Suspense } from "react";

export default function Page() {
  const { products, status } = useGetProducts();
  if (status === "pending") return <div>Loading...</div>;

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <AllCategory products={products} />
    </Suspense>
  );
}
