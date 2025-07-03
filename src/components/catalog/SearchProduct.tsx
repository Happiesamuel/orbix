"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import PaginationCatalog from "./PaginationCatalog";
import SortCatalog from "./SortCatalog";
import Product from "../layout/Product";
export default function SearchProduct({ search, default: defaultProducts }) {
  const [active, setActive] = useState(null);
  const [RESULT_PER_PAGE, setResultPerPage] = useState(8);
  const searchParams = useSearchParams();
  const [prod, setProd] = useState(
    searchParams.get("query") ? search : defaultProducts
  );
  useEffect(
    function () {
      setProd(searchParams.get("query") ? search : defaultProducts);
      setResultPerPage(searchParams.get("query") ? 8 : 12);
    },
    [search, defaultProducts, searchParams]
  );
  if (!prod.products || prod.products.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-[300px]">
        <h1 className="text-2xl text-gray-500">
          No result for {searchParams.get("query")}
        </h1>
      </div>
    );
  }
  const sort = searchParams.get("sort") || "discount-asc";
  const page: number = Number(searchParams?.get("page")) || 1;
  const slicedProducts = prod.products.slice(
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
        <SortCatalog push="catalog" />
        <p className="text-gray-ash flex items-center gap-1.5">
          <span className="font-bold text-dark">{prod.products.length}</span>{" "}
          products {searchParams.get("query") && "found"}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-4 place-items-center pt-2 pb-4">
        {sortProducts.map((product) => (
          <Product product={product} key={product.id} active={active} setActive={setActive} />
        ))}
      </div>
      <PaginationCatalog
      push="catalog"
        resultPerPage={RESULT_PER_PAGE}
        showPagination={prod.products.length > RESULT_PER_PAGE}
        length={prod.products.length}
      />
    </div>
  );
}
