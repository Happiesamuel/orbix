"use client";
import React from "react";
import useGetProductCategory from "../hooks/useGetProductCategory";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import Link from "next/link";
export default function ProductCategory({ category }: { category: string }) {
  const { product, status } = useGetProductCategory(category);

  // const slidesPerView = width < 768 ? 1 : width < 1024 ? 3 : 5;

  if (status === "pending") return <p>Loading...</p>;
  return (
    <div className="w-full">
      <h2 className="font-bold pb-3 text-[#010101] text-sm">
        Similar Products
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={5}
        slidesPerView={1}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="rounded-lg"
        breakpoints={{
          0: { slidesPerView: 2 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 2 },
          1280: { slidesPerView: 4 },
        }}
      >
        {product.products?.map((item: Product) => (
          <SwiperSlide
            key={item.id}
            className="p-2 mx-auto w-full max-w-[320px] relative"
          >
            <div className="relative md:w-full w-full h-[180px] md:h-[250px]  rounded-xl bg-[#f2f0ea]">
              <Image
                className="object-contain object-center scale-80"
                src={item.images.at(0) || ""}
                fill
                alt="prod"
              />
            </div>

            <Link
              href={`/product/${item.id}`}
              className="flex justify-between pt-2 text-[#010101] items-center"
            >
              <div className="flex items-start flex-col text-xs md:text-sm">
              <p className="  font-semibold">{item.title}</p>
                <p>${item.price}</p>
              </div>
              <p />
            </Link>

            <div className="flex items-center absolute bg-white rounded-full bottom-[82%] size-[30px] justify-center right-[7%] cursor-pointer">
              <FaRegHeart />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
// "use client";
// import React from "react";
// import useGetProductCategory from "../hooks/useGetProductCategory";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation, Pagination } from "swiper/modules";
// import "swiper/css";
// import Image from "next/image";
// import { FaRegHeart } from "react-icons/fa";
// import Link from "next/link";
// export default function ProductCategory({ category }: { category: string }) {
//   const { product, status } = useGetProductCategory(category);

//   // const slidesPerView = width < 768 ? 1 : width < 1024 ? 3 : 5;

//   if (status === "pending") return <p>Loading...</p>;
//   return (
//     <div className="w-full">
//       <h2 className="font-bold pb-3 text-[#010101] text-sm">
//         Similar Products
//       </h2>

//       <Swiper
//         modules={[Navigation, Pagination, Autoplay]}
//         spaceBetween={20}
//         slidesPerView={1}
//         loop={true}
//         navigation
//         pagination={{ clickable: true }}
//         autoplay={{ delay: 3000, disableOnInteraction: false }}
//         className="rounded-lg"
//         breakpoints={{
//           0: { slidesPerView: 2 },
//           640: { slidesPerView: 2 },
//           1024: { slidesPerView: 2 },
//           1280: { slidesPerView: 4 },
//         }}
//       >
//         {product.products?.map((item: Product) => (
//           <SwiperSlide
//             key={item.id}
//             className="p-2 mx-auto w-full max-w-[320px] relative"
//           >
//             {/* FIXED: Proper relative size container for Image with fill */}
//             <div className="relative w-full h-[250px] rounded-xl bg-[#f2f0ea]">
//               <Image
//                 className="object-contain object-center"
//                 src={item.images.at(0) || ""}
//                 fill
//                 alt="prod"
//               />
//             </div>

//             <Link
//               href={`/product/${item.id}`}
//               className="flex justify-between pt-2 text-[#010101] items-center"
//             >
//               <div className="flex items-start flex-col">
//                 <p className="text-sm  font-semibold">{item.title}</p>
//                 <p>${item.price}</p>
//               </div>
//               <p />
//             </Link>

//             <div className="flex items-center absolute bg-white rounded-full bottom-[85%] size-[30px] justify-center right-[7%] cursor-pointer">
//               <FaRegHeart />
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// }
