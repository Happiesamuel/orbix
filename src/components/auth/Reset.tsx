import React from "react";
import AuthHeader from "@/components/auth/AuthHeader";
import { PasswordReset } from "@/components/auth/PasswordReset";
export default function Reset() {
  return (
    <div className="w-[90%]  flex items-center justify-center flex-col gap-2">
      <AuthHeader />
      <PasswordReset />
    </div>
  );
}
