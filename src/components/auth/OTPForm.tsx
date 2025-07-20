"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { getOtp } from "@/lib/action";
import { useState } from "react";
import ButtonLoader from "../loaders/ButtonLoader";
import useNewOTPGenerator from "../hooks/auth/useNewOTPGenerator";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function OTPForm() {
  const [load, setLoad] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const { generate } = useNewOTPGenerator();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoad(true);
      const allOtps = await getOtp();
      const req = allOtps.find((x) => x.otp === data.pin);
      setLoad(false);
      if (!req) {
        return toast("Invalid OTP", {
          description: "The OTP you entered is incorrect!",
          duration: 4000,
          closeButton: true,
        });
      }
      const createdAt = new Date(req.$createdAt);
      const now = new Date();
      const diffInMinutes = (now.getTime() - createdAt.getTime()) / (1000 * 60);

      if (diffInMinutes > 5) {
        return toast("OTP Expired", {
          description: "The OTP you entered is expired!",
          duration: 4000,
          closeButton: true,
        });
      } else {
        localStorage.removeItem("guest");
        router.push("/login");
        return toast("OTP Successful", {
          description: "Verification complete",
          duration: 4000,
          closeButton: true,
        });
      }
    } catch (err) {
      console.log(err);
      setLoad(false);
    }
  }

  const handleClick = async () => {
    setDisabled(true);
    setTimeLeft(60);

    await otpGenerate();
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  async function otpGenerate() {
    const data = localStorage.getItem("guest");
    if (!data) return;
    else {
      const store = JSON.parse(data);
      generate(
        { email: store.email, id: store.$id },
        {
          onSuccess: () => {
            toast("Otp generated successfully", {
              description: "An OTP has been sent to your email address.",
              duration: 4000,
              closeButton: true,
            });
          },
          onError: (err) =>
            toast("Error geneOTPing otp", {
              description: err.message,
              duration: 4000,
              closeButton: true,
            }),
        }
      );
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6 py-5">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold">
                Enter Your OTP
              </FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup className="flex gap-4">
                    <InputOTPSlot
                      className="border rounded-md border-zinc-400"
                      index={0}
                    />
                    <InputOTPSlot
                      className="border rounded-md border-zinc-400"
                      index={1}
                    />
                    <InputOTPSlot
                      className="border rounded-md border-zinc-400"
                      index={2}
                    />
                    <InputOTPSlot
                      className="border rounded-md border-zinc-400"
                      index={3}
                    />
                    <InputOTPSlot
                      className="border rounded-md border-zinc-400"
                      index={4}
                    />
                    <InputOTPSlot
                      className="border rounded-md border-zinc-400"
                      index={5}
                    />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-2">
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
          <div className="flex items-center">
            <button
              onClick={handleClick}
              type="reset"
              disabled={disabled}
              className={`text-xs bg-gray-ash rounded-sm p-1 px-2 cursor-pointer text-zinc-200 ${
                disabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {disabled ? `Wait ${timeLeft}s` : "Regenerate OTP"}
            </button>
            <p></p>
          </div>
        </div>
      </form>
    </Form>
  );
}
