import CatBreadCumb from "@/components/category/CatBreadCumb";
import CategoryList from "@/components/category/CategoryList";
import MainMobileCatlist from "@/components/category/MainMobileCatlist";

import React from "react";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col  w-full h-full">
      <CatBreadCumb />
      <div className="grid  min-h-screen lg:grid-cols-[10rem_1fr]">
        <div className="hidden lg:block">
          <CategoryList />
        </div>
        <div className="block lg:hidden">
          <MainMobileCatlist />
        </div>
        <div className="lg:mx-8">{children}</div>
      </div>
    </div>
  );
}
