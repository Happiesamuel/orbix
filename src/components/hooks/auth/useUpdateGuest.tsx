"use client";

import { updateGuest } from "@/lib/action";
import { useMutation } from "@tanstack/react-query";

export function useUpdateGuest() {
  const { mutate: update, status } = useMutation({
    mutationFn: async (obj: { id: string; obj: { isVerified: boolean } }) =>
      await updateGuest(obj),
  });

  return { update, status };
}
