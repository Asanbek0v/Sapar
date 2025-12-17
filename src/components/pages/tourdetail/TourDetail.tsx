"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlLike } from "react-icons/sl";
import { FiPlus } from "react-icons/fi";
import tourimg from "@/src/assets/Сары-Челек.jpg";
import touragent from "@/src/assets/masterTour.svg";
import location from "@/src/assets/location.svg";
import durtion from "@/src/assets/durtion.svg";
import price from "@/src/assets/price.svg";
import level from "@/src/assets/level.svg";
import group from "@/src/assets/group.png";

export default function TourDetail() {
  const router = useRouter();
  const [showButton, setShowButton] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  const rewiew = 5.49;

  const tour = [
    {
      id: 1,
      title: "Сары-Челек",
      description:
        "Озеро Сары-Челек — одно из красивейших озёр Кыргызстана, окружённое густыми лесами и горами.",
      url: tourimg,
    },
  ];

  const tourFeatures = [
    { id: 1, icon: location, label: "Точка старта", value: "Бишкек" },
    { id: 2, icon: durtion, label: "Длительность", value: "3 дня 2 ночи" },
    { id: 3, icon: price, label: "Стоимость", value: "500$" },
    { id: 4, icon: level, label: "Уровень", value: "Средний" },
    { id: 5, icon: group, label: "Размер группы", value: "от 4 до 14 чел" },
  ];

  const programTour = [
    {
      day: "День 1",
      title: "Прибытие в Бишкек и трансфер к озеру Сары-Челек",
      description:
        "Встреча группы в аэропорту города Бишкек, знакомство с гидом и краткий инструктаж по туру. После завтрака — выезд на комфортабельном транспорте через живописные долины, горные перевалы и небольшие населенные пункты. По пути гид рассказывает о истории и культуре региона. Прибытие в заповедник Сары-Челек, размещение в гостевом доме, ужин и отдых после дороги.",
    },
    {
      day: "День 2",
      title: "Экскурсия к озеру Сары-Челек",
      description:
        "После завтрака — прогулка к главному озеру Сары-Челек. Осмотр берега, фотосессия на фоне лесов и гор. По пути гид рассказывает о флоре и фауне заповедника, о редких видах животных и растений. Обед на природе с видом на озеро. После обеда свободное время для купания, прогулок и наблюдения за птицами. Вечером возвращение в базу, ужин и отдых.",
    },
    {
      day: "День 3",
      title: "Поход к Малым озёрам",
      description:
        "Утренний завтрак, подготовка к походу. Выход на тропу к Малым озёрам, которая проходит через хвойные леса, альпийские луга и горные потоки. Возможность увидеть редкие виды растений, насладиться свежим воздухом и чистой водой. Обед на природе с пикником. Вечером возвращение в лагерь, обмен впечатлениями, ужин и свободное время.",
    },
    {
      day: "День 4",
      title: "Треккинг по горам Чаткала",
      description:
        "Ранний завтрак и выход в горы Чаткала. Долгая прогулка по тропам, которые открывают панорамные виды на долины, ледники и озёра. Гид рассказывает о географии, экологии и исторических фактах региона. Пикник на высоте с живописными видами. Возвращение в лагерь к вечеру, ужин, свободное время для отдыха и фотографирования заката.",
    },
    {
      day: "День 5",
      title: "Свободный день / отдых",
      description:
        "После плотного треккинга несколько дней отдыха. Свободное время для самостоятельного исследования территории, конных прогулок, рыбалки или купания в озере (в зависимости от сезона). Возможность пообщаться с местными жителями, посетить окрестные деревни, насладиться природой и тишиной заповедника. Вечером общая встреча группы, ужин и обмен впечатлениями.",
    },
    {
      day: "День 6",
      title: "Возвращение в Бишкек",
      description:
        "Завтрак и выезд из Сары-Челека обратно в Бишкек. По пути — остановки для фотографирования живописных мест, рек, перевалов и долин. Гид рассказывает о традициях и культуре региона. Прибытие в Бишкек, размещение в отеле, ужин в местном ресторане и отдых после дороги. Возможность свободного времени для прогулок по городу.",
    },
    {
      day: "День 7",
      title: "Экскурсия по Бишкеку и вылет",
      description:
        "После завтрака — обзорная экскурсия по городу Бишкек: площадь Ала-Тоо, парк Победы, филармония, местные рынки и сувенирные лавки. Гид рассказывает о культурной и исторической ценности достопримечательностей. После экскурсии трансфер в аэропорт и прощание с группой. Конец тура.",
    },
  ];

  const toggle = (index: number) => {
    setActive(active === index ? null : index);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="pt-36 min-h-screen bg-gradient-to-br from-white to-[#ff6600] flex items-center justify-center  p-40 relative overflow-hidden">
      <div className=" mb-10 relative container mx-auto px-4 mt-28  ">
        <div className="text-sm text-gray-500 mb-6 flex gap-1 flex-wrap">
          <span
            className="cursor-pointer hover:underline"
            onClick={() => router.push("/")}
          >
            Главная
          </span>
          /{" "}
          <span
            className="cursor-pointer hover:underline "
            onClick={() => router.push("/tours")}
          >
            Туры
          </span>
          /<span className="text-black font-semibold">Сары-Челек</span>
        </div>

        {tour.map((el) => (
          <div
            key={el.id}
            className="flex gap-10 justify-between items-start flex-wrap"
          >
            <motion.div
              className="max-w-[600px] w-full"
              whileHover={{ scale: 1.03 }}
            >
              <Image
                src={el.url}
                alt={el.title}
                width={600}
                height={400}
                className="rounded-xl shadow-md"
              />
              <div className="flex justify-between mt-5 gap-3">
                {[1, 2, 3].map((_, index) => (
                  <motion.div key={index} whileHover={{ scale: 1.05 }}>
                    <Image
                      src={el.url}
                      alt={el.title}
                      width={180}
                      height={130}
                      className="rounded-lg border shadow-sm cursor-pointer transition-all"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div className="flex flex-col max-w-[400px] gap-6 w-full">
              <h1 className="text-3xl font-bold">{el.title}</h1>
              <p className="text-gray-700 leading-relaxed">{el.description}</p>

              <motion.div
                whileHover={{
                  y: -3,
                  boxShadow: "0px 15px 35px rgba(255,165,0,0.3)",
                }}
                className="mt-5 flex items-center gap-6 bg-white shadow-md p-3 rounded-xl transition-all"
              >
                <Image
                  src={touragent}
                  alt="tour agent"
                  width={80}
                  height={80}
                  className="rounded-md"
                />
                <div>
                  <p className="font-semibold">Master Tour</p>
                  <p className="inline-flex items-center justify-center gap-2 bg-[#ff6600] text-white text-sm rounded px-2 py-[2px] my-1">
                    <SlLike className="text-white" size={15} />
                    {Math.round(rewiew)}/10
                  </p>
                  <p className="text-gray-500 text-sm">
                    Бишкек, Киевская улица, д. 112
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center mt-20 flex-wrap gap-6">
          {tourFeatures.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{
                y: -3,
                boxShadow: "0px 10px 25px rgba(255,165,0,0.3)",
              }}
              className="flex items-center gap-5 p-3 rounded-xl transition-all bg-white/40 border border-white/10 backdrop-blur-md"
            >
              <Image src={item.icon} alt="icon" width={45} height={42} />
              <div>
                <p className="text-gray-500 text-sm">{item.label}:</p>
                <p className="font-semibold text-[#ff6600]">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col items-center mt-28 w-full">
          <h1 className="text-[30px] text-center font-bold">
            Программа <br /> тура
          </h1>
          <div className="max-w-3xl mx-auto mt-10 flex flex-col gap-6 w-full">
            {programTour.map((el, index) => (
              <motion.div
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden bg-white"
                whileHover={{ scale: 1.01 }}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex justify-between items-center px-6 py-4 hover:bg-orange-50 transition-colors rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 text-base">{el.day}</span>
                    <span className="font-semibold text-gray-800 text-[17px]">
                      {el.title}
                    </span>
                  </div>

                  <motion.span
                    animate={{ rotate: active === index ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-500 text-2xl flex items-center"
                  >
                    <FiPlus />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {active === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="px-6 py-4 bg-gray-50 text-gray-700 text-[15px] leading-relaxed"
                    >
                      {el.description}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        <div
          id="booking-button"
          className="w-full flex justify-center z-50 fixed left-1/2 transition-all duration-300"
          style={{
            bottom: 40,
            opacity: showButton ? 1 : 0,
            pointerEvents: showButton ? "auto" : "none",
            transform: showButton
              ? "translate(-50%, 0)"
              : "translate(-50%, 20px)",
          }}
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 25px rgba(255,165,0,0.5)",
            }}
            className="px-12 py-4 bg-orange-500 text-white rounded-lg text-[15px] hover:bg-orange-600 animate-pulse shadow-lg"
            onClick={() => router.push("/")}
          >
            Забронировать
          </motion.button>
        </div>
      </div>
    </div>
  );
}
