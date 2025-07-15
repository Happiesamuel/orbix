"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Field from "./Field";
import { loginFormSchema } from "@/lib/schemas";
import Link from "next/link";

export function LoginForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 pt-4 w-full md:w-[70%]"
      >
        <Field
          name="username"
          type="text"
          placeholder="Enter your username"
          label="Username"
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
          Submit
        </Button>
      </form>
    </Form>
  );
}
