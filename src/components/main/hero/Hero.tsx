"use client";
// import { useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Hero() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 40, damping: 20 });
  const springY = useSpring(y, { stiffness: 40, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    x.set(offsetX * 0.15);
    y.set(offsetY * 0.15);
  };

  return (
    <div
      className="w-full h-[90vh] relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          x: springX,
          y: springY,
          scale: 1.12,
        }}
      >
        <video
          src="/video/bg1.mp4"
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="relative z-10 h-full flex flex-col items-start justify-center px-10 mt-[35px] ml-[60px] text-white">
        <h1 className="text-5xl font-bold mb-2">
          Туры по <span className="text-orange-500">Кыргызстану</span>
        </h1>

        <p className="text-xl my-5">
          Лучше один раз увидеть, <br /> чем сто раз мечтать
        </p>

        <div className="flex bg-white rounded-full overflow-hidden shadow-lg z-20">
          <select className="h-full px-4 py-3 text-black outline-none border-r z-20">
            <option>Бишкек</option>
            <option>Ош</option>
            <option>Нарын</option>
            <option>Талас</option>
          </select>

          <input
            type="date"
            className="px-4 py-3 outline-none text-black border-r z-20"
          />

          <input
            type="number"
            placeholder="5000"
            className="px-4 py-3 w-24 outline-none text-black border-r z-20"
          />

          <select className="px-4 py-3 text-black outline-none border-r z-20">
            <option>Треккинг</option>
            <option>Offroad</option>
            <option>Каньонинг</option>
          </select>

          <button className="bg-orange-500 px-6 py-3 text-white font-medium border-0 z-20">
            Найти тур
          </button>
        </div>
      </div>
    </div>
  );
}
