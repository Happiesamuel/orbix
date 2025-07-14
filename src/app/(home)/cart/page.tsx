"use client";
import Orders from "@/components/cart/Orders";
import RecentView from "@/components/cart/RecentView";
import ShoppingForm from "@/components/cart/ShoppingForm";
import useCart from "@/components/hooks/useCart";
import useRecentView from "@/components/hooks/useRecentView";
import { BreadcrumbWithCustomSeparator } from "@/components/layout/BreadCumb";
import React from "react";

export default function Page() {
  const { recentView } = useRecentView();
  const { cart, setCart } = useCart();
  const array = [
    {
      route: "/",
      name: "Home",
    },
    {
      route: "/cart",
      name: "Cart",
    },
  ];
  return (
    <div>
      <div className="pt-3">
        <BreadcrumbWithCustomSeparator array={array} />
      </div>
      <div className="w-full lg:w-[90%] mx-auto py-4 lg:py-12 flex flex-col lg:flex-row justify-between gap-6 h-full ">
        <Orders cart={cart} setCart={setCart} />
        <ShoppingForm cart={cart} />
      </div>
      {recentView.length ? <RecentView recentView={recentView} /> : ""}
    </div>
  );
}
