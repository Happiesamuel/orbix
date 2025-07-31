"use client";
import { signOutAction } from "@/lib/action";
import React from "react";

export default function Page() {
  return (
    <div>
      page
      <p  onClick={async () => await signOutAction()}>
        sign
      </p>
    </div>
  );
}
