import BannerOne from "@/components/home/BannerOne";
import BannerThree from "@/components/home/BannerThree";
import BannerTwo from "@/components/home/BannerTwo";
import ChooseCategory from "@/components/home/ChooseCategory";
import FirstRow from "@/components/home/FirstRow";
import React from "react";

export default function page() {
  return (
    <div>
      <BannerOne />
      <FirstRow
        route={"/category/smartphones"}
        text="SmartPhones For You!"
        category="smartphones"
        key="smartphones"
        slice={8}
      />
      <BannerTwo />
      <FirstRow
        route={"/category/laptops"}
        text="Laptops For You!"
        category="laptops"
        key="laptops"
        slice={4}
      />
      <BannerThree />
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
