import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";

import React from "react";

export default function PaginationCatalog({
  push = "catalog",
  length,
  showPagination,
  resultPerPage,
}: {
  length: number;
  push: string;
  showPagination: boolean;
  resultPerPage: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  function handlePageChange(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`/${push}?${params.toString()}`);
  }
  return (
    showPagination && (
      <div className="flex items-center justify-center space-x-2 py-4 text-xs">
        <Pagination>
          <PaginationContent className="space-x-3">
            {page > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  className="bg-light cursor-pointer"
                  onClick={() => handlePageChange(page - 1)}
                />
              </PaginationItem>
            )}
            {page > 1 && (
              <PaginationItem>
                <PaginationLink
                  className="bg-light cursor-pointer"
                  onClick={() => handlePageChange(page - 1)}
                >
                  {page - 1}
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink
                style={{
                  background:
                    "linear-gradient(to right, black, #1a1a1a, #2a2a2a, #404040, #666666)",
                }}
                className="text-white hover:text-white cursor-not-allowed"
              >
                {page}
              </PaginationLink>
            </PaginationItem>

              {page * resultPerPage < length && (
            <PaginationItem>
                <PaginationLink
                  className="bg-light cursor-pointer"
                  onClick={() => handlePageChange(page + 1)}
                >
                  {page + 1}
                </PaginationLink>
            </PaginationItem>
              )}

              {page * resultPerPage < length ||
                (page * resultPerPage < length && (
            <PaginationItem>
                  <PaginationLink
                    className="bg-light cursor-pointer"
                    onClick={() => handlePageChange(page + 2)}
                  >
                    {page + 2}
                  </PaginationLink>
            </PaginationItem>
                ))}

            {page * resultPerPage < length && (
              <PaginationItem>
                <PaginationNext
                  className="bg-light cursor-pointer"
                  onClick={() => handlePageChange(page + 1)}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    )
  );
}
