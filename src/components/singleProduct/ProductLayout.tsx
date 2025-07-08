"use client";
import { BreadcrumbWithCustomSeparator } from "../layout/BreadCumb";
import useGetProduct from "../hooks/useGetProduct";

import ProductCategory from "./ProductCategory";
import ProductReviews from "./ProductReviews";
import ProductDetails from "./ProductDetails";
import ProductBio from "./ProductBio";
import useCart from "../hooks/useCart";

export default function ProductLayout() {
  const { product, status } = useGetProduct();
  const { cart, setCart } = useCart();
  if (status === "pending") return <div>Loading...</div>;
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
    { name: product.title, route: `/product/${product.id}` },
  ];

  return (
    <div className="py-6">
      <BreadcrumbWithCustomSeparator array={array} />
      <ProductBio cart={cart} setCart={setCart} product={product} />
      <ProductDetails cart={cart} setCart={setCart} product={product} />
      <ProductReviews rating={product.rating} reviews={product.reviews} />
      <ProductCategory category={product.category} />
    </div>
  );
}
