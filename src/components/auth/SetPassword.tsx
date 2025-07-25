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
import { setPasswordFormSchema } from "@/lib/schemas";
import ButtonLoader from "../loaders/ButtonLoader";
import { toast } from "sonner";
import { useState } from "react";
import { Input } from "../ui/input";
import { account } from "@/lib/appwriteClient";
import { useRouter, useSearchParams } from "next/navigation";
import { getGuestViaUserId, updateGuest } from "@/lib/action";

export function SetPassword() {
  const [load, setLoad] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const form = useForm<z.infer<typeof setPasswordFormSchema>>({
    resolver: zodResolver(setPasswordFormSchema),
  });
  const userId = searchParams.get("userId") || "";
  const secret = searchParams.get("secret") || "";

  async function onSubmit(values: z.infer<typeof setPasswordFormSchema>) {
    try {
      setLoad(true);
      const guest = await getGuestViaUserId(userId);
      if (!guest) throw new Error("Guest not found");
      await account.createSession(userId, secret);
      await account.get();
      await account.updatePassword(values.password);
      await updateGuest({
        id: guest.$id,
        obj: { password: values.password },
      });

      setLoad(false);
      toast("Password set uccessfully", {
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
          disabled={load}
          type="submit"
          className="text-white w-full"
        >
          {load ? <ButtonLoader /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
