import { LoginForm } from "@/components/auth/LoginForm";
import React from "react";
import { FaOpencart } from "react-icons/fa";

export default function page() {
  return (
    <div className="w-[90%]  flex items-center justify-center flex-col gap-4">
      <div className="bg-black rounded-md size-[60px] flex items-center justify-center">
        <FaOpencart className="text-white text-3xl" />
      </div>
      <p className="text-zinc-500">
        Welcome to BR.F.
        <br /> Login to continue
      </p>
      <LoginForm />
    </div>
  );
}
