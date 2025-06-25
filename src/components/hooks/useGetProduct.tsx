"use client";
import { getProdouct } from "@/lib/action";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function useGetProduct() {
  const { productId } = useParams();
  const { data: product, status } = useQuery({
    queryFn: async () => await getProdouct(productId as string),
    queryKey: ["product", productId],
    enabled: !!productId,
  });
  return { product, status };
}
