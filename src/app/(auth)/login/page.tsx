"use client";

import LoginPage from "@/components/auth/LoginPage";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<p>load...</p>}>
      <LoginPage />
    </Suspense>
  );
}
