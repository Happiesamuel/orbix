"use client";

import SignupPage from "@/components/auth/SignupPage";
import { Suspense } from "react";

export default function Page() {
  
  return (
    <Suspense fallback={<p>load...</p>}>
      <SignupPage />
    </Suspense>
  );
}
