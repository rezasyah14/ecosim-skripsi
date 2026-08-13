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
      <div className={cn("relative flex w-full touch-none select-none items-center py-1", className)}>
        <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-slate-800">
          <div
            className="absolute h-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-75"
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
          className="pointer-events-none absolute h-5 w-5 rounded-full border-2 border-blue-500 bg-slate-900 shadow-md shadow-blue-500/30 transition-all"
          style={{ left: `calc(${percentage}% - 10px)` }}
        />
      </div>
    );
  }
);
Slider.displayName = "Slider";

export { Slider };
