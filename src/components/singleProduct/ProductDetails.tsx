import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { IoCartOutline } from "react-icons/io5";

export default function ProductDetails({ product }) {
  // const table = [
  // {

  // }
  // ]
  return (
    <div>
      <h2 className="font-bold pb-1.5 text-[#010101] text-sm">
        Product details & Specifications
      </h2>
      <div className="py-6 flex w-full">
        <div className="w-[50%]">
          <div className="grid grid-cols-[1fr_0.4fr] pt-3 pl-3 rounded-t-2xl border p-2 border-zinc-300 items-center">
            <h2 className="font-bold pb-1.5 text-[#010101] text-sm">Sku:</h2>
            <p className="text-zinc-600 font-light text-sm">{product.sku}</p>
          </div>
          <div className="grid grid-cols-[1fr_0.4fr] pt-3 pl-3 border border-y-0 bg-[#f2f0ea] p-2 border-zinc-300 items-center">
            <h2 className="font-bold pb-1.5 text-[#010101] text-sm">
              Availability:
            </h2>
            <p className="text-zinc-600 font-light text-sm">
              {product.availabilityStatus}
            </p>
          </div>
          <div className="grid grid-cols-[1fr_0.4fr] pt-3 pl-3 border p-2 border-zinc-300 items-center">
            <h2 className="font-bold pb-1.5 text-[#010101] text-sm">
              Total products:
            </h2>
            <p className="text-zinc-600 font-light text-sm">
              {product.stock} items
            </p>
          </div>
          <div className="grid grid-cols-[1fr_0.4fr] pt-3 pl-3 border  border-y-0 bg-[#f2f0ea] p-2 border-zinc-300 items-center">
            <h2 className="font-bold pb-1.5 text-[#010101] text-sm">
              Minimum Order Quantity:
            </h2>
            <p className="text-zinc-600 font-light text-sm">
              {product.minimumOrderQuantity} items
            </p>
          </div>
          <div className="grid grid-cols-[1fr_0.4fr] pt-3 pl-3 border p-2 border-zinc-300 items-center">
            <h2 className="font-bold pb-1.5 text-[#010101] text-sm">
              Dimensions (W * H * D):
            </h2>
            <p className="text-zinc-600 font-light text-sm">
              {product.dimensions.width} * {product.dimensions.height} *{" "}
              {product.dimensions.depth}
            </p>
          </div>
          <div className="grid grid-cols-[1fr_0.4fr] pt-3 pl-3 border border-y-0 bg-[#f2f0ea]  p-2 border-zinc-300 items-center">
            <h2 className="font-bold pb-1.5 text-[#010101] text-sm">
              Shipping date:
            </h2>
            <p className="text-zinc-600 font-light text-sm">
              {product.shippingInformation}
            </p>
          </div>
          <div className="grid grid-cols-[1fr_0.4fr] pt-3 pl-3 border p-2 border-zinc-300 items-center">
            <h2 className="font-bold pb-1.5 text-[#010101] text-sm">
              Return after order:
            </h2>
            <p className="text-zinc-600 font-light text-sm">
              {product.returnPolicy}
            </p>
          </div>
          <div className="grid grid-cols-[1fr_0.4fr] rounded-b-2xl pt-3 pl-3 border border-t-0 bg-[#f2f0ea] p-2 border-zinc-300 items-center">
            <h2 className="font-bold pb-1.5 text-[#010101] text-sm">
              Warranty:
            </h2>
            <p className="text-zinc-600 font-light text-sm">
              {product.warrantyInformation}
            </p>
          </div>
        </div>
        <div className="w-[50%] flex justify-end">
          <div className="flex gap-3 flex-col bg-[#f2f0ea] rounded-md shadow shadow-zinc-400 h-max p-4 w-[50%]">
            <div className="flex  gap-2">
              <div className="relative size-[100px]  rounded-xl bg-[#ffffff]">
                <Image src={product.images.at(0)} fill alt="prod" />
              </div>
              <div>
                <h3>{product.title}</h3>
                <h4>${product.price}</h4>
                <div className="flex items-center gap-3">
                  <h3 className="font-light relative top-[5px] line-through text-sm py-5 text-[#a4a4a4]">
                    $
                    {(
                      product.price +
                      product.price * (product.discountPercentage / 100)
                    ).toFixed(2, 0)}
                  </h3>

                  <p className="text-[10px] relative top-[5px] text-red-500  bg-[#ffffff] p-1 rounded-sm">
                    - {product.discountPercentage}%
                  </p>
                </div>
              </div>
            </div>

            <Button style={{
              background: "linear-gradient(to right, black, #1a1a1a, #2a2a2a, #404040, #666666)"
            }} className=" w-full text-white text-sm">
              <IoCartOutline />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
