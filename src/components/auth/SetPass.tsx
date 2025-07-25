"use client";
import React from "react";
import AuthHeader from "./AuthHeader";
import { SetPassword } from "./SetPassword";

export default function SetPass() {
  return (
    <div className="w-[90%]  flex items-center justify-center flex-col gap-2">
      <AuthHeader />
      <SetPassword />
    </div>
  );
}
