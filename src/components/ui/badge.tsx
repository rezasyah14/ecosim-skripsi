import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "accent";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variantStyles = {
    default: "bg-[#094cb2] text-white border-2 border-[#1c1b1b] shadow-[2px_2px_0px_0px_#1c1b1b]",
    secondary: "bg-[#fe6b00] text-white border-2 border-[#1c1b1b] shadow-[2px_2px_0px_0px_#1c1b1b]",
    accent: "bg-[#fae500] text-[#1c1b1b] border-2 border-[#1c1b1b] shadow-[2px_2px_0px_0px_#1c1b1b]",
    destructive: "bg-[#ba1a1a] text-white border-2 border-[#1c1b1b] shadow-[2px_2px_0px_0px_#1c1b1b]",
    success: "bg-emerald-400 text-[#1c1b1b] border-2 border-[#1c1b1b] shadow-[2px_2px_0px_0px_#1c1b1b]",
    warning: "bg-amber-300 text-[#1c1b1b] border-2 border-[#1c1b1b] shadow-[2px_2px_0px_0px_#1c1b1b]",
    outline: "bg-white text-[#1c1b1b] border-2 border-[#1c1b1b] shadow-[2px_2px_0px_0px_#1c1b1b]",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 text-xs font-label font-bold uppercase tracking-wider transition-colors rounded-none",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
