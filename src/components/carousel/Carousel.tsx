"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Tour } from "../../types/tour.interface";

interface CarouselProps {
  items: Tour[];
  onItemClick: (tour: Tour) => void;
}

const Carousel = ({ items, onItemClick }: CarouselProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!items.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [items.length]);

  if (!items.length) return null;

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden rounded-2xl mt-10">
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {items.map((tour) => (
          <div
            key={tour.id}
            onClick={() => onItemClick(tour)}
            className="min-w-full h-full relative cursor-pointer"
          >
            <Image
              src={tour.images[0]}
              alt={tour.name}
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/40" />

            <div className="absolute bottom-6 left-6 z-10 text-white">
              <h3 className="text-2xl font-bold">{tour.name}</h3>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() =>
          setIndex(index === 0 ? items.length - 1 : index - 1)
        }
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full"
      >
        ◀
      </button>

      <button
        onClick={() => setIndex((index + 1) % items.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full"
      >
        ▶
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${
              i === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
