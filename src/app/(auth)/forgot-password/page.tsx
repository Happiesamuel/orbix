import AuthHeader from "@/components/auth/AuthHeader";
import { ForgottenPassword } from "@/components/auth/ForgottenPassword";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page() {
  const session = await auth();
  if (session?.user) redirect("/");
  return (
    <div className="w-[90%]  flex items-center justify-center flex-col gap-2">
      <AuthHeader />
      <ForgottenPassword />
    </div>
  );
}
