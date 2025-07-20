"use client";

import { loginUser } from "@/lib/action";
import { useMutation } from "@tanstack/react-query";

export function useLogin() {
  const {
    mutate: login,
    status,
  } = useMutation({
    mutationFn: async (obj: { email: string; password: string }) =>
      await loginUser(obj),
  });

  return { login, status };
}
