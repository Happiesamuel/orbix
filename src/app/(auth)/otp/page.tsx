"use client";
import AuthHeader from "@/components/auth/AuthHeader";
import OTPForm from "@/components/auth/OTPForm";
import React from "react";

export default function Page() {
  return (
    <div className="w-[90%]  flex items-center justify-center flex-col gap-2">
      <AuthHeader />
      <OTPForm />
    </div>
  );
}
