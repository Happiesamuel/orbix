"use client";
import { useEffect, useState } from "react";

export default function useCart() {
  const [cart, setCart] = useState<Cart[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const store = localStorage.getItem("cart");
      if (store) {
        setCart(JSON.parse(store));
      }
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isHydrated]);
  return { cart, setCart };
}
