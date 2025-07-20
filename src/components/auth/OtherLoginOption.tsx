import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

export default function OtherLoginOption({
  type,
  name,
  color,
  content,
  onclick,
}: {
  name: string;
  type: string;
  color: string;
  content: string;
  onclick(): void;
}) {
  return (
    <Button
      style={{
        background: color,
      }}
      onClick={onclick}
      className="flex items-center gap-2 text-xs cursor-pointer"
    >
      <Image
        width={20}
        height={20}
        src={`https://authjs.dev/img/providers/${type}.svg`}
        alt="google image"
      />
      <p className="text-zinc-200">
        {content} with {name}
      </p>
    </Button>
  );
}
