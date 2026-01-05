"use client";

import { useEffect, useState } from "react";

type PriceRangeProps = {
  max?: number;
  min?: number;
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
  const [minVal, setMinVal] = useState(value[0]);
  const [maxVal, setMaxVal] = useState(value[1]);

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

  const minPercent = ((minVal - min) / (max - min)) * 100;
  const maxPercent = ((maxVal - min) / (max - min)) * 100;

  return (
    <div className="w-full select-none">
      <div className="flex justify-between text-sm mb-2">
        <span>${minVal}</span>
        <span>${maxVal}</span>
      </div>

      <div className="relative h-6">
        <div className="absolute inset-0 top-2 h-2 bg-gray-300 rounded pointer-events-none" />

        <div
          className="absolute top-2 h-2 bg-orange-500 rounded pointer-events-none"
          style={{
            left: `${minPercent}%`,
            right: `${100 - maxPercent}%`,
          }}
        />

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minVal}
          onChange={handleMin}
          className="range-thumb range-min"
        />

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxVal}
          onChange={handleMax}
          className="range-thumb range-max"
        />
      </div>

      <style jsx>{`
        .range-thumb {
          position: absolute;
          width: 100%;
          height: 24px;
          background: transparent;
          pointer-events: none;
          appearance: none;
        }

        .range-min {
          z-index: 20;
        }

        .range-max {
          z-index: 30;
        }

        .range-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background: #f97316;
          border-radius: 9999px;
          border: 2px solid white;
          cursor: pointer;
          pointer-events: auto;
        }

        .range-thumb::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: #f97316;
          border-radius: 9999px;
          border: 2px solid white;
          cursor: pointer;
          pointer-events: auto;
        }
      `}</style>
    </div>
  );
}
