"use client";
import { getProdoucts } from "@/lib/action";
import { useQuery } from "@tanstack/react-query";

export default function useGetProducts() {
  const { data: products, status } = useQuery({
    queryFn: async () => await getProdoucts(),
    queryKey: ["products"],
  });
  return { products, status };
}
