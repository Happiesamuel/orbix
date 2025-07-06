import CatalogLayout from "@/components/catalog/CatalogLayout";
import React, { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <CatalogLayout />
    </Suspense>
  );
}
