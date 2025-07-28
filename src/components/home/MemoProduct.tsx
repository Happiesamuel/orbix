import React, { useMemo, useState } from "react";
import Product from "../layout/Product";

export default function MemoProduct({
  product,
  slice,
}: {
  slice: number;
  product: Product[];
}) {
  const [active, setActive] = useState<number | null>(null);
  const filProduct = useMemo(() => {
    return product
      .slice()
      .sort(() => 0.5 - Math.random())
      .slice(0, slice);
  }, [product, slice]);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-y-3  md:gap-y-4 lg:gap-y-6 gap-3 md:gap-4 place-items-center pt-2 pb-4">
      {filProduct.map((product: Product) => (
        <Product
          type="home"
          setActive={setActive}
          active={active}
          product={product}
          key={product.id}
        />
      ))}
    </div>
  );
}
