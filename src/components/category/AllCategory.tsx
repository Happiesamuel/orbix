"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import Product from "../layout/Product";
import PaginationCatalog from "../catalog/PaginationCatalog";
import SortCatalog from "../catalog/SortCatalog";
export default function AllCategory({
  products,
}: {
  products: { products: Product[] };
}) {
  const [active, setActive] = useState<number | null>(null);
  const RESULT_PER_PAGE = 8;
  const searchParams = useSearchParams();

  const sort = searchParams.get("sort") || "discount-asc";
  const page: number = Number(searchParams?.get("page")) || 1;
  const slicedProducts = products.products.slice(
    (page - 1) * RESULT_PER_PAGE,
    page * RESULT_PER_PAGE
  );
  const sortProducts = slicedProducts.sort((a, b) => {
    if (sort === "discount-asc") {
      return a.discountPercentage - b.discountPercentage;
    } else if (sort === "discount-desc") {
      return b.discountPercentage - a.discountPercentage;
    } else if (sort === "price-asc") {
      return a.price - b.price;
    } else if (sort === "price-desc") {
      return b.price - a.price;
    } else if (sort === "rating-asc") {
      return a.rating - b.rating;
    } else if (sort === "rating-desc") {
      return b.rating - a.rating;
    }
    return 0;
  });

  return (
    <div>
      <div className="flex items-center justify-between w-full px-0 md:px-4 py-2">
        <SortCatalog push="category" />
        <p className="text-gray-ash md:text-xs lg:text-sm text-[10px] flex items-center gap-1.5">
          <span className="font-bold text-dark">
            {products.products.length}
          </span>{" "}
          products {searchParams.get("query") && "found"}
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 w-full gap-y-6 gap-4 place-items-center pt-2 pb-4">
        {sortProducts.map((product: Product) => (
          <Product
            product={product}
            key={product.id}
            active={active}
            setActive={setActive}
          />
        ))}
      </div>
      <PaginationCatalog
        push="category"
        resultPerPage={RESULT_PER_PAGE}
        showPagination={products.products.length > RESULT_PER_PAGE}
        length={products.products.length}
      />
    </div>
  );
}
