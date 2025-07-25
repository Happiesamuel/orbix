import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { IoLogOutOutline } from "react-icons/io5";
import { FaTools } from "react-icons/fa";
import Link from "next/link";
import { PiSignInBold } from "react-icons/pi";
export default function DropHeader({
  children,
  onClick,
  load,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  load?: boolean;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="ring-offset-0 focus:ring-offset-0 focus-visible:ring-offset-0 ">
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white relative  mr-2">
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link
            href="#"
            className="flex cursor-pointer text-sm items-center gap-2 text-zinc-600"
          >
            <FaTools />
            <p>Profile</p>
          </Link>
        </DropdownMenuItem>
        {onClick ? (
          <DropdownMenuItem
            onClick={() => onClick?.()}
            className="flex cursor-pointer text-sm items-center gap-2 text-red-600"
          >
            <IoLogOutOutline className="" />{" "}
            <p>{load ? "Logging out..." : "Log out"}</p>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem className="flex cursor-pointer text-sm items-center gap-2">
            <Link
              href="/login"
              className="flex cursor-pointer text-sm items-center gap-2 text-green-600"
            >
              <PiSignInBold />
              <p>Sign in</p>
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
