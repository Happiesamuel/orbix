import { useEffect, useState } from "react";

export default function useCart() {
  const [cart, setCart] = useState<Cart[]>(function () {
    const store = localStorage.getItem("cart");
    return store ? JSON.parse(store) : [];
  });
  useEffect(
    function () {
      localStorage.setItem("cart", JSON.stringify(cart));
    },
    [cart]
  );
  return { cart, setCart };
}
