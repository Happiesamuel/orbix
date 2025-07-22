"use client";
import { account } from "@/lib/appwriteClient";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function useVerify(push: string) {
  const [verify, setVerify] = useState(false);
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");
  const router = useRouter();
  async function verifyEmail() {
    if (!userId || !secret) {
      toast("Invalid verification link", {
        description: "Missing userId or secret in the URL.",
      });
      return;
    }
    try {
      setVerify(true);
      await account.updateVerification(userId, secret);
      setVerify(false);

      toast("Email verified successfully!", {
        description: "You can now place orders and access your account.",
        duration: 4000,
        closeButton: true,
      });
      router.push(push);
    } catch (err) {
      const error = err as Error;

      toast("Verification failed", {
        description: error.message + ". Please try again later.",
        duration: 4000,
        closeButton: true,
      });
      return;
    }
  }

  return { verifyEmail, verify };
}
