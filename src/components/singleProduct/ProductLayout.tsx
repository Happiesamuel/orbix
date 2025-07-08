"use client";
import { BreadcrumbWithCustomSeparator } from "../layout/BreadCumb";
import useGetProduct from "../hooks/useGetProduct";
import ProductImages from "./ProductImages";
import Rating from "../layout/Rating";
import { Button } from "../ui/button";
import { FaRegHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import ProductCategory from "./ProductCategory";
import ProductReviews from "./ProductReviews";
import ProductDetails from "./ProductDetails";
import useCart from "../hooks/useCart";

export default function ProductLayout() {
  const { product, status } = useGetProduct();
  const { setCart, cart } = useCart();

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
  function addToCart() {
    const newObj = {
      product: product,
      quantity: 1,
    };
    setCart((i) =>
      i.some((x: Cart) => x.product.id === product.id) ? [...i] : [...i, newObj]
    );
  }

  const isInCart = cart.some((x: Cart) => x.product.id === product.id);
  const cartItem = cart.find((cat) => cat.product.id === product.id);
  console.log(cartItem);
  return (
    <div className="py-6">
      <BreadcrumbWithCustomSeparator array={array} />
      <div className="flex flex-col lg:flex-row justify-between py-5 md:py-8 ">
        <ProductImages images={product?.images} />

        <div className="w-full lg:w-[50%] py-6 lg:py-0">
          <div className="flex text-xs md:text-sm justify-between items-center">
            <p className="font-bold text-dark">{product.brand}</p>
            <p className="text-gray-ash">{product.sku}</p>
          </div>
          <h2 className="font-[900] py-3 text-dark text-lg md:text-2xl">
            {product.title}
          </h2>
          <div className="flex md:text-base text-sm items-center gap-4">
            <Rating rate={product.rating} />
            <p className="text-gray-ash">{product.warrantyInformation}</p>
          </div>

          <div className="flex items-center justify-between lg:justify-start gap-3">
            <h3 className="font-light relative top-[5px] line-through text-xs md:text-sm py-5 text-gray-ash">
              $
              {(
                product.price +
                product.price * (product.discountPercentage / 100)
              ).toFixed(2, 0)}
            </h3>
            <h3 className="font-bold text-xl md:text-3xl py-3 md:py-5 text-dark">
              ${product.price}
            </h3>
            <p className="text-[10px] relative top-[5px] text-red-500  bg-light p-1 rounded-sm">
              - {product.discountPercentage}%
            </p>
          </div>
          <p className="font-bold pb-3 text-dark text-sm">DESCRIPTION</p>
          <p className="text-gray-ash text-xs md:text-sm pb-3 md:pb-5 w-full md:w-[85%]">
            {product.description}
          </p>
          <div className="flex items-center gap-2 cursor-pointer pb-4">
            {product.tags.map((tag: string) => (
              <p
                className="text-sm bg-light shadow shadow-zinc-200 cursor-pointer text-green-500 px-2 rounded-full italic"
                key={tag}
              >
                {tag}
              </p>
            ))}
          </div>
          {isInCart ? (
            <div className="flex items-center  gap-1">
              <button
                style={{
                  background:
                    "linear-gradient(to top, black, #1a1a1a, #2a2a2a, #404040, #666666)",
                }}
                className="size-[20px] md:size-[25px] flex items-center justify-center cursor-pointer pb-1 text-white rounded-full"
              >
                -
              </button>
              <p className="bg-light size-[20px] md:size-[25px] rounded-[2px] text-xs md:text-sm flex items-center justify-center">
                {cartItem?.quantity || 0}
              </p>
              <button
                style={{
                  background:
                    "linear-gradient(to top, black, #1a1a1a, #2a2a2a, #404040, #666666)",
                }}
                className="size-[20px] md:size-[25px] flex items-center justify-center cursor-pointer pb-0.5 text-white rounded-full"
              >
                +
              </button>
            </div>
          ) : (
            <div className="flex items-center w-full lg:w-[85%] gap-2">
              <Button
                style={{
                  background:
                    "linear-gradient(to right, black, #1a1a1a, #2a2a2a, #404040, #666666)",
                }}
                onClick={addToCart}
                className="w-[90%] lg:w-[80%] text-white text-sm"
              >
                <IoCartOutline />
                Add to Cart
              </Button>
              <Button className="bg-light text-dark text-sm">
                <FaRegHeart />
              </Button>
            </div>
          )}
        </div>
      </div>
      <ProductDetails product={product} />

      <ProductReviews rating={product.rating} reviews={product.reviews} />
      <ProductCategory category={product.category} />
    </div>
  );
}
