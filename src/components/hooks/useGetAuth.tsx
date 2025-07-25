"use client";
import { auth } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";

export default function useGetAuth() {
  const { data, status } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => await auth(),
  });
  return { data, status };
}
