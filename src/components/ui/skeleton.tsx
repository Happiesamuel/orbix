import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-gradient-to-r from-zinc-300/50 via-zinc-400/50 to-zinc-300/50  animate-pulse rounded-", className)}
      {...props}
    />
  )
}

export { Skeleton }
