"use client";
import Link from "next/link";
import React from "react";
import { BiSolidCategory } from "react-icons/bi";
import { FaHeart, FaHome, FaShoppingCart } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function BottomLinks() {
  const pathname = usePathname();
  const slug = pathname.split("/").at(pathname.split("/").length >= 2 ? 1 : 2);
  const links = [
    {
      svg: <FaHome />,
      route: "/",
      slug: "Home",
      content: "home",
    },
    {
      svg: <BiSolidCategory />,
      route: "/category",
      content: "category",
      slug: "Category",
    },
    {
      svg: <FaShoppingCart />,
      route: "/cart",
      slug: "Cart",
      content: "cart",
    },
    {
      svg: <FaHeart />,
      route: "/favorite",
      slug: "Favorite",
      content: "favorite",
    },
  ];
  return (
    <div className="flex items-center justify-evenly lg:hidden bg-light/20 border-t border-white backdrop-blur-sm fixed bottom-0 w-full">
      {links.map((link) => (
        <Link
          href={link.route}
          key={link.slug}
          style={{
            background:
              slug === link.content || pathname === link.route
                ? "linear-gradient(to top, black, #1a1a1a, #2a2a2a, #404040, #666666)"
                : "",
          }}
          className={`flex gap-1 size-[100%]  py-2 p-1.5 justify-center items-center flex-col cursor-pointer ${
            slug === link.content || pathname === link.route
              ? "text-white"
              : "text-dark"
          }`}
        >
          <div className="text-[15px] md:text-lg">{link.svg}</div>
          <p className="text-[8px] md:text-xs">{link.slug}</p>
        </Link>
      ))}
    </div>
  );
}
