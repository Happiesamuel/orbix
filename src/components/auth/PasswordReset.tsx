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
import { recoverPasswordFormSchema } from "@/lib/schemas";
import ButtonLoader from "../loaders/ButtonLoader";
import { toast } from "sonner";
import { useState } from "react";
import { Input } from "../ui/input";
import { account } from "@/lib/appwriteClient";
import { useRouter, useSearchParams } from "next/navigation";
import { getGuestViaUserId, updateGuest } from "@/lib/action";

export function PasswordReset() {
  const [load, setLoad] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");

  const form = useForm<z.infer<typeof recoverPasswordFormSchema>>({
    resolver: zodResolver(recoverPasswordFormSchema),
  });

  async function onSubmit(values: z.infer<typeof recoverPasswordFormSchema>) {
    try {
      if (!userId || !secret) {
        toast("Invalid recovery link", {
          description: "Please check the link and try again.",
          duration: 4000,
          closeButton: true,
        });
        return;
      }
      setLoad(true);
      await account.updateRecovery(userId, secret, values.password);
      const guest = await getGuestViaUserId(userId);
      if (guest) {
        await updateGuest({
          id: guest.$id,
          obj: { password: values.password },
        });
      }
      setLoad(false);
      toast("Password reset successfully", {
        description: "You can now log in with your new password.",
        duration: 4000,
        closeButton: true,
      });
      router.push("/login");
    } catch (error) {
      setLoad(false);
      const err = error as Error;
      toast("Error setting new password", {
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold">Password</FormLabel>
              <FormControl>
                <Input
                  className="text-sm"
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold">
                Confirm Password
              </FormLabel>
              <FormControl>
                <Input
                  className="text-sm"
                  type="password"
                  placeholder="Confirm your password"
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
