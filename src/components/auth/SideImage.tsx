"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

export default function SideImage() {
  const pathname = usePathname();
  const slug = pathname.slice(1);
  return (
    <div className="h-full w-[50%] fixed items-center  justify-center hidden lg:flex">
      <div className="relative aspect-square w-[98%] h-[98%] flex items-center justify-center ">
        <Image
          src={`/login_${
            slug === "login"
              ? "3"
              : slug === "verify"
                ? "4"
                : slug === "forgot-password"
                  ? "2"
                  : slug === "reset-password"
                    ? "5" : slug === "set-password" ? '4'
                    : "1"
          }.jpg`}
          alt="img"
          placeholder="blur"
          blurDataURL={`/login_${
            slug === "login"
              ? "3"
              : slug === "verify"
                ? "4"
                : slug === "forgot-password"
                  ? "2"
                  : slug === "reset-password"
                    ? "5" : slug === "set-password" ? '4'
                    : "1"
          }.jpg`}
          fill
          className="object-center   object-cover rounded-2xl"
          quality={100}
        />
        <div className="absolute bottom-[5%]  rounded-lg bg-black/10 backdrop-blur-sm p-4 w-[92%]">
          <h3 className="text-white text-2xl font-semibold">
            Hey there, Welcome to Orbix!
          </h3>
          <p className="text-base text-zinc-300">
            We&apos;re glad you&apos;re here.{" "}
            {slug === "login" ? "Log in" : "Sign up"} to continue shopping and
            managing your account.
          </p>
        </div>
      </div>
    </div>
  );
}
