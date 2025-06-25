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

export default function ProductLayout() {
  const { product, status } = useGetProduct();
  if (status === "pending") return <div>Loading...</div>;
  console.log(product);

  return (
    <div>
      <BreadcrumbWithCustomSeparator />
      <div className="flex justify-between py-8 ">
        <ProductImages images={product?.images} />

        <div className="w-[50%]">
          <div className="flex text-sm justify-between items-center">
            <p className="font-bold text-[#010101]">{product.brand}</p>
            <p className="text-[#a4a4a4]">{product.sku}</p>
          </div>
          <h2 className="font-[900] py-3 text-[#010101] text-2xl">
            {product.title}
          </h2>
          <div className="flex items-center gap-4">
            <Rating rate={product.rating} />
            <p className="text-[#a4a4a4]">{product.warrantyInformation}</p>
          </div>

          <div className="flex items-center gap-3">
            <h3 className="font-light relative top-[5px] line-through text-sm py-5 text-[#a4a4a4]">
              $
              {(
                product.price +
                product.price * (product.discountPercentage / 100)
              ).toFixed(2, 0)}
            </h3>
            <h3 className="font-bold text-3xl py-5 text-[#010101]">
              ${product.price}
            </h3>
            <p className="text-[10px] relative top-[5px] text-red-500  bg-[#f2f0ea] p-1 rounded-sm">
              - {product.discountPercentage}%
            </p>
          </div>
          <p className="font-bold pb-3 text-[#010101] text-sm">DESCRIPTION</p>
          <p className="text-[#a4a4a4] text-sm pb-5 w-[85%]">
            {product.description}
          </p>
          <div className="flex items-center w-[85%] gap-2">
            <Button className="bg-[#010101] w-[80%] text-white text-sm">
              <IoCartOutline />
              Add to Cart
            </Button>
            <Button className="bg-[#f2f0ea] text-[#010101] text-sm">
              <FaRegHeart />
            </Button>
          </div>
        </div>
      </div>


      <ProductCategory category={product.category} />
    </div>
  );
}
