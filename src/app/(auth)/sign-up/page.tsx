"use client";
import { LoginForm } from "@/components/auth/LoginForm";
import OtherLoginOption from "@/components/auth/OtherLoginOption";
import Image from "next/image";
import React from "react";
import Typical from "react-typical";

export default function Page() {
  return (
    <div className="w-[90%]  flex items-center justify-center flex-col gap-2">
      {/* <div className="bg-black rounded-md size-[60px] flex items-center justify-center">
        <FaOpencart className="text-white text-3xl" />
      </div> */}
      <Image src="/logo_2.png" width={100} height={30} alt=";" />
      {/* <p className="text-zinc-500">
        Welcome to <span className="text-dark font-bold">Orbix</span>
        <br />
      </p> */}
      <h1 className="text-base font-semibold text-center typical">
        <Typical
          steps={[
            "Welcome to Orbix",
            2000,
            "Shop smarter. Live better",
            2000,
            "Experience seamless shopping and exclusive offers",
            2000,
            "Your smart, secure gateway to endless shopping.",
            2000,
            "Great deals await!",
            2000,
          ]}
          loop={Infinity}
          wrapper="span"
        />
      </h1>

      <LoginForm />
      <div className="w-full flex-col pt-4 gap-4 items-center relative flex justify-center">
        <p
          className="relative flex items-center justify-center w-full text-gray-500 text-sm
    before:content-[''] before:absolute before:left-[15%] md:before:left-[20%] before:w-[20%] before:h-[1px] before:bg-zinc-300
    after:content-[''] after:absolute after:right-[15%] md:after:right-[20%] after:w-[20%] after:h-[1px] after:bg-zinc-300"
        >
          Login with
        </p>

        <div className="flex items-center scale-[0.9] md:scale-100  md:w-full justify-center gap-2 md:gap-6 ">
          <OtherLoginOption color="#7b0d06" name="Google" type="google" />
          <OtherLoginOption color="#1d203b" name="Facebook" type="facebook" />
        </div>
      </div>
    </div>
  );
}
