"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";

export default function Hero() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 40, damping: 25 });
  const springY = useSpring(y, { stiffness: 40, damping: 25 });

  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [sound, setSound] = useState(false);
  const [volume, setVolume] = useState(0.6);

  const handleMove = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if (window.innerWidth < 768) return; // 📱 mobile off

    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

    x.set((clientX - rect.left - rect.width / 2) * 0.08);
    y.set((clientY - rect.top - rect.height / 2) * 0.08);
  };

  const togglePause = () => {
    if (!videoRef.current) return;
    paused ? videoRef.current.play() : videoRef.current.pause();
    setPaused(!paused);
  };

  const toggleSound = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const newSound = !sound;
    video.muted = !newSound;
    video.volume = volume;
    setSound(newSound);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = Number(e.target.value);
    setVolume(vol);
    if (videoRef.current) videoRef.current.volume = vol;
  };

  return (
    <div
      className="relative w-full h-[85vh] md:h-[92vh] overflow-hidden bg-black"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      <motion.video
        ref={videoRef}
        src="/video/bg1.mp4"
        autoPlay
        loop
        muted={!sound}
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ x: springX, y: springY }}
        initial={{ scale: 1, opacity: 0 }}
        animate={{ scale: 1.08, opacity: 1 }}
        transition={{ duration: 1.3 }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90 z-10" />

      <div className="absolute z-30 bottom-5 left-0 w-full">
        <div className="container mx-auto px-4 md:px-14">
          <div className="flex flex-col gap-3 md:flex-row">
            <button
              onClick={togglePause}
              className="bg-black/60 text-white px-4 py-2 rounded-xl hover:bg-black/80 transition"
            >
              {paused ? "▶ Play" : "⏸ Pause"}
            </button>

            <button
              onClick={toggleSound}
              className="bg-black/60 text-white px-4 py-2 rounded-xl hover:bg-black/80 transition"
            >
              {sound ? "🔊 Sound ON" : "🔇 Sound OFF"}
            </button>

            {sound && (
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={handleVolumeChange}
                className="w-32 md:w-40"
              />
            )}
          </div>
        </div>
      </div>

      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-4 md:px-14 text-white">
          <h1 className="text-3xl xs:text-4xl md:text-5xl font-extrabold leading-tight">
            Путешествуй по <span className="text-orange-400">Кыргызстану</span>
          </h1>

          <p className="text-base md:text-xl mt-4 opacity-90 max-w-xl">
            Горные тропы, чистый воздух и незабываемые приключения.
          </p>

          <div className="mt-8 w-full md:w-[650px] bg-white/10 border border-white/20 backdrop-blur-xl rounded-3xl px-4 md:px-8 py-6 shadow-xl">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <select className="flex-1 bg-white/20 border border-white/30 px-4 py-3 rounded-xl text-white outline-none">
                <option className="text-black">Бишкек</option>
                <option className="text-black">Ош</option>
                <option className="text-black">Нарын</option>
              </select>

              <input
                type="date"
                className="flex-1 bg-white/20 border border-white/30 px-4 py-3 rounded-xl text-white outline-none"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="number"
                placeholder="Бюджет"
                className="flex-1 bg-white/20 border border-white/30 px-4 py-3 rounded-xl text-white placeholder-white/80 outline-none"
              />

              <button className="flex-1 px-5 py-3 rounded-xl font-semibold text-lg bg-orange-500 hover:bg-orange-600 transition">
                Найти тур
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
