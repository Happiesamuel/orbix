"use client";
import React from "react";
import Image from "next/image";
import Typical from "react-typical";
export default function AuthHeader() {
  return (
    <>
      <Image src="/logo_2.png" width={100} height={30} alt=";" />

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
    </>
  );
}
