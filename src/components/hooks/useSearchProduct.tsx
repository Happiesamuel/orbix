"use client";
import { getProdoucts, searchProduct } from "@/lib/action";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export default function useSearchProduct() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const { data: product, status } = useQuery({
    queryFn: async () =>
      query.length === 0
        ? await getProdoucts()
        : await searchProduct(query as string),
    queryKey: ["search", query],
  });
  return { product, status };
}
