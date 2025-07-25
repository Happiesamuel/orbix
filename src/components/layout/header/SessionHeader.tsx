"use client";
import React from "react";

import { Input } from "../../ui/input";
import { IoSearch } from "react-icons/io5";
import Image from "next/image";

export default function SessionHeader({
  children,
  handleSubmit,
  value,
  setValue,
}: {
  children: React.ReactNode;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  value: string;
  setValue: (value: string) => void;
}) {
  return (
    <div className="flex bg-light/40 border-b border-zinc-100/80 backdrop-blur-sm z-[99] items-center justify-between  py-3 px-12 fixed w-full mx-auto my-0 max-w-[144rem]">
      <div className="flex items-center">
        <Image
          src="/logo_2.png"
          alt="Logo"
          className=""
          width={45}
          height={45}
        />
        <h1 className="text-dark font-[900] text-[20px]">
          Orb<span className="text-[#a4a4a4]">ix</span>
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex border border-zinc-200 items-center gap-2 justify-center px-3 w-[280px] rounded-md text-[#a4a4a4] bg-white"
      >
        <IoSearch className="text-2xl" />
        <Input
          onChange={(e) => setValue(e.target.value)}
          value={value}
          className="border-none shadow-none p-0 placeholder:text-[#a4a4a4] text-[#010101]"
          placeholder="Search"
        />
      </form>
      {children}
    </div>
  );
}
