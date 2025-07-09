"use client";
import AllCategory from "@/components/category/AllCategory";
import useGetProducts from "@/components/hooks/useGetProducts";
import ProductLoader from "@/components/loaders/ProductLoader";
import React, { Suspense } from "react";

export default function Page() {
  const { products, status } = useGetProducts();
  if (status === "pending") return  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 w-full gap-y-6 gap-4 place-items-center pt-2 pb-4">
         {Array.from({ length: 12 }).map((_, i) => (
              <ProductLoader key={i + 1} />
            ))}
  </div>;

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <AllCategory products={products} />
    </Suspense>
  );
}
