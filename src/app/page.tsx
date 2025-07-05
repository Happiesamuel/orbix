import BannerOne from "@/components/home/BannerOne";
import Banners from "@/components/home/Banners";
import BannerThree from "@/components/home/BannerThree";
import BannerTwo from "@/components/home/BannerTwo";
import ChooseCategory from "@/components/home/ChooseCategory";
import FirstRow from "@/components/home/FirstRow";
import React from "react";

export default function page() {
  return (
    <div className="">
      <Banners
        text="Flash Sale! Save Up to 50% on Smartphones You Love"
        link="/category/smartphones"
        firstImg="1"
        secondImg="2"
      />
      <FirstRow
        route={"/category/smartphones"}
        text="SmartPhones For You!"
        category="smartphones"
        key="smartphones"
        slice={8}
      />
      <Banners
        text="Hot Deals 🔥 - Selected Laptops Up to 30% Off!"
           link="/category/laptops"
        firstImg="5"
        secondImg="3"
      />
      <FirstRow
        route={"/category/laptops"}
        text="Laptops For You!"
        category="laptops"
        key="laptops"
        slice={4}
      />
      <Banners
        text="Don't Miss It - Smartphones Up to 50% Off!"
       link="/category/mens-watches"
        firstImg="6"
        secondImg="4"
      />
      <FirstRow
        route={"/category/mens-watches"}
        text="Wrist Watches For You!"
        category="mens-watches"
        key="mens-watches"
        slice={4}
      />
      <ChooseCategory />
    </div>
  );
}
