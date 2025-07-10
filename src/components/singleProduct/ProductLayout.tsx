"use client";
import { BreadcrumbWithCustomSeparator } from "../layout/BreadCumb";
import useGetProduct from "../hooks/useGetProduct";

import ProductCategory from "./ProductCategory";
import ProductReviews from "./ProductReviews";
import ProductDetails from "./ProductDetails";
import ProductBio from "./ProductBio";
import useCart from "../hooks/useCart";
import SingleProductLoader from "../loaders/SingleProductLoader";
import useRecentView from "../hooks/useRecentView";
import RecentView from "../cart/RecentView";
import ErrorMessage from "../layout/ErrorMessage";

export default function ProductLayout() {
  const { product, status, error } = useGetProduct();
  const { cart, setCart } = useCart();
  const { recentView } = useRecentView();
  if (error)
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <ErrorMessage error={error} />
      </div>
    );
  if (status === "pending") return <SingleProductLoader />;
  let array = [
    {
      route: "/",
      name: "Home",
    },
    {
      route: "/catalog",
      name: "Catalog",
    },
  ];
  const brand = product.brand
    ? [{ name: product.brand, route: `/catalog?query=${product.brand}` }]
    : [];

  array = [
    ...array,
    {
      name: product.category
        .split("-")
        .map((x: string) => x.charAt(0).toUpperCase() + x.slice(1))
        .join(" "),
      route: `/category/${product.category}`,
    },
    ...brand,
    { name: product.title, route: `/product/${product.sku}` },
  ];

  return (
    <div className="py-6">
      <BreadcrumbWithCustomSeparator array={array} />
      <ProductBio cart={cart} setCart={setCart} product={product} />
      <ProductDetails cart={cart} setCart={setCart} product={product} />
      <ProductReviews rating={product.rating} reviews={product.reviews} />
      <ProductCategory category={product.category} />
      {recentView.length ? <RecentView recentView={recentView} /> : ""}
    </div>
  );
}
