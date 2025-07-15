import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

export default function OtherLoginOption({
  type,
  name,color
}: {
  name: string;
  type: string;
  color:string
}) {
  return (
    <Button
      style={{
        background: color,
      }}
      className="flex items-center gap-2 text-xs "
    >
      <Image
        width={20}
        height={20}
        src={`https://authjs.dev/img/providers/${type}.svg`}
        alt="google image"
      />
      <p className="text-zinc-200">Login with {name}</p>
    </Button>
  );
}
