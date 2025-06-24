import Header from "@/components/layout/Header";
import { getProdouct } from "@/lib/action";
import Image from "next/image";
import React from "react";

export default async function page({ params }) {
  const { productId } = await params;
  const product = await getProdouct(productId);
  console.log(product);
  return (
    <div>
      <Header />
      {/* <div>
        {product.images.map((img) => (
          <Image key={img} src={img} width={200} height={200} alt="prod" />
        ))}
      </div> */}
    </div>
  );
}
