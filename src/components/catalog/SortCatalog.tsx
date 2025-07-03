import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SortCatalog({ push = "catalog" }: { push: string }) {
  const content = [
    { value: "discount-asc", label: "Discount: Low to High" },
    { value: "discount-desc", label: "Discount: High to Low" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "rating-asc", label: "Rating: Low to High" },
    { value: "rating-desc", label: "Rating: High to Low" },
  ];
  const [value, setValue] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSortChange(sort: string) {
    const params = new URLSearchParams(searchParams);
    params.set("sort", sort);
    router.push(`/${push}?${params.toString()}`);
  }
  return (
    <div className="flex items-center  gap-2">
      <p className="font-bold text-dark">Sort by</p>
      <Select onValueChange={(value) => handleSortChange(value)}>
        <SelectTrigger className="w-[100px] md:w-[180px]">
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent className="bg-light">
          {content.map((item) => (
            <SelectItem
              onMouseEnter={() => setValue(item.value)}
              onMouseLeave={() => setValue("")}
              style={{
                background:
                  value !== item.value
                    ? "transparent"
                    : "linear-gradient(to right, black, #1a1a1a, #2a2a2a, #404040, #666666)",
              }}
              className={`hover:text-white transition-all duration-500 cursor-pointer ${
                value === item.value ? "!text-white" : "text-dark"
              }`}
              key={item.value}
              value={item.value}
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
