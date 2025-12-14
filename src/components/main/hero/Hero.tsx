"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";

export default function Hero() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 50, damping: 20 });
  const springY = useSpring(y, { stiffness: 50, damping: 20 });

  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [sound, setSound] = useState(false);
  const [volume, setVolume] = useState(0.6);

  const handleMove = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    let clientX = 0,
      clientY = 0;

    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const offsetX = clientX - rect.left - rect.width / 2;
    const offsetY = clientY - rect.top - rect.height / 2;

    x.set(offsetX * 0.1);
    y.set(offsetY * 0.1);
  };

  const togglePause = () => {
    if (!videoRef.current) return;
    if (paused) videoRef.current.play();
    else videoRef.current.pause();
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
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (videoRef.current) videoRef.current.volume = vol;
  };

  return (
    <div
      className="relative w-full h-[92vh] overflow-hidden bg-black"
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
        animate={{ scale: 1.1, opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-radial from-white/10 via-transparent to-transparent" />

      <button
        onClick={togglePause}
        className="absolute z-30 bottom-10 -left-4 md:left-10 bg-black/60 text-white px-4 py-2 rounded-xl hover:bg-black/80 transition"
      >
        {paused ? "▶ Play" : "⏸ Pause"}
      </button>

      <button
        onClick={toggleSound}
        className="absolute z-30 bottom-10 left-40 md:left-60 bg-black/60 text-white px-4 py-2 rounded-xl hover:bg-black/80 transition"
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
          className="absolute z-30 bottom-10 left-72 md:left-96 w-32 md:w-40"
        />
      )}

      <div className="relative z-20 flex flex-col justify-center h-full px-4 md:px-14 text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-2xl">
          Путешествуй по <span className="text-orange-400">Кыргызстану</span>
        </h1>

        <p className="text-lg md:text-xl mt-5 opacity-90 max-w-xl">
          Горные тропы, чистый воздух и незабываемые приключения.
        </p>

        <div className="mt-10 w-full md:w-[650px] bg-white/10 border border-white/20 backdrop-blur-xl rounded-3xl px-4 md:px-8 py-6 shadow-[0_8px_35px_rgba(255,255,255,0.15)] relative z-20">
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

            <button className="relative flex-1 px-5 py-3 rounded-xl font-semibold text-lg bg-orange-500 text-white overflow-hidden shadow-[0_0_20px_rgba(255,165,0,0.4)] hover:shadow-[0_0_35px_rgba(255,165,0,0.7)] transition-all mt-2 md:mt-0">
              <span className="relative z-10">Найти тур</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] animate-shimmer" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
