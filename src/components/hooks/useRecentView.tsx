import { useEffect, useState } from "react";

export default function useRecentView() {
  const [recentView, setRecentView] = useState<Product[]>(function () {
    const store = localStorage.getItem("recentView");
    return store ? JSON.parse(store) : [];
  });
  useEffect(
    function () {
      localStorage.setItem("recentView", JSON.stringify(recentView));
    },
    [recentView]
  );
  return { recentView, setRecentView };
}
