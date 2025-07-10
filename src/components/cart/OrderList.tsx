import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function OrderList({
  cat,
  setCart,
  cart,
}: {
  cat: Cart;
  cart: Cart[];
  setCart: Dispatch<SetStateAction<Cart[]>>;
}) {
  const [quan, setQuan] = useState(
    cart.find((t) => t.product.id === cat.product.id)?.quantity ?? 1
  );
  useEffect(
    function () {
      if (cat?.quantity < 1) {
        const ct = cart.filter((x) => x.product.id !== cat?.product.id);
        setCart(ct);
        alert("Item has been removed from your cart");
      }
    },
    [cart, cat, setCart]
  );
  function inCreaseQuantity() {
    if (quan >= cat?.product.minimumOrderQuantity) {
      alert("You have reach the maximum order for this item");
    }
    setQuan((q) => (q >= cat?.product.minimumOrderQuantity ? q : q + 1));
    if (cat) {
      setCart((prevCart) => {
        const filtered = prevCart.filter(
          (x) => x.product.id !== cat?.product.id
        );
        const updated = [
          ...filtered,
          {
            ...cat,
            quantity:
              quan >= cat?.product.minimumOrderQuantity ? quan : quan + 1,
          },
        ];
        return updated;
      });
    }
  }
  function deCreaseQuantity() {
    setQuan((q) => q - 1);
    if (cat) {
      setCart((prevCart) => {
        const filtered = prevCart.filter(
          (x) => x.product.id !== cat?.product.id
        );
        const updated = [...filtered, { ...cat, quantity: quan - 1 }];
        return updated;
      });
    }
  }
  return (
    <div className="grid grid-cols-[0.2fr_1fr_0.5fr] gap-2 lg:gap-4 border-b border-zinc-300 pb-1.5 md:pb-2 items-center">
      <Link
        href={`/product/${cat.product.sku}`}
        className="bg-light rounded-md border border-zinc-300  relative flex items-center justify-center aspect-square w-[65px] h-[75px] lg:w-[90px] lg:h-[100px]"
      >
        <Image
          src={cat.product.images.at(0) || ""}
          className=" w-[70%] scale-80 object-center object-contain cursor-pointer"
          alt="order-img"
          fill
        />
      </Link>

      <Link
        href={`/product/${cat.product.sku}`}
        className="flex text-xs md:text-sm flex-col gap-1"
      >
        <h2 className="tetx-dark font-bold text-xs md:text-sm">
          {cat.product.title}
        </h2>
        <p className="text-xs md:text-sm">{cat.product.brand}</p>
        <p className="text-gray-ash text-[10px]">{cat.product.sku}</p>
      </Link>

      <div className=" flex flex-col gap-4 items-end justify-between">
        <h6 className="text-dark font-semibold text-xs md:text-sm">
          ${(cat.quantity * cat.product.price).toFixed(2)}
        </h6>
        <div className="flex items-center  gap-1">
          <button
            style={{
              background:
                "linear-gradient(to top, black, #1a1a1a, #2a2a2a, #404040, #666666)",
            }}
            onClick={deCreaseQuantity}
            className="size-[20px] md:size-[25px] flex items-center justify-center cursor-pointer pb-1 text-white rounded-full"
          >
            -
          </button>
          <p className="bg-light size-[20px] md:size-[25px] rounded-[2px] text-xs md:text-sm flex items-center justify-center">
            {cat.quantity}
          </p>
          <button
            style={{
              background:
                "linear-gradient(to top, black, #1a1a1a, #2a2a2a, #404040, #666666)",
            }}
            onClick={inCreaseQuantity}
            className="size-[20px] md:size-[25px] flex items-center justify-center cursor-pointer pb-0.5 text-white rounded-full"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
