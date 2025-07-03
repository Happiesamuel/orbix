"use client";
import { getProductCategory } from "@/lib/action";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function useGetCategory() {
  const { slug } = useParams();
  const { data: category, status } = useQuery({
    queryFn: async () => await getProductCategory(slug as string),
    queryKey: ["category", slug],
    enabled: !!slug,
  });
  return { category, status };
}
