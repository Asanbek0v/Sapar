"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Hero() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 50, damping: 20 });
  const springY = useSpring(y, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    x.set(offsetX * 0.05);
    y.set(offsetY * 0.05);
  };

  return (
    <div className="w-full h-[90vh] relative overflow-hidden">
      <div className="absolute inset-0" onMouseMove={handleMouseMove}>
        {/* Background video */}
        <motion.video
          src="/video/bg.mp4"
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{
            x: springX,
            y: springY,
            scale: 1.2,
          }}
        />

        {/* Content */}
        <motion.div
          className="
          relative z-10 flex flex-col items-start justify-center
          h-full px-10 text-white
          mt-[35px] ml-[60px]
        "
          style={{
            x: springX,
            y: springY,
          }}
        >
          <h1 className="text-5xl font-bold mb-5">
            Туры по <span className="text-orange-500">Кыргызстану</span>
          </h1>

          <p className="text-xl my-5">
            Лучше один раз увидеть, <br /> чем сто раз мечтать
          </p>

          {/* Search Bar */}
          <motion.div className="flex bg-white rounded-full overflow-hidden shadow-lg">
            <select className="h-full px-4 py-3 text-black outline-none border-r">
              <option>Бишкек</option>
              <option>Ош</option>
              <option>Нарын</option>
              <option>Талас</option>
            </select>

            <input
              type="date"
              className="px-4 py-3 outline-none text-black border-r"
            />

            <input
              type="number"
              placeholder="5000"
              className="px-4 py-3 w-24 outline-none text-black border-r"
            />

            <select className="px-4 py-3 text-black outline-none border-r">
              <option>Треккинг</option>
              <option>Offroad</option>
              <option>Каньонинг</option>
            </select>

            <button className="bg-orange-500 px-6 py-3 text-white font-medium border-0">
              Найти тур
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
