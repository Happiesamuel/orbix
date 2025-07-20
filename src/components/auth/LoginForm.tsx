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

export function LoginForm() {
  const { login, status } = useLogin();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });

  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    login(values, {
      onSuccess: () => console.log("sfsf"),
      onError: (err) =>
        toast('Error logging in', {
          description: err.message,
          duration: 4000,
          closeButton: true,
        }),
    });
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
            <p className="text-xs ">Forgotten Password?</p>
            <Link href="/sign-up" className="text-xs ">
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
          {status === "pending" ? <ButtonLoader /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
