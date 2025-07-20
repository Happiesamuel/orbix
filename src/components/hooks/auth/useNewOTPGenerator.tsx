"use client";

import { generateNewOtp } from "@/lib/action";
import { useMutation } from "@tanstack/react-query";

export default function useNewOTPGenerator() {
  const { mutate: generate, status } = useMutation({
    mutationFn: async (obj: { email: string; id: string }) =>
      await generateNewOtp(obj),
  });

  return { generate, status };
}
