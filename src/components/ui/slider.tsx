import * as React from "react";
import { cn } from "@/lib/utils";

export interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value?: number[];
  onValueChange?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, value = [0], onValueChange, min = 0, max = 100, step = 1, ...props }, ref) => {
    const val = value[0] ?? 0;
    const percentage = Math.min(100, Math.max(0, ((val - min) / (max - min)) * 100));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(e.target.value);
      if (onValueChange) {
        onValueChange([newValue]);
      }
    };

    return (
      <div className={cn("relative flex w-full touch-none select-none items-center py-2", className)}>
        <div className="relative h-3 w-full grow overflow-hidden border-2 border-[#1c1b1b] bg-white">
          <div
            className="absolute h-full bg-[#094cb2] transition-all duration-75"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <input
          type="range"
          ref={ref}
          min={min}
          max={max}
          step={step}
          value={val}
          onChange={handleChange}
          className="absolute inset-0 h-full w-full opacity-0 cursor-pointer"
          {...props}
        />
        <div
          className="pointer-events-none absolute h-6 w-6 border-2 border-[#1c1b1b] bg-[#fae500] shadow-[2px_2px_0px_0px_#1c1b1b] transition-all"
          style={{ left: `calc(${percentage}% - 12px)` }}
        />
      </div>
    );
  }
);
Slider.displayName = "Slider";

export { Slider };
