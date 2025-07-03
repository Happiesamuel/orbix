import React from "react";
import MobileCatlist from "./MobileCatlist";
import { getCategory } from "@/lib/action";

export default async function MainMobileCatlist() {
  const categories = await getCategory();
  return (
    <div>
      <MobileCatlist categories={categories} />
    </div>
  );
}
