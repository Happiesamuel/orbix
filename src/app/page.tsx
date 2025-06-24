import { getProdoucts } from "@/lib/action";
import Link from "next/link";
import React from "react";

export default async function page() {
  const a = await getProdoucts();
  console.log(a);
  return (
    <div>
      {a.products.map((product) => (
        <Link href={`/product/${product.id}`}>{product.title}</Link>
      ))}
    </div>
  );
}
