'use client'
import Link from "next/link";
import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import { usePathname } from "next/navigation";
export default function Footer() {
  const pathname = usePathname();
  const slug = pathname.split("/").at(pathname.split("/").length >= 2 ? 1 : 2);
  const links = [
    {
      route: "/",
      slug: "Home",
      content: "home",
    },
    {
      route: "/category",
      content: "category",
      slug: "Category",
    },
    {
      route: "/cart",
      slug: "Cart",
      content: "cart",
    },
    {
      route: "/favorite",
      slug: "Favorite",
      content: "favorite",
    },
  ];
  const socials = [
    {
      route: "/",
      slug: <FaXTwitter />,
    },
    {
      route: "",
      slug: <FaFacebookSquare />,
    },
    {
      route: "",
      slug: <MdEmail />,
    },
    {
      route: "/favorite",
      slug: <FaLinkedin />,
    },
  ];
  return (
    <div className="bg-dark/95 w-full z-50 rounded-t-3xl flex flex-col items-start gap-4   md:flex-row lg:items-center justify-between pb-16 lg:pb-8 py-8 px-4 md:px-6 lg:px-20">
      <h1 className=" font-[900] text-white text-[20px]">
        Orb<span className="text-gray-ash">ix</span>
      </h1>
      <div className="flex items-center  gap-4 cursor-pointer lg:gap-8   text-sm lg:text-base">
        {links.map((link) => (
          <Link
            key={link.route}
            className={`text-zinc-200 hover:text-white duration-500 transition-all ${
              slug === link.content || pathname === link.route && "underline underline-offset-4"
            }`}
            href={link.route}
          >
            {link.slug}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-4 ">
        {socials.map((social, i) => (
          <Link
            href={social.route}
            className="transition-all duration-500 text-zinc-300 text-lg hover:text-white cursor-pointer"
            key={i}
          >
            {social.slug}
          </Link>
        ))}
      </div>
    </div>
  );
}
