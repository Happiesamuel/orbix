"use client";
import { useParams } from "next/navigation";
import React from "react";
import { BreadcrumbWithCustomSeparator } from "../layout/BreadCumb";

export default function CatBreadCumb() {
  const params = useParams();
  const { slug } = params;
  const name = slug
    ? typeof slug === "string"
      ? slug
          .split("-")
          .map((x: string) => x.charAt(0).toUpperCase() + x.slice(1))
          .join(" ")
      : Array.isArray(slug)
      ? slug
          .join("-")
          .split("-")
          .map((x: string) => x.charAt(0).toUpperCase() + x.slice(1))
          .join(" ")
      : "All Categories"
    : "All Categories";
  const arr = [
    {
      route: "/",
      name: "Home",
    },
    {
      route: "/category",
      name: "Category",
    },
    {
        route: `/category/${slug ? slug : ""}`,
        name: name,
    },
  ];
  return (
    <div className="py-2">
      <BreadcrumbWithCustomSeparator array={arr} />
    </div>
  );
}
