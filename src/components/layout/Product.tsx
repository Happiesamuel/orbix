import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaOpencart, FaRegHeart } from "react-icons/fa";

export default function Product({ product, setActive, active }) {
  return (
    <div
      onMouseEnter={() => setActive(product.id)}
      onMouseLeave={() => setActive(null)}
      className="flex  flex-col bg-[#ffffff] md:w-[100%] lg:w-[88%] w-full max-w-[200px] md:max-w-[400px] shadow cursor-pointer shadow-zinc-100 border border-zinc-300 rounded-lg"
    >
      <div className="relative aspect-square w-full flex items-center justify-center bg-light rounded-t-lg h-[60px] lg:h-[130px] md:h-[80px] ">
        <p className="text-[7px] md:text-[10px] lg:text-xs text-red-500 absolute right-0 top-[-1] rounded-bl-md md:round-bl-xl flex items-center justify-center w-[30px] h-[15px] md:w-[40px] md:h-[20px] lg:w-[50px] lg:h-[25px]  rounded-tr-md md:rounded-tr-md bg-white">
          -{product.discountPercentage}%
        </p>
        <p className="text-[7px] md:text-[10px] lg:text-xs text-red-500 absolute left-[0%] bottom-0  flex items-center justify-center w-[20px] h-[10px] lg:w-[40px] lg:h-[25px] md:w-[30px] md:h-[15px] rounded-tr-md  lg:rounded-tr-xl  bg-white">
          <FaRegHeart />
        </p>
        <Image
          src={product.images.at(
            !active || product.images.length === 1 || active !== product.id
              ? 0
              : Math.floor(Math.random() * product.images.length)
          )}
          alt={product.title}
          fill
          className={`object-center  object-contain ${
            active === product.id ? "scale-90" : "scale-80"
          } transition-transform duration-300`}
        />
      </div>
      <div className="p-1 py-2 space-y-1 md:space-y-4">
        <div className="flex items-center text-dark justify-between  gap-2">
          <h2 className="text-[9px] md:text-xs lg:text-sm font-[700] ">{product.title}</h2>
          <p className=" text-[8px] md:text-[10px] lg:text-base">${product.price}</p>
        </div>
        <p className="text-[8px] font-bold lg:font-normal md:text-[11px] lg:text-[13px] text-gray-ash">
          {product.description.slice(0, 100)}...
        </p>
        <div className="flex justify-center  items-center gap-3">
          <Link
            href={`/product/${product.id}`}
            className="cursor-pointer text-[7px] md:text-[10px] lg:text-xs border hover:bg-transparent border-zinc-300  md:py-1.5 md:px-4  py-1 px-1.5 bg-transparent rounded-full text-dark flex items-center gap-2"
          >
            View Details
          </Link>
          <button
            style={{
              background:
                "linear-gradient(to top, black, #1a1a1a, #2a2a2a, #404040, #666666)",
            }}
            className="cursor-pointer text-[7px] md:text-[10px]  lg:text-xs flex items-center gap-2 rounded-full py-1 px-1.5  md:py-1.5 md:px-3  bg-dark text-light"
          >
            {" "}
            <FaOpencart />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";
// import { FaOpencart, FaRegHeart } from "react-icons/fa";

// export default function Product({ product, setActive, active }) {
//   return (
//     <div
//       onMouseEnter={() => setActive(product.id)}
//       onMouseLeave={() => setActive(null)}
//       className="flex  flex-col bg-[#ffffff] md:w-[82%] lg:w-[88%] w-full max-w-[280px] md:max-w-[400px] shadow cursor-pointer shadow-zinc-100 border border-zinc-300 rounded-2xl"
//     >
//       <div className="relative aspect-square w-full flex items-center justify-center bg-light rounded-t-2xl h-[160px] lg:h-[130px]">
//         <p className="text-xs text-red-500 absolute right-0 top-[-1] rounded-bl-xl flex items-center justify-center w-[50px] h-[25px]  rounded-tr-2xl bg-white">
//           -{product.discountPercentage}%
//         </p>
//         <p className="text-base text-red-500 absolute left-[0%] bottom-0  flex items-center justify-center w-[40px] h-[25px] rounded-tr-xl bg-white">
//           <FaRegHeart />
//         </p>
//         <Image
//           src={product.images.at(
//             !active || product.images.length === 1 || active !== product.id
//               ? 0
//               : Math.floor(Math.random() * product.images.length)
//           )}
//           alt={product.title}
//           fill
//           className={`object-center  object-contain ${
//             active === product.id ? "scale-90" : "scale-80"
//           } transition-transform duration-300`}
//         />
//       </div>
//       <div className="p-2 py-3 space-y-2 md:space-y-4">
//         <div className="flex items-center text-dark justify-between  gap-2">
//           <h2 className="text-sm font-[700] ">{product.title}</h2>
//           <p className=" text-base">${product.price}</p>
//         </div>
//         <p className="text-[13px] text-gray-ash">
//           {product.description.slice(0, 100)}...
//         </p>
//         <div className="flex justify-center  items-center gap-3">
//           <Link
//             href={`/product/${product.id}`}
//             className="cursor-pointer text-xs border hover:bg-transparent border-zinc-300 py-1.5 px-4 bg-transparent rounded-full text-dark flex items-center gap-2"
//           >
//             View Details
//           </Link>
//           <button
//             style={{
//               background:
//                 "linear-gradient(to top, black, #1a1a1a, #2a2a2a, #404040, #666666)",
//             }}
//             className="cursor-pointer text-xs flex items-center gap-2 rounded-full py-1.5 px-3 bg-dark text-light"
//           >
//             {" "}
//             <FaOpencart />
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
