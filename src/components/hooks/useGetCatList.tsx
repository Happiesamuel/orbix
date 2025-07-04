"use client";
import { getCategory } from "@/lib/action";
import { useQuery } from "@tanstack/react-query";

export default function useGetCatList
() {
  const { data: category, status } = useQuery({
    queryFn: async () => await getCategory(),
    queryKey: ["catlist"],
  });
  return { category, status };
}
