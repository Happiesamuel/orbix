import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Button } from "../ui/button";
import useRecentView from "../hooks/useRecentView";
import Link from "next/link";

export default function ProductDetails({
  product,
  cart,
}: {
  product: Product;
  cart: Cart[];
  setCart: Dispatch<SetStateAction<Cart[]>>;
}) {
  const { setRecentView } = useRecentView();
  useEffect(
    function () {
      setRecentView((i) =>
        i.some((x: Product) => x.id === product.id) ? [...i] : [...i, product]
      );
    },
    [setRecentView, product]
  );

  const cartItem = cart.find((cat) => cat.product.id === product.id);

  return (
    <div>
      <h2 className="font-bold pb-1.5 text-[#010101] text-sm">
        Product details & Specifications
      </h2>
      <div className="py-4 md:py-6 gap-5 flex flex-col justify-between md:flex-row w-full">
        <div className="w-full mx-auto md:mx-0 lg:max-w-[40%] max-w-[95%] md:w-[55%]">
          <div className="grid grid-cols-[1fr_0.4fr] pt-3 pl-3 rounded-t-2xl border p-2 border-zinc-300 items-center">
            <h2 className="font-bold pb-1.5 text-[#010101] text-xs md:text-sm">
              Sku:
            </h2>
            <p className="text-zinc-600 font-light text-xs md:text-sm">
              {product.sku}
            </p>
          </div>
          <div className="grid grid-cols-[1fr_0.4fr] pt-3 pl-3 border border-y-0 bg-[#f2f0ea] p-2 border-zinc-300 items-center">
            <h2 className="font-bold pb-1.5 text-[#010101] text-xs md:text-sm">
              Availability:
            </h2>
            <p className="text-zinc-600 font-light text-xs md:text-sm">
              {product.availabilityStatus}
            </p>
          </div>
          <div className="grid grid-cols-[1fr_0.4fr] pt-3 pl-3 border p-2 border-zinc-300 items-center">
            <h2 className="font-bold pb-1.5 text-[#010101] text-xs md:text-sm">
              Total products:
            </h2>
            <p className="text-zinc-600 font-light text-xs md:text-sm">
              {product.stock} items
            </p>
          </div>
          <div className="grid grid-cols-[1fr_0.4fr] pt-3 pl-3 border  border-y-0 bg-[#f2f0ea] p-2 border-zinc-300 items-center">
            <h2 className="font-bold pb-1.5 text-[#010101] text-xs md:text-sm">
              Minimum Order Quantity:
            </h2>
            <p className="text-zinc-600 font-light text-xs md:text-sm">
              {product.minimumOrderQuantity} items
            </p>
          </div>
          <div className="grid grid-cols-[1fr_0.4fr] pt-3 pl-3 border p-2 border-zinc-300 items-center">
            <h2 className="font-bold pb-1.5 text-[#010101] text-xs md:text-sm">
              Dimensions (W * H * D):
            </h2>
            <p className="text-zinc-600 font-light text-xs md:text-sm">
              {product.dimensions.width} * {product.dimensions.height} *{" "}
              {product.dimensions.depth}
            </p>
          </div>
          <div className="grid grid-cols-[1fr_0.4fr] pt-3 pl-3 border border-y-0 bg-[#f2f0ea]  p-2 border-zinc-300 items-center">
            <h2 className="font-bold pb-1.5 text-[#010101] text-xs md:text-sm">
              Shipping date:
            </h2>
            <p className="text-zinc-600 font-light text-xs md:text-sm">
              {product.shippingInformation}
            </p>
          </div>
          <div className="grid grid-cols-[1fr_0.4fr] pt-3 pl-3 border p-2 border-zinc-300 items-center">
            <h2 className="font-bold pb-1.5 text-[#010101] text-xs md:text-sm">
              Return after order:
            </h2>
            <p className="text-zinc-600 font-light text-xs md:text-sm">
              {product.returnPolicy}
            </p>
          </div>
          <div className="grid grid-cols-[1fr_0.4fr] rounded-b-2xl pt-3 pl-3 border border-t-0 bg-[#f2f0ea] p-2 border-zinc-300 items-center">
            <h2 className="font-bold pb-1.5 text-[#010101] text-xs md:text-sm">
              Warranty:
            </h2>
            <p className="text-zinc-600 font-light text-xs md:text-sm">
              {product.warrantyInformation}
            </p>
          </div>
        </div>
        <div className="w-full max-w-[320px]   lg:max-w-full md:mx-0 mx-auto lg:w-[50%] flex justify-end">
          <div className="flex  flex-col bg-[#f2f0ea] rounded-md shadow shadow-zinc-400 h-max p-4 w-full lg:w-[50%]">
            <div className="flex  gap-5">
              <div className="relative size-[80px] w-[40%] rounded-md bg-[#ffffff]">
                <Image
                  className="object-center object-contain scale-90"
                  src={product.images.at(0) || ""}
                  fill
                  alt="prod"
                />
              </div>
              <div>
                <h3 className="text-sm md:text-base">{product.title}</h3>
                <h4>${product.price}</h4>
                <div className="flex items-center gap-3">
                  <h3 className="font-light relative top-[5px] line-through text-xs md:text-sm py-3  text-[#a4a4a4]">
                    $
                    {(
                      product.price +
                      product.price * (product.discountPercentage / 100)
                    ).toFixed(2)}
                  </h3>

                  <p className="text-[10px] relative top-[5px] text-red-500  bg-[#ffffff] p-1 rounded-sm">
                    - {product.discountPercentage}%
                  </p>
                </div>
              </div>
            </div>

            {cartItem?.quantity ? (
              <>
                <Link href="/cart">
                  <Button
                    style={{
                      background:
                        "linear-gradient(to right, black, #1a1a1a, #2a2a2a, #404040, #666666)",
                    }}
                    className=" w-full text-white text-sm mt-4 cursor-pointer "
                  >
                    Checkout (${(cartItem.quantity * product.price).toFixed(2)})
                  </Button>
                </Link>
              </>
            ) : (
              ""
              // <Button
              //   style={{
              //     background:
              //       "linear-gradient(to right, black, #1a1a1a, #2a2a2a, #404040, #666666)",
              //   }}
              //   onClick={addToCart}
              //   className=" w-full text-white text-sm"
              // >
              //   <IoCartOutline />
              //   Add to Cart
              // </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
