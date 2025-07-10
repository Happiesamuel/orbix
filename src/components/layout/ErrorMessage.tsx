import React from "react";

export default function ErrorMessage({ error }: { error: string }) {
  return (
    <div className="flex gap-4 md:gap-6 lg:gap-8 flex-col items-center justify-center ">
      <p className="font-bold text-zinc-400/70 tracking-wider text-lg md:text-2xl lg::text-4xl">
        {error}
      </p>
    </div>
  );
}
