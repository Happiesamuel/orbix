"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { forgottenPasswordFormSchema } from "@/lib/schemas";
import ButtonLoader from "../loaders/ButtonLoader";
import { toast } from "sonner";
import { useState } from "react";
import { Input } from "../ui/input";
import { account } from "@/lib/appwriteClient";

export function ForgottenPassowrd() {
  const [load, setLoad] = useState(false);
  const form = useForm<z.infer<typeof forgottenPasswordFormSchema>>({
    resolver: zodResolver(forgottenPasswordFormSchema),
  });

  async function onSubmit(values: z.infer<typeof forgottenPasswordFormSchema>) {
    try {
      setLoad(true);
      await account.createRecovery(
        values.email,
        `${process.env.NEXT_PUBLIC_URL!}/reset-password`
      );
      setLoad(false);
      toast("Recovery email sent", {
        description: "Please check your email for the recovery link.",
        duration: 4000,
        closeButton: true,
      });
    } catch (error) {
      setLoad(false);
      const err = error as Error;
      toast("Error sending recovery email", {
        description: err.message,
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
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold">Email</FormLabel>
              <FormControl>
                <Input
                  className="text-sm"
                  type="email"
                  placeholder="Enter your email"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          style={{
            background:
              "linear-gradient(to top, black, #1a1a1a, #2a2a2a, #404040, #666666)",
          }}
          type="submit"
          className="text-white w-full"
        >
          {load ? <ButtonLoader /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
