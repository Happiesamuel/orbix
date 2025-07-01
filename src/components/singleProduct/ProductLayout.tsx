"use client";
import React from "react";
import { BreadcrumbWithCustomSeparator } from "../layout/BreadCumb";
import useGetProduct from "../hooks/useGetProduct";
import ProductImages from "./ProductImages";
import Rating from "../layout/Rating";
import { Button } from "../ui/button";
import { FaRegHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import ProductCategory from "./ProductCategory";
import ProductReviews from "./ProductReviews";
import ProductDetails from "./ProductDetails";

export default function ProductLayout() {
  const { product, status } = useGetProduct();
  if (status === "pending") return <div>Loading...</div>;
  console.log(product);
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

  array = [
    ...array,
    { name: product.category, route: `` },
    { name: product.brand, route: `/catalog?query=${product.brand}` },
    ...product.tags.map((tag: string) => ({
      name: tag,
      route: `/catalog?query=${tag}`,
    })),
    { name: product.title, route: `/product/${product.id}` },
  ];
  // const a = products.products.filter((item) => item.brand === product.brand);
  // const a = products.products.filter((x) =>
  //   product.tags.map((y: string[]) => (x.tags.includes(y) ? x : null)).includes(x)
  // );
  // const a = products.products.filter((x) =>
  //   product.tags.map((y: string[]) => (x.tags.includes(y) ? x : null)).includes(x)
  // );
  return (
    <div className="py-6">
      <BreadcrumbWithCustomSeparator array={array} />
      <div className="flex flex-col lg:flex-row justify-between py-8 ">
        <ProductImages images={product?.images} />

        <div className="w-full lg:w-[50%] py-6 lg:py-0">
          <div className="flex text-sm justify-between items-center">
            <p className="font-bold text-dark">{product.brand}</p>
            <p className="text-gray-ash">{product.sku}</p>
          </div>
          <h2 className="font-[900] py-3 text-dark text-2xl">
            {product.title}
          </h2>
          <div className="flex  items-center gap-4">
            <Rating rate={product.rating} />
            <p className="text-gray-ash">{product.warrantyInformation}</p>
          </div>

          <div className="flex items-center justify-between lg:justify-start gap-3">
            <h3 className="font-light relative top-[5px] line-through text-sm py-5 text-gray-ash">
              $
              {(
                product.price +
                product.price * (product.discountPercentage / 100)
              ).toFixed(2, 0)}
            </h3>
            <h3 className="font-bold text-3xl py-5 text-dark">
              ${product.price}
            </h3>
            <p className="text-[10px] relative top-[5px] text-red-500  bg-light p-1 rounded-sm">
              - {product.discountPercentage}%
            </p>
          </div>
          <p className="font-bold pb-3 text-dark text-sm">DESCRIPTION</p>
          <p className="text-gray-ash text-sm pb-5 w-full md:w-[85%]">
            {product.description}
          </p>
          <div className="flex items-center gap-2 cursor-pointer pb-4">
            {product.tags.map((tag: string) => (
              <p
                className="text-sm bg-light shadow shadow-zinc-200 cursor-pointer text-green-500 px-2 rounded-full italic"
                key={tag}
              >
                {tag}
              </p>
            ))}
          </div>
          <div className="flex items-center w-full lg:w-[85%] gap-2">
            <Button
              style={{
                background:
                  "linear-gradient(to right, black, #1a1a1a, #2a2a2a, #404040, #666666)",
              }}
              className="w-[90%] lg:w-[80%] text-white text-sm"
            >
              <IoCartOutline />
              Add to Cart
            </Button>
            <Button className="bg-light text-dark text-sm">
              <FaRegHeart />
            </Button>
          </div>
        </div>
      </div>
      <ProductDetails product={product} />

      <ProductReviews rating={product.rating} reviews={product.reviews} />
      <ProductCategory category={product.category} />
    </div>
  );
}
