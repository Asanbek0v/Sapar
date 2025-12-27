  "use client";

  import { useEffect, useState } from "react";

  type PriceRangeProps = {
    min?: number;
    max?: number;
    step?: number;
    value: [number, number];
    onChange: (value: [number, number]) => void;
  };

  export default function PriceRange({
    min = 0,
    max = 5000,
    step = 50,
    value,
    onChange,
  }: PriceRangeProps) {
    const [minVal, setMinVal] = useState<number>(value[0]);
    const [maxVal, setMaxVal] = useState<number>(value[1]);

    useEffect(() => {
      setMinVal(value[0]);
      setMaxVal(value[1]);
    }, [value]);

    const handleMin = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = Math.min(Number(e.target.value), maxVal - step);
      setMinVal(val);
      onChange([val, maxVal]);
    };

    const handleMax = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = Math.max(Number(e.target.value), minVal + step);
      setMaxVal(val);
      onChange([minVal, val]);
    };

    return (
      <div className="w-full">
        <div className="flex justify-between text-sm mb-2">
          <span>${minVal}</span>
          <span>${maxVal}</span>
        </div>

        <div className="relative h-2">
          <div className="absolute inset-0 bg-gray-300 rounded" />

          <div
            className="absolute h-2 bg-orange-500 rounded"
            style={{
              left: `${(minVal / max) * 100}%`,
              right: `${100 - (maxVal / max) * 100}%`,
            }}
          />

          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={minVal}
            onChange={handleMin}
            className="absolute w-full appearance-none bg-transparent pointer-events-none -mt-1.5"
          />

          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={maxVal}
            onChange={handleMax}
            className="absolute w-full appearance-none bg-transparent pointer-events-none -mt-1.5"
          />
        </div>
      </div>
    );
  }
