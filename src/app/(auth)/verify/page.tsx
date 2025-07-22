import VerifyPage from "@/components/auth/VerifyPage";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={<p>loading...</p>}>
      <VerifyPage />
    </Suspense>
  );
}
