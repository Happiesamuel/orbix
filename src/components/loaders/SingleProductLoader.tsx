import React from 'react'

export default function SingleProductLoader() {
  return (
      <div className="flex gap-4 md:gap-6 lg:gap-8 flex-col items-center justify-center min-h-[80vh] bg-white">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-[#1f2937] rounded-full animate-spin"></div>
      <p className="font-bold text-zinc-400/70 tracking-wider text-lg md:text-2xl lg::text-4xl">Loading Product...</p>
    </div>
  )
}
