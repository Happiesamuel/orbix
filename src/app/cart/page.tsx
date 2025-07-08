"use client";
import Orders from "@/components/cart/Orders";
import RecentView from "@/components/cart/RecentView";
import ShoppingForm from "@/components/cart/ShoppingForm";
import useCart from "@/components/hooks/useCart";
import useRecentView from "@/components/hooks/useRecentView";
import React from "react";

export default function Page() {
  const { recentView } = useRecentView();
  const { cart, setCart } = useCart();
  return (
    <div>
      <div className="w-full lg:w-[90%] mx-auto py-4 lg:py-12 flex flex-col lg:flex-row justify-between gap-6 h-full ">
        <Orders cart={cart} setCart={setCart} />
        <ShoppingForm cart={cart} />
      </div>
      {recentView.length ? <RecentView recentView={recentView} /> : ""}
    </div>
  );
}
