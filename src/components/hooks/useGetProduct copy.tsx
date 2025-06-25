"use client";
import { getProductCategory } from "@/lib/action";
import { useQuery } from "@tanstack/react-query";
import ProductCategory from "../singleProduct/ProductCategory";

export default function useGetProductCategory(category:string) {
  const { data: product, status } = useQuery({
    queryFn: async () => await getProductCategory(category),
    queryKey: ["productCategory", ProductCategory],
  });
  return { product, status };
}
