"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {  FaOpencart, FaRegHeart } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import PaginationCatalog from "./PaginationCatalog";
import SortCatalog from "./SortCatalog";
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
        <SortCatalog />
        <p className="text-gray-ash flex items-center gap-1.5">
          <span className="font-bold text-dark">{prod.products.length}</span>{" "}
          products {searchParams.get("query") && "found"}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-4 place-items-center pt-2 pb-4">
        {sortProducts.map((product) => (
          <div
            key={product.id}
            onMouseEnter={() => setActive(product.id)}
            onMouseLeave={() => setActive(null)}
            className="flex flex-col md:w-[80%] w-full max-w-[300px] shadow cursor-pointer shadow-zinc-100 border border-zinc-200/50 rounded-2xl"
          >
            <div className="relative aspect-square w-full flex items-center justify-center bg-light rounded-t-2xl h-[160px] lg:h-[130px]">
              <p className="text-xs text-red-500 absolute right-0 top-[-1] rounded-bl-xl flex items-center justify-center w-[50px] h-[25px]  rounded-tr-2xl bg-white">
                -{product.discountPercentage}%
              </p>
              <p className="text-base text-red-500 absolute left-[-1%] bottom-0  flex items-center justify-center w-[40px] h-[25px] rounded-tr-xl bg-white">
                 <FaRegHeart />
              </p>
              <Image
                src={product.images.at(
                  !active ||
                    product.images.length === 1 ||
                    active !== product.id
                    ? 0
                    : Math.floor(Math.random() * product.images.length)
                )}
                alt={product.title}
                fill
                className={`object-center  object-contain ${
                  active === product.id ? "scale-90" : "scale-80"
                } transition-transform duration-300`}
              />
            </div>
            <div className="p-2 py-3 space-y-2">
              <div className="flex items-center text-dark justify-between  gap-2">
                <h2 className="text-sm font-[700] ">{product.title}</h2>
                <p className=" text-base">${product.price}</p>
              </div>
              <p className="text-xs text-gray-ash">
                {product.description.slice(0, 100)}...
              </p>
              <div className="flex justify-center  items-center gap-3">
                <Link
                  href={`/product/${product.id}`}
                  className="cursor-pointer text-xs border hover:bg-transparent border-zinc-300 py-1.5 px-4 bg-transparent rounded-full text-dark flex items-center gap-2"
                >
                  View Details
                </Link>
                <button
                  style={{
                    background:
                      "linear-gradient(to top, black, #1a1a1a, #2a2a2a, #404040, #666666)",
                  }}
                  className="cursor-pointer text-xs flex items-center gap-2 rounded-full py-1.5 px-3 bg-dark text-light"
                >
                  {" "}
                  <FaOpencart />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <PaginationCatalog
        resultPerPage={RESULT_PER_PAGE}
        showPagination={prod.products.length > RESULT_PER_PAGE}
        length={prod.products.length}
      />
    </div>
  );
}
