"use client";
import React from "react";
import AuthHeader from "@/components/auth/AuthHeader";
import { LoginForm } from "@/components/auth/LoginForm";
import OtherLoginOption from "@/components/auth/OtherLoginOption";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import {
  loginInWithFacebookAction,
  loginInWithGoogleAction,
} from "@/lib/action";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (error === "NoAccount") {
      setTimeout(function () {
        toast("Account not Found!", {
          description: "No account found for this email.",
          duration: 4000,
          closeButton: true,
        });
      }, 1000);
    } else if (error === "ServerError") {
      setTimeout(function () {
        toast("Server Error", {
          description: "Please try again.",
          duration: 4000,
          closeButton: true,
        });
      }, 1000);
    }
  }, [error]);

  async function loginWithProvider(provider: string) {
    return provider === "google"
      ? await loginInWithGoogleAction()
      : await loginInWithFacebookAction();
  }

  return (
    <div className="w-[90%]  flex items-center justify-center flex-col gap-2">
      <AuthHeader />
      <LoginForm />
      <div className="w-full flex-col pt-4 gap-4 items-center relative flex justify-center">
        <p
          className="relative flex items-center justify-center w-full text-gray-500 text-sm
    before:content-[''] before:absolute before:left-[15%] md:before:left-[20%] before:w-[20%] before:h-[1px] before:bg-zinc-300
    after:content-[''] after:absolute after:right-[15%] md:after:right-[20%] after:w-[20%] after:h-[1px] after:bg-zinc-300"
        >
          Login with
        </p>

        <div className="flex items-center scale-[0.9] md:scale-100  md:w-full justify-center gap-2 md:gap-6 ">
          <OtherLoginOption
            onclick={() => loginWithProvider("google")}
            content="Login"
            color="#7b0d06"
            name="Google"
            type="google"
          />
          <OtherLoginOption
            onclick={() => loginWithProvider("facebook")}
            content="Login"
            color="#1d203b"
            name="Facebook"
            type="facebook"
          />
        </div>
      </div>
    </div>
  );
}
