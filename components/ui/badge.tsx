import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border pr-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        verified:
          "border border-[#008005] bg-transparent text-[#008005] text-xs hover:bg-[#008005]/10",
        pending:
        "border border-[#B93815] bg-transparent text-[#B93815] text-xs hover:bg-[#B93815]/10",
        unverified:
          "border text-[#800C05] text-xs border-[#800C05] bg-transparent hover:bg-[#800C05]/10",
          active:
          "border border-[#008005] bg-[#085D3A]/30 text-[#75E0A7] text-xs ",
          blacklisted:
          "border border-[#55160C] bg-[#912018]/30 text-[#FDA29B] text-xs ",
          disabled:
          "border border-[#333741] bg-transparent text-[#CECFD2] text-xs ",
      },
      
    },
    defaultVariants: {
      variant: "verified",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
