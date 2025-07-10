// import { useEffect, useState } from "react";

// export default function useRecentView() {
//   const [recentView, setRecentView] = useState<Product[]>(function () {
//     const store = localStorage.getItem("recentView");
//     return store ? JSON.parse(store) : [];
//   });
//   useEffect(
//     function () {
//       localStorage.setItem("recentView", JSON.stringify(recentView));
//     },
//     [recentView]
//   );
//   return { recentView, setRecentView };
// }

"use client";
import { useEffect, useState } from "react";

export default function useRecentView() {
  const [recentView, setRecentView] = useState<Product[]>([]);
  const [isHydrated, setIsHydrated] = useState(false); // client-side only flag

  // ✅ Load from localStorage only on the client
  useEffect(() => {
    if (typeof window !== "undefined") {
      const store = localStorage.getItem("recentView");
      if (store) {
        setRecentView(JSON.parse(store));
      }
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("recentView", JSON.stringify(recentView));
    }
  }, [recentView, isHydrated]);

  return { recentView, setRecentView };
}
