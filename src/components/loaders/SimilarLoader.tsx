"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import { FaOpencart } from "react-icons/fa";
import { Skeleton } from "../ui/skeleton";
export default function SimilarLoader() {
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
        {Array.from({ length: 5 }).map((_, i) => (
          <SwiperSlide
            key={i}
            className="p-2 mx-auto w-full max-w-[320px] relative"
          >
            <Skeleton className="relative loader md:w-full w-full h-[180px] md:h-[250px]  rounded-xl bg-[#f2f0ea]">
              <div className="circle">
                <FaOpencart className="text-zinc-500 text-xl md:text-3xl" />
              </div>
            </Skeleton>

            <div className="flex justify-between pt-2 text-[#010101] items-center">
              <div className="flex items-start flex-col gap-1 text-xs md:text-sm">
                <Skeleton className="h-2 w-32" />
                <Skeleton className="h-2 w-20" />
              </div>
              <p />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
