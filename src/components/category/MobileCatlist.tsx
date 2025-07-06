"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import React, { useState } from "react";
import useGetProducts from "../hooks/useGetProducts";
import CatList from "./CatList";
import { BiCategory } from "react-icons/bi";
export default function MobileCatlist({
  categories,
}: {
  categories: Category[];
}) {
  const [value, setValue] = useState("");
  const { products, status } = useGetProducts();
  if (status === "pending")
    return <div className="fle flex-col hidden fixed w-max  ">Loading...</div>;
  const cat = [
    {
      slug: "all",
      name: `All Categories (${products.products.length})`,
    },
    ...categories,
  ];

  return (
    <Sheet>
      <SheetTrigger className="block  lg:hidden text-2xl bg-light p-2 border border-zinc-300 fixed bottom-[10%] right-[5%] z-50 cursor-pointer rounded-full">
        <BiCategory />
      </SheetTrigger>
      <SheetContent className="block  lg:hidden w-[200px] z-50">
        <SheetHeader>
          <div className="flex flex-col fixed w-max items-center justify-center    h-[95vh]">
            <div className="flex justify-center bg-light rounded-2xl px-2 py-2 border border-zinc-300 items-center h-[80vh]">
              <div className="flex flex-col py-4  overflow-y-scroll h-full hide-scrollbar  cursor-pointer ">
                {cat.map((category) => (
                  <SheetClose key={category.slug} asChild>
                    <CatList
                      product={products.products}
                      key={category.slug}
                      category={category}
                      value={value}
                      setValue={setValue}
                    />
                  </SheetClose>
                ))}
              </div>
            </div>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
