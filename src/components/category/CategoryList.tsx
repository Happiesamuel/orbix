import { getCategory } from "@/lib/action";
import React from "react";
import MainCatList from "./MainCatList";

export default async function CategoryList() {
  const categories = await getCategory();
  return <MainCatList categories={categories} />;
}
