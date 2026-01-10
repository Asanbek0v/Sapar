"use client";

import Image from "next/image";
import { useRouter, useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlLike } from "react-icons/sl";
import { FiPlus } from "react-icons/fi";

import touragent from "@/src/assets/masterTour.svg";
import location from "@/src/assets/location.svg";
import durtion from "@/src/assets/durtion.svg";
import priceIcon from "@/src/assets/price.svg";
import levelIcon from "@/src/assets/level.svg";
import groupIcon from "@/src/assets/group.png";
import { getTourById } from "@/src/services/tours.service";

type Tour = {
  id: string;
  name: string;
  description: string;
  city: string;
  category: string;
  date: string;
  price: number;
  duration: number;
  maxPeople: number;
  images: string[];
};

export default function TourDetailPage() {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();

  const [tour, setTour] = useState<Tour | null>(null);
  const [program, setProgram] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [active, setActive] = useState<number | null>(null);
  const [showButton, setShowButton] = useState(false);

  const review = 8.4;

  useEffect(() => {
    const tourId = params?.tourDetail as string;

    if (!tourId) {
      setError("ID тура не найден");
      setLoading(false);
      return;
    }

    const fetchAllData = async () => {
      setLoading(true);
      setError("");
      try {
        // 1. Турдун маалыматы
        const tourData = await getTourById(tourId);
        setTour(tourData.data || tourData);

        const programRes = await fetch(
          `https://tourism-backend-laq8.onrender.com/ru/api/v1/tours/${tourId}/program`
        );
        const programData = await programRes.json();

        if (programData && programData.days) {
          setProgram(programData.days);
        } else if (Array.isArray(programData)) {
          setProgram(programData);
        }
      } catch (err: any) {
        setError(err.message || "Ошибка загрузки тура");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [params, pathname]);

  useEffect(() => {
    const handleScroll = () => setShowButton(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggle = (index: number) => setActive(active === index ? null : index);

  if (loading) {
    return (
      <div className="mt-40 text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto"></div>
        <p className="mt-4">Загрузка...</p>
      </div>
    );
  }

  if (error || !tour) {
    return (
      <div className="mt-40 text-center">
        <p className="text-xl font-bold text-red-500">Тур не найден</p>

        <button
          onClick={() => router.push("/tours?all=true")}
          className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
        >
          Вернуться ко всем турам
        </button>
      </div>
    );
  }

  const features = [
    { id: 1, icon: location, label: "Город", value: tour.city },
    {
      id: 2,
      icon: durtion,
      label: "Длительность",
      value: `${tour.duration} дней`,
    },
    { id: 3, icon: priceIcon, label: "Стоимость", value: `${tour.price} сом` },
    {
      id: 4,
      icon: groupIcon,
      label: "Макс. людей",
      value: `${tour.maxPeople} человек`,
    },
    { id: 5, icon: levelIcon, label: "Уровень", value: "Средний" },
  ];

  return (
    <div className="mt-28 min-h-screen bg-gradient-to-br from-white to-orange-100 p-4 md:p-10">
      <div className="container mx-auto">
        <div className="text-sm text-gray-500 mb-6 flex gap-1 flex-wrap">
          <span
            onClick={() => router.push("/")}
            className="cursor-pointer hover:underline"
          >
            Главная
          </span>{" "}
          /
          <span
            onClick={() => router.push("/tours?all=true")}
            className="cursor-pointer hover:underline"
          >
            {" "}
            Туры{" "}
          </span>{" "}
          /<span className="text-black font-semibold">{tour.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <div className="w-full lg:max-w-[600px]">
            <motion.div whileHover={{ scale: 1.03 }}>
              <img
                src={tour.images?.[0] || "/placeholder.jpg"}
                alt={tour.name}
                className="rounded-xl shadow-md w-full h-[400px] object-cover"
              />
            </motion.div>
            <div className="flex gap-3 mt-5">
              {tour.images?.slice(1, 4).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={tour.name}
                  className="rounded-lg border shadow-sm cursor-pointer w-1/3 h-[130px] object-cover"
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col max-w-[400px] gap-6 w-full">
            <h1 className="text-3xl font-bold">{tour.name}</h1>
            <h2 className="text-gray-600">{tour.description}</h2>
            <p className="text-gray-700">Город: {tour.city}</p>

            <motion.div className="flex items-center gap-6 bg-white shadow-md p-3 rounded-xl border border-orange-50">
              <Image src={touragent} alt="agent" width={80} height={80} />
              <div>
                <p className="font-semibold">Master Tour</p>
                <p className="inline-flex items-center gap-2 bg-orange-500 text-white text-sm rounded px-2 py-[2px] my-1">
                  <SlLike size={15} /> {Math.round(review)}/10
                </p>
                <p className="text-gray-500 text-sm">Бишкек, Киевская 112</p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between mt-10 gap-4">
          {features.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-5 p-3 rounded-xl bg-white flex-1 min-w-[200px] shadow-sm"
            >
              <Image src={item.icon} alt="icon" width={45} height={42} />
              <div>
                <p className="text-gray-500 text-sm">{item.label}:</p>
                <p className="font-semibold text-orange-500">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 pb-20">
          <h2 className="text-2xl text-center font-bold mb-8">
            Программа тура
          </h2>
          <div className="max-w-3xl mx-auto flex flex-col gap-4">
            {program && program.length > 0 ? (
              program.map((description, index) => (
                <div
                  key={index}
                  className="border rounded-xl bg-white shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => toggle(index)}
                    className="w-full flex justify-between items-center px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-lg">
                      День {index + 1}
                    </span>
                    <FiPlus
                      className={`transition-transform duration-300 ${
                        active === index
                          ? "rotate-45 text-orange-500"
                          : "text-gray-400"
                      }`}
                      size={20}
                    />
                  </button>
                  <AnimatePresence>
                    {active === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 py-4 bg-gray-50 text-gray-700 border-t border-gray-100">
                          {description}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))
            ) : (
              <div className="text-center py-10 bg-white/50 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 italic">
                Программа тура скоро будет добавлена менеджером.
              </div>
            )}
          </div>
        </div>

        <div
          className="fixed left-1/2 bottom-10 transition-all z-50"
          style={{
            transform: "translateX(-50%)",
            opacity: showButton ? 1 : 0,
            pointerEvents: showButton ? "auto" : "none",
          }}
        >
          <button
            onClick={() => router.push(`/order?tour=${tour.id}`)}
            className="px-12 py-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 shadow-lg"
          >
            Забронировать
          </button>
        </div>
      </div>
    </div>
  );
}
