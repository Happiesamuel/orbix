"use client";
import React, { useEffect } from "react";
import AuthHeader from "@/components/auth/AuthHeader";
import OtherLoginOption from "@/components/auth/OtherLoginOption";
import { SignupForm } from "@/components/auth/SignupForm";
import {
  getGuestViaUserId,
  signUpWithFacebookAction,
  signUpWithGoogleAction,
} from "@/lib/action";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { account } from "@/lib/appwriteClient";

export default function SignupPage() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const userId = searchParams.get("userId");
  const router = useRouter();

  useEffect(() => {
    async function checkUserId() {
      try {
        const guest = await getGuestViaUserId(userId!);
        await account.createMagicURLToken(
          userId!,
          guest.email,
          `${process.env.NEXT_PUBLIC_URL!}/set-password?userId=${guest.userId}`
        );
        toast("Check your email!", {
          description:
            "A link has been sent to your email to set your password.",
          duration: 4000,
          closeButton: true,
        });
      } catch (error) {
        toast("Server Error", {
          description: "Please try again." + (error as Error).message,
          duration: 4000,
          closeButton: true,
        });
      }
    }
    if (userId) {
      checkUserId();
    }
  }, [userId]);

  useEffect(() => {
    if (success === "true") {
      setTimeout(function () {
        toast("Account successfully created!", {
          description: "Login to continue.",
          duration: 4000,
          closeButton: true,
        });

        router.push(`/login`);
        // router.push(`/set-password?userId=${userId}`);
      }, 1000);
    } else if (success === "ServerError") {
      setTimeout(function () {
        toast("Server Error", {
          description: "Please try again.",
          duration: 4000,
          closeButton: true,
        });
      }, 1000);
    }
  }, [success, router, userId]);

  async function loginWithProvider(provider: string) {
    try {
      const params = new URLSearchParams(searchParams);
      params.set("from", "sign-up");
      router.push(`/sign-up?${params.toString()}`);
      if (provider === "google") {
        await signUpWithGoogleAction();
      } else {
        await signUpWithFacebookAction();
      }
    } catch (error) {
      const err = error as Error;
      toast("Server Error", {
        description: "Please try again." + err.message,
        duration: 4000,
        closeButton: true,
      });
    }
  }

  return (
    <div className="w-[90%]  flex items-center justify-center flex-col gap-2">
      <AuthHeader />
      <SignupForm />
      <div className="w-full flex-col pt-4 gap-4 items-center relative flex justify-center">
        <p
          className="relative flex items-center justify-center w-full text-gray-500 text-sm
    before:content-[''] before:absolute before:left-[15%] md:before:left-[20%] before:w-[20%] before:h-[1px] before:bg-zinc-300
    after:content-[''] after:absolute after:right-[15%] md:after:right-[20%] after:w-[20%] after:h-[1px] after:bg-zinc-300"
        >
          Sign up with
        </p>

        <div className="flex items-center scale-[0.9] md:scale-100  md:w-full justify-center gap-2 md:gap-6 ">
          <OtherLoginOption
            onclick={() => loginWithProvider("google")}
            content="Sign up"
            color="#7b0d06"
            name="Google"
            type="google"
          />
          <OtherLoginOption
            onclick={() => loginWithProvider("facebook")}
            content="Sign up"
            color="#1d203b"
            name="Facebook"
            type="facebook"
          />
        </div>
      </div>
    </div>
  );
}
