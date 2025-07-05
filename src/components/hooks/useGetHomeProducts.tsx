"use client";

import { getProductCategory } from "@/lib/action";
import { useQuery } from "@tanstack/react-query";

export default function useGetHomeProduct(category: string, key?: string) {
  const { data: product, status } = useQuery({
    queryFn: async () => await getProductCategory(category),
    queryKey: ['products', key, category],
  });

  return { product, status };
}
