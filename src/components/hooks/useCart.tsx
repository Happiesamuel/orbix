// "use client";
// import { useEffect, useState } from "react";

// export default function useCart() {
//   const [cart, setCart] = useState<Cart[]>([]);
//   const [isReady, setIsReady] = useState(false); // guard to prevent SSR errors

//   useEffect(() => {
//     const store = localStorage.getItem("cart");
//     if (store) {
//       setCart(JSON.parse(store));
//     }
//     setIsReady(true);
//   }, []);

//   useEffect(() => {
//     if (isReady) {
//       localStorage.setItem("cart", JSON.stringify(cart));
//     }
//   }, [cart, isReady]);

//   return { cart, setCart };
// }

// useCart.ts
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
