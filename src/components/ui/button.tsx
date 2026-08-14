import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "action" | "accent" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variantStyles = {
      default:
        "bg-[#094cb2] text-white hover:bg-[#3366cc] border-2 border-[#1c1b1b] shadow-[3px_3px_0px_0px_#1c1b1b] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#1c1b1b]",
      action:
        "bg-[#fe6b00] text-white hover:bg-[#ff8533] border-2 border-[#1c1b1b] shadow-[3px_3px_0px_0px_#1c1b1b] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#1c1b1b]",
      accent:
        "bg-[#fae500] text-[#1c1b1b] hover:bg-[#fff04d] border-2 border-[#1c1b1b] shadow-[3px_3px_0px_0px_#1c1b1b] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#1c1b1b]",
      destructive:
        "bg-[#ba1a1a] text-white hover:bg-[#d32f2f] border-2 border-[#1c1b1b] shadow-[3px_3px_0px_0px_#1c1b1b] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#1c1b1b]",
      outline:
        "border-2 border-[#1c1b1b] bg-white hover:bg-[#f0eded] text-[#1c1b1b] shadow-[3px_3px_0px_0px_#1c1b1b] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#1c1b1b]",
      secondary:
        "bg-[#f0eded] text-[#1c1b1b] border-2 border-[#1c1b1b] hover:bg-[#e5e2e1] shadow-[3px_3px_0px_0px_#1c1b1b]",
      ghost: "hover:bg-[#f0eded] text-[#1c1b1b]",
      link: "text-[#094cb2] underline-offset-4 hover:underline font-bold",
    };

    const sizeStyles = {
      default: "h-10 px-4 py-2 text-sm",
      sm: "h-8 px-3 text-xs",
      lg: "h-12 px-8 text-base",
      icon: "h-10 w-10 p-0 flex items-center justify-center",
    };

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap font-label font-bold uppercase tracking-wider transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#094cb2] disabled:pointer-events-none disabled:opacity-50 cursor-pointer rounded-none",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
