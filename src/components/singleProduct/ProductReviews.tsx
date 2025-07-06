import React from "react";
import Rating from "../layout/Rating";
import { formatRelativeDate } from "@/lib/utils";
import { FaUser } from "react-icons/fa";

export default function ProductReviews({
  reviews,
  rating,
}: {
  reviews: Reviews[];
  rating: number;
}) {
  const ratings = [
    { stars: 5, count: 28 },
    { stars: 4, count: 9 },
    { stars: 3, count: 4 },
    { stars: 2, count: 1 },
    { stars: 1, count: 1 },
  ];

  const maxCount = Math.max(...ratings.map((r) => r.count));

  return (
    <div>
      <h2 className="font-bold pb-1.5 text-[#010101] text-sm">
        Customer Reviews
      </h2>
      <div className="flex gap-5 md:flex-row flex-col justify-between w-full py-8">
        <div className="space-y-5  md:w-[50%]">
          {reviews.map((review) => (
            <div
              className="flex gap-3 border-b pb-3 last:border-none border-zinc-300"
              key={review.id}
            >
              <div className="bg-zinc-100/80 size-[40px]  flex items-center justify-center rounded-full">
                <FaUser className="text-[#010101]" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm text-[#010101] font-bold">
                    {review.reviewerName}
                  </h3>{" "}
                  <p className=" text-[#a4a4a4] text-xs">
                    {formatRelativeDate(review.date)}
                  </p>
                </div>
                <Rating rate={review.rating} />
                <p className="text-sm text-[#010101] font-light">
                  {review.comment}
                </p>
                <p className=" text-[#a4a4a4] text-xs">
                  {review.reviewerEmail}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="w-[30%]"> */}
        <div className="w-full max-w-[400px]  md:max-w-full md:mx-0 mx-auto md:w-[40%] lg:w-[30%] flex flex-col justify-start">
          <div className="flex border-b pb-3 border-zinc-200 justify-between text-lg ">
            <Rating rate={rating} />
            <p className="font-bold">{rating}</p>
          </div>

          <div className="w-full max-w-sm py-2 space-y-2">
            {ratings.map((rate) => {
              const barWidth = (rate.count / maxCount) * 100;

              return (
                <div key={rate.stars} className="flex items-center space-x-2">
                  <span className="w-4 text-sm font-medium text-[#a4a4a4]">
                    {rate.stars}
                  </span>
                  <div className="flex-1 bg-gray-200 h-3 rounded">
                    <div
                      className="h-3 rounded bg-[#edcf5d]"
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                  <span className="w-6 text-sm text-[#010101] font-medium text-right">
                    {rate.count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
