import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variantStyles = {
      default:
        "bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-500/20 active:scale-[0.98]",
      destructive:
        "bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-500/20 active:scale-[0.98]",
      outline:
        "border border-slate-700 bg-slate-900/50 hover:bg-slate-800 hover:text-white text-slate-200",
      secondary:
        "bg-slate-800 text-slate-100 hover:bg-slate-700 active:scale-[0.98]",
      ghost: "hover:bg-slate-800 text-slate-300 hover:text-white",
      link: "text-blue-400 underline-offset-4 hover:underline",
    };

    const sizeStyles = {
      default: "h-10 px-4 py-2 text-sm",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-12 rounded-lg px-8 text-base",
      icon: "h-10 w-10 p-0 flex items-center justify-center",
    };

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
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
