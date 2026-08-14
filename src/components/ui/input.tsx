import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-none border-2 border-[#1c1b1b] bg-white px-3 py-2 text-sm text-[#1c1b1b] font-serif placeholder:text-[#737784] shadow-[2px_2px_0px_0px_#1c1b1b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#094cb2] disabled:cursor-not-allowed disabled:opacity-50 transition-all",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
