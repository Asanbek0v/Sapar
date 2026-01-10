"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Hero() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 40, damping: 25 });
  const springY = useSpring(y, { stiffness: 40, damping: 25 });

  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [sound, setSound] = useState(false);
  const [volume, setVolume] = useState(0.6);

  const [city, setCity] = useState("Бишкек");
  const [date, setDate] = useState("");
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleMove = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if (window.innerWidth < 768) return;

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

  const searchTour = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        "https://tourism-backend-laq8.onrender.com/ru/api/v1/tours"
      );

      const tours =
        response.data?.data || response.data?.tours || response.data;

      console.log("=== DEBUGGING ===");
      console.log("Жалпы турлар:", tours.length);
      console.log("Тандалган шаар/област:", city);

      if (tours && tours.length > 0) {
        let filteredTours = tours;

        // КАТУУ ФИЛЬТРАЦИЯ: Тандалган шаар/област ТОЛУК туура келиш керек
        if (city) {
          filteredTours = filteredTours.filter((tour: any) => {
            // Толук так окшош болсо
            if (tour.city === city) return true;

            // Эгерде tour.city маалымат жок болсо, false кайтарабыз
            if (!tour.city) return false;

            return false;
          });

          console.log(
            `City/Oblast фильтринен кийин: ${filteredTours.length} тур`
          );
        }

        // Дата фильтрациясы
        if (date && filteredTours.length > 0) {
          filteredTours = filteredTours.filter(
            (tour: any) => tour.date === date
          );
          console.log(`Date фильтринен кийин: ${filteredTours.length} тур`);
        }

        // Бюджет фильтрациясы
        if (budget && filteredTours.length > 0) {
          filteredTours = filteredTours.filter(
            (tour: any) => tour.price <= Number(budget)
          );
          console.log(`Budget фильтринен кийин: ${filteredTours.length} тур`);
        }

        console.log("Акыркы натыйжа:", filteredTours.length, "тур");

        if (filteredTours.length > 0) {
          localStorage.setItem("searchResults", JSON.stringify(filteredTours));
          localStorage.setItem(
            "searchParams",
            JSON.stringify({ city, date, budget })
          );
          router.push("/tours");
        } else {
          const availableCities = [...new Set(tours.map((t: any) => t.city))];
          setError(
            `"${city}" ${date ? `(${date})` : ""} ${
              budget ? `бюджет: ${budget} сом` : ""
            } боюнча турлар табылган жок. Бизде бар турлар: ${availableCities.join(
              ", "
            )}`
          );
        }
      } else {
        setError("API турларды кайтарган жок");
      }
    } catch (error) {
      console.error("Ката:", error);
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message || "Турларды издөөдө ката кетти"
        );
      } else {
        setError("Турларды издөөдө ката кетти");
      }
    } finally {
      setLoading(false);
    }
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

          <form
            onSubmit={searchTour}
            className="mt-8 w-full md:w-[650px] bg-white/10 border border-white/20 backdrop-blur-xl rounded-3xl px-4 md:px-8 py-6 shadow-xl"
          >
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="flex-1 bg-white/20 border border-white/30 px-4 py-3 rounded-xl text-white outline-none"
              >
                <option className="text-black" value="Бишкек">
                  Бишкек
                </option>
                <option className="text-black" value="Ош">
                  Ош
                </option>
                <option className="text-black" value="Нарын">
                  Нарын
                </option>
                <option className="text-black" value="Иссык-Куль">
                  Иссык-Куль
                </option>
                <option className="text-black" value="Баткен">
                  Баткен
                </option>{" "}
                <option className="text-black" value="Талас">
                  Талас
                </option>{" "}
                <option className="text-black" value="Каракол">
                  Чуй
                </option>{" "}
                <option className="text-black" value="Жалал-Абад">
                  Жалал-Абад
                </option>
              </select>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="flex-1 bg-white/20 border border-white/30 px-4 py-3 rounded-xl text-white outline-none"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="number"
                placeholder="Бюджет"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="flex-1 bg-white/20 border border-white/30 px-4 py-3 rounded-xl text-white placeholder-white/80 outline-none"
              />

              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-5 py-3 rounded-xl font-semibold text-lg bg-orange-500 hover:bg-orange-600 transition disabled:bg-orange-400 disabled:cursor-not-allowed"
              >
                {loading ? "Издөө..." : "Найти тур"}
              </button>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-white text-sm">
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
