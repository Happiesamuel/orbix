"use client";
import { getProdouct } from "@/lib/action";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import useGetProducts from "./useGetProducts";
import { useEffect, useState } from "react";

export default function useGetProduct() {
  const { productId } = useParams();
  const { products, status: prodStat } = useGetProducts();
  const [id, setId] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(
    function () {
      if (prodStat === "success") {
        const prod = products.products.find(
          (prod: Product) => prod.sku === productId
        );
        if (!prod) setError("Product Doesn't Exist!");
        else setId(prod.id);
      }
    },
    [prodStat, products, productId]
  );

  const { data: product, status } = useQuery({
    queryFn: async () => await getProdouct(id),
    queryKey: ["product", productId],
    enabled: !!productId && !!id && prodStat === "success",
  });

  return { product, status, error };
}
