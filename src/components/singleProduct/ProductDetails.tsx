import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { IoCartOutline } from "react-icons/io5";
import useRecentView from "../hooks/useRecentView";

export default function ProductDetails({
  product,
  cart,
  setCart,
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
  const [quan, setQuan] = useState(
    cart.find((cat) => cat.product.id === product.id)?.quantity ?? 1
  );
  const cartItem = cart.find((cat) => cat.product.id === product.id);
  useEffect(
    function () {
      if (!cartItem) return;
      if (cartItem?.quantity < 1) {
        const cat = cart.filter((x) => x.product.id !== cartItem?.product.id);
        setCart(cat);
        alert("Item has been removed from your cart");
      }
    },
    [quan, setCart, cartItem, cart]
  );

  function inCreaseQuantity() {
    if (!cartItem) return;
    if (quan >= cartItem?.product.minimumOrderQuantity) {
      alert("You have reach the maximum order for this item");
    }
    setQuan((q) => (q >= cartItem?.product.minimumOrderQuantity ? q : q + 1));
    if (cartItem) {
      setCart((prevCart) => {
        const filtered = prevCart.filter(
          (x) => x.product.id !== cartItem?.product.id
        );
        const updated = [
          ...filtered,
          {
            ...cartItem,
            quantity:
              quan >= cartItem?.product.minimumOrderQuantity ? quan : quan + 1,
          },
        ];
        return updated;
      });
    }
  }
  function deCreaseQuantity() {
    setQuan((q) => q - 1);
    if (cartItem) {
      setCart((prevCart) => {
        const filtered = prevCart.filter(
          (x) => x.product.id !== cartItem?.product.id
        );
        const updated = [...filtered, { ...cartItem, quantity: quan - 1 }];
        return updated;
      });
    }
  }

  function addToCart() {
    const newObj = {
      product: product,
      quantity: 1,
    };
    setCart((i) =>
      i.some((x: Cart) => x.product.id === product.id) ? [...i] : [...i, newObj]
    );
    setQuan(1);
  }
  return (
    <div>
      <h2 className="font-bold pb-1.5 text-[#010101] text-sm">
        Product details & Specifications
      </h2>
      <div className="py-4 md:py-6 gap-5 flex flex-col justify-between md:flex-row w-full">
        <div className="w-full mx-auto md:mx-0 lg:max-w-[35%] max-w-[95%] md:w-[55%]">
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
          <div className="flex gap-3 flex-col bg-[#f2f0ea] rounded-md shadow shadow-zinc-400 h-max p-4 w-full lg:w-[50%]">
            <div className="flex  gap-5">
              <div className="relative size-[80px]  rounded-xl bg-[#ffffff]">
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
                  <h3 className="font-light relative top-[5px] line-through text-xs md:text-sm py-3 md:py-5 text-[#a4a4a4]">
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
          <div className="flex gap-3 items-center">
            <div className="flex items-center  gap-1 lg:gap-2">
              <button
                style={{
                  background:
                    "linear-gradient(to top, black, #1a1a1a, #2a2a2a, #404040, #666666)",
                }}
                onClick={deCreaseQuantity}
                className="size-[20px] md:size-[25px] lg:size-[30px] flex items-center justify-center cursor-pointer pb-1 text-white rounded-full"
              >
                -
              </button>
              <p className="bg-light size-[20px] md:size-[25px] lg:size-[30px] rounded-[2px] text-xs md:text-sm flex items-center justify-center">
                {cartItem.quantity}
              </p>
              <button
                style={{
                  background:
                    "linear-gradient(to top, black, #1a1a1a, #2a2a2a, #404040, #666666)",
                }}
                onClick={inCreaseQuantity}
                className="size-[20px] md:size-[25px] lg:size-[30px] flex items-center justify-center cursor-pointer pb-0.5 text-white rounded-full"
              >
                +
              </button>
            </div>
            <p className="text-sm text-zinc-500">
              ({" "}
              <span className="font-semibold text-base text-dark">
                {cartItem?.quantity}
              </span>{" "}
              item{cartItem?.quantity === 1 ? "" : "s"} added )
            </p>
          </div>
        ) : (
          <Button
              style={{
                background:
                  "linear-gradient(to right, black, #1a1a1a, #2a2a2a, #404040, #666666)",
              }}
              onClick={addToCart}
              className=" w-full text-white text-sm"
            >
              <IoCartOutline />
              Add to Cart
            </Button>
        )}



           
          </div>
        </div>
      </div>
    </div>
  );
}
