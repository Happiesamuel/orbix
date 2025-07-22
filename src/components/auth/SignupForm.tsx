"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { signupFormSchema } from "@/lib/schemas";
import Link from "next/link";
import SignupField from "./SignupField";
import { useCreateUser } from "../hooks/auth/useCreateUser";
import ButtonLoader from "../loaders/ButtonLoader";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { account } from "@/lib/appwriteClient";

export function SignupForm() {
  const { create, status } = useCreateUser();
  const router = useRouter();
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
  });

  async function onSubmit(values: z.infer<typeof signupFormSchema>) {
    try {
      const newVal = {
        email: values.email,
        password: values.password,
        name: values.username,
      };
      create(newVal, {
        onSuccess: async () => {
          await account.createEmailPasswordSession(
            values.email,
            values.password
          );
          await account.createVerification(
            `${process.env.NEXT_PUBLIC_URL!}/verify`
          );
          toast("User created successfully", {
            description:
              "A verification link has been sent to your email address.",
            duration: 4000,
            closeButton: true,
          });
          router.push("/login");
        },
        onError: (err) =>
          toast("Error Signing up", {
            description: err.message,
            duration: 4000,
            closeButton: true,
          }),
      });
    } catch (error) {
      toast("Error Signing up", {
        description: (error as Error).message,
        duration: 4000,
        closeButton: true,
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 pt-4 w-full md:w-[70%]"
      >
        <SignupField
          name="username"
          type="text"
          placeholder="Enter your username"
          label="Username"
          control={form.control}
        />
        <SignupField
          name="email"
          type="email"
          placeholder="Enter your email"
          label="Email"
          control={form.control}
        />

        <SignupField
          name="password"
          type="password"
          placeholder="Enter your password"
          label="Password"
          control={form.control}
        />
        <div>
          <SignupField
            name="confirmPassword"
            type="password"
            placeholder="Enter your password"
            label="Confirm Password"
            control={form.control}
          />
          <div className="flex items-end justify-end py-2">
            <Link href="/login" className="text-xs ">
              Already have an account? Login
            </Link>
          </div>
        </div>
        <Button
          style={{
            background:
              "linear-gradient(to top, black, #1a1a1a, #2a2a2a, #404040, #666666)",
          }}
          type="submit"
          className="text-white w-full"
        >
          {status === "pending" ? <ButtonLoader /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
