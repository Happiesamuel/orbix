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
import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { account } from "@/lib/appwriteClient";

const COOLDOWN_DURATION = 300; // in seconds

export function ForgottenPassword() {
  const [load, setLoad] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const form = useForm<z.infer<typeof forgottenPasswordFormSchema>>({
    resolver: zodResolver(forgottenPasswordFormSchema),
    defaultValues: { email: "" },
  });

  useEffect(() => {
    const endTimestamp = localStorage.getItem("passwordRecoveryCooldownEnd");
    if (endTimestamp) {
      const remaining = Math.floor(
        (parseInt(endTimestamp) - Date.now()) / 1000
      );
      if (remaining > 0) {
        setCooldown(remaining);
      } else {
        localStorage.removeItem("passwordRecoveryCooldownEnd");
      }
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    } else {
      localStorage.removeItem("passwordRecoveryCooldownEnd");
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  async function onSubmit(values: z.infer<typeof forgottenPasswordFormSchema>) {
    try {
      setLoad(true);
      const resetURL = `${process.env.NEXT_PUBLIC_URL ?? "https://oorbix.vercel.app"}/reset-password`;
      await account.createRecovery(values.email, resetURL);
      setLoad(false);

      // Set cooldown
      const end = Date.now() + COOLDOWN_DURATION * 1000;
      localStorage.setItem("passwordRecoveryCooldownEnd", end.toString());
      setCooldown(COOLDOWN_DURATION);

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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

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
          type="submit"
          disabled={load || cooldown > 0}
          className="text-white w-full"
          style={{
            background:
              "linear-gradient(to top, black, #1a1a1a, #2a2a2a, #404040, #666666)",
          }}
        >
          {load ? <ButtonLoader /> : cooldown > 0 ? `Wait ${formatTime(cooldown)}` : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
