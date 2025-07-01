"use client";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function BreadcrumbWithCustomSeparator({
  array,
}: {
  array: { name: string; route: string }[];
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="flex flex-wrap items-center gap-2">
          {array.map((arr: { name: string; route: string }, i: number) => (
            <div key={arr.name} className="flex items-center gap-2">
              <BreadcrumbLink asChild>
                <Link
                  className={` ${
                    array.length > i + 1 ? "text-gray-ash" : "text-dark font-bold"
                  }`}
                  href={arr.route}
                >
                  {arr.name}
                </Link>
              </BreadcrumbLink>
              {array.length > i + 1 && <BreadcrumbSeparator />}
            </div>
          ))}
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
