"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { IoSearch } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function MobileHeader() {
  const router = useRouter();
  const [value, setValue] = useState("");
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (!value) return;
    e.preventDefault();
    router.push(`/catalog?query=${value}`);
    setValue("");
  }
  return (
    <div className="flex bg-light/40 border-b border-zinc-100/80 backdrop-blur-sm z-[99] items-center justify-between  py-2 px-5 fixed w-full mx-auto my-0 max-w-[144rem]">
      <form
        onSubmit={handleSubmit}
        className="flex border border-zinc-200 items-center gap-2 justify-center px-2 w-[95%] rounded-md text-[#a4a4a4] bg-white"
      >
        <IoSearch className="text-lg" />
        <Input
          onChange={(e) => setValue(e.target.value)}
          value={value}
          className="border-none text-xs shadow-none p-0 placeholder:text-[#a4a4a4] text-[#010101]"
          placeholder="Search"
        />
      </form>
    </div>
  );
}
