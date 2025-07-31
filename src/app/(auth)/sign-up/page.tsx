import SignupPage from "@/components/auth/SignupPage";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Page() {
  const session = await auth();
  if (session?.user) redirect("/");
  return (
    <Suspense fallback={<p>load...</p>}>
      <SignupPage />
    </Suspense>
  );
}
