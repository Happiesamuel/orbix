import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
export default function Choose({
  catList,
  product,
  setProduct,
}: {
  catList: Product[][];
  product: CatProduct[];
  setProduct: Dispatch<SetStateAction<CatProduct[]>>;
}) {
  const [active, setActive] = useState<number | null>(null);
  useEffect(() => {
    const interval = setInterval(() => {
      const updated: CatProduct[] = catList.map((x) => ({
        length: x.length,
        product: x[Math.floor(Math.random() * x.length)],
      }));
      setProduct(updated);
    }, 10000);

    return () => clearInterval(interval);
  }, [catList, setProduct]);
  return (
    <div>
      <div className="grid  place-items-center  grid-cols-3 md:grid-cols-4  lg:grid-cols-6 gap-3 md:gap-y-6 md:gap-x-6 w-full">
        {product?.map((cat, i: number) => (
          <Link
            href={`/category/${cat.product.category}`}
            key={cat.product.id}
            onMouseEnter={() => setActive(cat.product.id)}
            onMouseLeave={() => setActive(null)}
            style={{
              background:
                active === cat.product.id
                  ? "linear-gradient(to top,#404040,#666666)"
                  : "white",
            }}
            className={`flex ${
              i % 2 === 0
                ? "flex-col md:flex-row-revers"
                : "flex-col md:flex-ro"
            } gap-1 items-center bg-white w-[100%] h-[100px] md:h-full max-w-[200px] justify-center  px-2
duration-500 transition-all border border-zinc-300 rounded-lg py-2
            `}
          >
            <div
              className={`relative aspect-auto size-[40px] md:size-[75px]  ${
                active === cat.product.id
                  ? "rounded-lg bg-white"
                  : "rounded-lg bg-white"
              } `}
            >
              <Image
                className="object-center object-contain"
                src={cat.product.images.at(0) || ""}
                alt="categoryimg"
                fill
              />
            </div>
            <div className="flex flex-col gap-1.5 md:gap-2.5 justify-center items-center">
              <h2
                className={`font-bold text-center ${
                  active === cat.product.id ? "text-white" : "text-dark"
                } text-[11px] md:text-sm`}
              >
                {cat.product.category
                  .split("-")
                  .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
                  .join(" ")}
              </h2>
              <p
                className={`${
                  active === cat.product.id ? "text-zinc-300" : "text-gray-ash "
                } text-[9px] md:text-xs`}
              >
                {cat.length} items
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// export default function Choose({ catList, product, setProduct }) {
//   const [active, setActive] = useState(null);
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const updated = catList.map((x) => ({
//         length: x.length,
//         product: x[Math.floor(Math.random() * x.length)],
//       }));
//       setProduct(updated);
//     }, 10000);

//     return () => clearInterval(interval);
//   }, [catList, setProduct]);
//   return (
//     <div>
//       <h2 className="text-xl md:text-2xl lg:text-4xl  font-bold gradtext text-center w-full py-5">
//         Choose a Category
//       </h2>
//       <div className="grid  place-items-center  grid-cols-2 md:grid-cols-4  lg:grid-cols-6 gap-3 md:gap-y-6 md:gap-x-6 w-full">
//         {product?.map((cat, i: number) => (
//           <Link
//             href={`/category/${cat.product.category}`}
//             key={cat.product.id}
//             onMouseEnter={() => setActive(cat.product.id)}
//             onMouseLeave={() => setActive(null)}
//             style={{
//               background:
//                 active === cat.product.id
//                   ? "linear-gradient(to top,#404040,#666666)"
//                   : "white",
//             }}
//             className={`flex ${
//               i % 2 === 0 ? "flex-row-reverse" : "flex-row"
//             } gap-1 items-center bg-white w-[100%] max-w-[200px] justify-evenly  px-2
// duration-500 transition-all border border-zinc-300 rounded-lg py-2
//             `}
//           >
//             <div
//               className={`relative aspect-auto size-[75px]  ${
//                 active === cat.product.id
//                   ? "rounded-lg bg-white"
//                   : "rounded-lg bg-white"
//               } `}
//             >
//               <Image
//                 className="object-center object-contain"
//                 src={cat.product.images.at(0)}
//                 alt="categoryimg"
//                 fill
//               />
//             </div>
//             <div className="flex flex-col gap-2.5 justify-between">
//               <h2
//                 className={`font-bold ${
//                   active === cat.product.id ? "text-white" : "text-dark"
//                 } text-sm`}
//               >
//                 {cat.product.category
//                   .split("-")
//                   .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
//                   .join(" ")}
//               </h2>
//               <p
//                 className={`${
//                   active === cat.product.id ? "text-zinc-300" : "text-gray-ash "
//                 } text-xs`}
//               >
//                 {cat.length} items
//               </p>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }
