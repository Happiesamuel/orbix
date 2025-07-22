"use client";

import Reset from "@/components/auth/Reset";
import React, { Suspense } from "react";

export default function Page() {
  return (
    <Suspense>
      <Reset />
    </Suspense>
  );
}
