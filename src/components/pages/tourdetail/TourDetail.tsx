"use client";

import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
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
import { useAppSelector } from "@/src/redux/hooks";

type TourProgram = {
  day: string;
  description: string;
};

type Tour = {
  id: number;
  name: string;
  route: string;
  price: number;
  days: string;
  images: string[];
  start_point?: string;
  level?: string;
  group_size?: string;
  program?: TourProgram[];
};

const translations = {
  "ru-RU": {
    breadcrumb: { home: "Главная", tours: "Туры" },
    loading: "Загрузка...",
    notFound: "Тур не найден",
    features: {
      startPoint: "Точка старта",
      duration: "Длительность",
      cost: "Стоимость",
      level: "Уровень",
      groupSize: "Размер группы",
    },
    agent: { name: "Master Tour", address: "Бишкек, Киевская 112" },
    program: { title: "Программа тура" },
    bookButton: "Забронировать",
  },
  "en-US": {
    breadcrumb: { home: "Home", tours: "Tours" },
    loading: "Loading...",
    notFound: "Tour not found",
    features: {
      startPoint: "Starting Point",
      duration: "Duration",
      cost: "Cost",
      level: "Level",
      groupSize: "Group Size",
    },
    agent: { name: "Master Tour", address: "Bishkek, Kievskaya 112" },
    program: { title: "Tour Program" },
    bookButton: "Book Now",
  },
  "ky-KG": {
    breadcrumb: { home: "Башкы бет", tours: "Турлар" },
    loading: "Жүктөлүүдө...",
    notFound: "Тур табылган жок",
    features: {
      startPoint: "Башталыш чекити",
      duration: "Убактысы",
      cost: "Баасы",
      level: "Деңгээли",
      groupSize: "Топтун өлчөмү",
    },
    agent: { name: "Мастер Тур", address: "Бишкек, Киев көчөсү, 112" },
    program: { title: "Тур программасы" },
    bookButton: "Брондоо",
  },
};

export default function TourDetailPage() {
  const router = useRouter();
  const params = useParams();
  const tourId = params.tourDetail || params.id;
  const language = useAppSelector((state) => state.theme.language);

  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<number | null>(null);
  const [showButton, setShowButton] = useState(false);

  const t =
    translations[language as keyof typeof translations] ||
    translations["ru-RU"];
  const review = 8.4;

  useEffect(() => {
    if (!tourId) return;

    // getTourById(tourId as string)
    //   .then((data) => setTour(data))
    //   .catch(console.error)
    //   .finally(() => setLoading(false));
  }, [tourId]);

  useEffect(() => {
    const handleScroll = () => setShowButton(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggle = (index: number) => setActive(active === index ? null : index);

  if (loading) {
    return <div className="mt-40 text-center">{t.loading}</div>;
  }

  if (!tour) {
    return <div className="mt-40 text-center">{t.notFound}</div>;
  }

  const features = [
    {
      id: 1,
      icon: location,
      label: "Точка старта",
      value: tour.start_point || "—",
    },
    {
      id: 2,
      icon: durtion,
      label: "Длительность",
      value: tour.days,
    },
    {
      id: 3,
      icon: priceIcon,
      label: "Стоимость",
      value: `${tour.price}`,
    },
    {
      id: 4,
      icon: levelIcon,
      label: "Уровень",
      value: tour.level || "—",
    },
    {
      id: 5,
      icon: groupIcon,
      label: "Размер группы",
      value: tour.group_size || "—",
    },
  ];

  // return (
  //   <div className="mt-28 min-h-screen bg-gradient-to-br from-white to-orange-100 p-4 md:p-10">
  //     <div className="container mx-auto">
  //       <div className="text-sm text-gray-500 mb-6 flex gap-1 flex-wrap">
  //         <span
  //           onClick={() => router.push("/")}
  //           className="cursor-pointer hover:underline"
  //         >
  //           Дамой
  //         </span>
  //         /
  //         <span
  //           onClick={() => router.push("/tours")}
  //           className="cursor-pointer hover:underline"
  //         >
  //           Туры  
  //         </span>
  //         /<span className="text-black font-semibold">{tour.name}</span>
  //       </div>

  //       <div className="flex flex-col lg:flex-row gap-10 items-start">
  //         <div className="w-full lg:max-w-[600px]">
  //           <motion.div whileHover={{ scale: 1.03 }}>
  //             <img
  //               src={tour.images?.[0] || "/placeholder.jpg"}
  //               alt={tour.name}
  //               className="rounded-xl shadow-md w-full h-[400px] object-cover"
  //             />
  //           </motion.div>

  //           <div className="flex gap-3 mt-5">
  //             {tour.images?.slice(1, 4).map((img, i) => (
  //               <img
  //                 key={i}
  //                 src={img}
  //                 alt={tour.name}
  //                 className="rounded-lg border shadow-sm cursor-pointer transition-all w-1/3 h-[130px] object-cover"
  //               />
  //             ))}
  //           </div>
  //         </div>

  //         <div className="flex flex-col max-w-[400px] gap-6 w-full">
  //           <h1 className="text-3xl font-bold">{tour.name}</h1>
  //           <p className="text-gray-700 leading-relaxed">{tour.route}</p>

  //           <motion.div
  //             whileHover={{
  //               y: -3,
  //               boxShadow: "0px 15px 35px rgba(255,165,0,0.3)",
  //             }}
  //             className="flex items-center gap-6 bg-white shadow-md p-3 rounded-xl transition-all"
  //           >
  //             <Image
  //               src={touragent}
  //               alt="tour agent"
  //               width={80}
  //               height={80}
  //               className="rounded-md"
  //             />
  //             <div>
  //               <p className="font-semibold">{t.agent.name}</p>
  //               <p className="inline-flex items-center gap-2 bg-orange-500 text-white text-sm rounded px-2 py-[2px] my-1">
  //                 <SlLike className="text-white" size={15} />{" "}
  //                 {Math.round(review)}/10
  //               </p>
  //               <p className="text-gray-500 text-sm">{t.agent.address}</p>
  //             </div>
  //           </motion.div>
  //         </div>
  //       </div>

  //       <div className="flex flex-wrap justify-between mt-10 gap-4">
  //         {features.map((item) => (
  //           <motion.div
  //             key={item.id}
  //             whileHover={{
  //               y: -3,
  //               boxShadow: "0px 10px 25px rgba(255,165,0,0.3)",
  //             }}
  //             className="flex items-center gap-5 p-3 rounded-xl transition-all bg-white/40 border border-white/10 backdrop-blur-md flex-1 min-w-[200px]"
  //           >
  //             <Image src={item.icon} alt="icon" width={45} height={42} />
  //             <div>
  //               <p className="text-gray-500 text-sm">{item.label}:</p>
  //               <p className="font-semibold text-orange-500">{item.value}</p>
  //             </div>
  //           </motion.div>
  //         ))}
  //       </div>

  //       {tour.program && (
  //         <div className="flex flex-col items-center mt-16 w-full">
  //           <h1 className="text-[30px] text-center font-bold">
  //             {t.program.title}
  //           </h1>
  //           <div className="max-w-3xl mx-auto mt-8 flex flex-col gap-4 w-full">
  //             {tour.program.map((el, index) => (
  //               <motion.div
  //                 key={index}
  //                 className="border border-gray-200 rounded-xl overflow-hidden bg-white"
  //                 whileHover={{ scale: 1.01 }}
  //               >
  //                 <button
  //                   onClick={() => toggle(index)}
  //                   className="w-full flex justify-between items-center px-6 py-4 hover:bg-orange-50 transition-colors rounded-lg"
  //                 >
  //                   <span className="font-semibold text-gray-800 text-[17px]">
  //                     {el.day}
  //                   </span>
  //                   <motion.span
  //                     animate={{ rotate: active === index ? 45 : 0 }}
  //                     transition={{ duration: 0.3 }}
  //                     className="text-gray-500 text-2xl flex items-center"
  //                   >
  //                     <FiPlus />
  //                   </motion.span>
  //                 </button>

  //                 <AnimatePresence initial={false}>
  //                   {active === index && (
  //                     <motion.div
  //                       initial={{ height: 0, opacity: 0 }}
  //                       animate={{ height: "auto", opacity: 1 }}
  //                       exit={{ height: 0, opacity: 0 }}
  //                       transition={{ duration: 0.5, ease: "easeInOut" }}
  //                       className="px-6 py-4 bg-gray-50 text-gray-700 text-[15px] leading-relaxed"
  //                     >
  //                       {el.description}
  //                     </motion.div>
  //                   )}
  //                 </AnimatePresence>
  //               </motion.div>
  //             ))}
  //           </div>
  //         </div>
  //       )}

  //       <div
  //         id="booking-button"
  //         className="w-full flex justify-center z-50 fixed left-1/2 transition-all duration-300"
  //         style={{
  //           bottom: 40,
  //           opacity: showButton ? 1 : 0,
  //           pointerEvents: showButton ? "auto" : "none",
  //           transform: showButton
  //             ? "translateX(-50%)"
  //             : "translate(-50%, 20px)",
  //         }}
  //       >
  //         <motion.button
  //           whileHover={{
  //             scale: 1.05,
  //             boxShadow: "0px 0px 25px rgba(255,165,0,0.5)",
  //           }}
  //           className="px-12 py-4 bg-orange-500 text-white rounded-lg text-[15px] hover:bg-orange-600 animate-pulse shadow-lg"
  //           onClick={() => router.push(`/order?tour=${tour.id}`)}
  //         >
  //           Забронировать
  //         </motion.button>
  //       </div>
  //     </div>
  //   </div>
  // );
}
