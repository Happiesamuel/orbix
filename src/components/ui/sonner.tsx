"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      
      toastOptions={{
        classNames: {
          toast: " !bg-[#fffdf5] !border-zinc-300 text-white !border shadow-xl", // customize toast appearance
          title: "text-sm font-semibold !text-dark",
          description: "text-xs !text-dark",
          closeButton: "text-white hover:text-red-300",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
