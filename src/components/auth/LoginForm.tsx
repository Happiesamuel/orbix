"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Field from "./Field";
import { loginFormSchema } from "@/lib/schemas";
import Link from "next/link";
import { useLogin } from "../hooks/auth/useLogin";
import ButtonLoader from "../loaders/ButtonLoader";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getGuestViaEmail } from "@/lib/action";
import { useState } from "react";

export function LoginForm() {
  const [load, setLoad] = useState(false);
  const { login, status } = useLogin();
  const router = useRouter();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    try {
      setLoad(true);
      const existingUser = await getGuestViaEmail(values.email);
      setLoad(false);
      if (!existingUser) {
        return toast("Error logging in", {
          description: "User not found",
          duration: 4000,
          closeButton: true,
        });
      } else if (existingUser.password !== values.password) {
        return toast("Error logging in", {
          description: "User Password is incorrect!",
          duration: 4000,
          closeButton: true,
        });
      } else
        login(values, {
          onSuccess: () => {
            toast("Signed in successfully", {
              description: "User is signed in!",
              duration: 4000,
              closeButton: true,
            });
            router.push("/");
          },
          onError: (err) =>
            toast("Error logging in", {
              description: err.message,
              duration: 4000,
              closeButton: true,
            }),
        });
    } catch (error) {
      setLoad(false);
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 pt-4 w-full md:w-[70%]"
      >
        <Field
          name="email"
          type="email"
          placeholder="Enter your email"
          label="Email"
          control={form.control}
        />
        <div>
          <Field
            name="password"
            type="password"
            placeholder="Enter your password"
            label="Password"
            control={form.control}
          />
          <div className="flex items-end justify-between py-2">
            <Link href="/forgot-password" className="text-xs cursor-pointer">
              Forgotten Password?
            </Link>
            <Link href="/sign-up" className="text-xs cursor-pointer">
              Don&apos;t have an account? Sign up
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
          {status === "pending" || load ? <ButtonLoader /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
