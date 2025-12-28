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
import { useAppSelector } from "@/src/redux/hooks";

const translations = {
  "ru-RU": {
    breadcrumb: {
      home: "Главная",
      tours: "Туры",
    },
    tour: {
      title: "Сары-Челек",
      description:
        "Озеро Сары-Челек — одно из красивейших озёр Кыргызстана, окружённое густыми лесами и горами.",
    },
    features: {
      startPoint: "Точка старта",
      duration: "Длительность",
      cost: "Стоимость",
      level: "Уровень",
      groupSize: "Размер группы",
    },
    values: {
      startPoint: "Бишкек",
      duration: "3 дня 2 ночи",
      cost: "500$",
      level: "Средний",
      groupSize: "от 4 до 14 чел",
    },
    agent: {
      name: "Master Tour",
      address: "Бишкек, Киевская улица, д. 112",
    },
    program: {
      title: "Программа тура",
      days: [
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
      ],
    },
    bookButton: "Забронировать",
  },
  "en-US": {
    breadcrumb: {
      home: "Home",
      tours: "Tours",
    },
    tour: {
      title: "Sary-Chelek",
      description:
        "Lake Sary-Chelek is one of the most beautiful lakes in Kyrgyzstan, surrounded by dense forests and mountains.",
    },
    features: {
      startPoint: "Starting Point",
      duration: "Duration",
      cost: "Cost",
      level: "Level",
      groupSize: "Group Size",
    },
    values: {
      startPoint: "Bishkek",
      duration: "3 days 2 nights",
      cost: "$500",
      level: "Intermediate",
      groupSize: "4 to 14 people",
    },
    agent: {
      name: "Master Tour",
      address: "Bishkek, Kievskaya Street, 112",
    },
    program: {
      title: "Tour Program",
      days: [
        {
          day: "Day 1",
          title: "Arrival in Bishkek and transfer to Sary-Chelek Lake",
          description:
            "Meeting the group at Bishkek airport, introduction to the guide and brief tour briefing. After breakfast — departure by comfortable transport through picturesque valleys, mountain passes and small settlements. Along the way, the guide talks about the history and culture of the region. Arrival at the Sary-Chelek reserve, accommodation in a guesthouse, dinner and rest after the journey.",
        },
        {
          day: "Day 2",
          title: "Excursion to Sary-Chelek Lake",
          description:
            "After breakfast — walk to the main Sary-Chelek lake. Shore inspection, photo session against the backdrop of forests and mountains. Along the way, the guide talks about the flora and fauna of the reserve, about rare species of animals and plants. Lunch in nature with a view of the lake. After lunch, free time for swimming, walks and bird watching. In the evening, return to the base, dinner and rest.",
        },
        {
          day: "Day 3",
          title: "Hike to Small Lakes",
          description:
            "Morning breakfast, preparation for the hike. Going out on the trail to the Small Lakes, which passes through coniferous forests, alpine meadows and mountain streams. Opportunity to see rare plant species, enjoy fresh air and clean water. Lunch in nature with a picnic. In the evening, return to camp, exchange impressions, dinner and free time.",
        },
        {
          day: "Day 4",
          title: "Trekking in Chatkal Mountains",
          description:
            "Early breakfast and departure to the Chatkal mountains. Long walk along trails that open panoramic views of valleys, glaciers and lakes. The guide talks about geography, ecology and historical facts of the region. Picnic at altitude with picturesque views. Return to camp in the evening, dinner, free time for rest and photographing the sunset.",
        },
        {
          day: "Day 5",
          title: "Free day / rest",
          description:
            "After intense trekking, several days of rest. Free time for independent exploration of the area, horseback riding, fishing or swimming in the lake (depending on the season). Opportunity to chat with locals, visit surrounding villages, enjoy nature and silence of the reserve. In the evening, group meeting, dinner and exchange of impressions.",
        },
        {
          day: "Day 6",
          title: "Return to Bishkek",
          description:
            "Breakfast and departure from Sary-Chelek back to Bishkek. On the way — stops for photographing picturesque places, rivers, passes and valleys. The guide talks about traditions and culture of the region. Arrival in Bishkek, accommodation in a hotel, dinner in a local restaurant and rest after the journey. Possibility of free time for walks around the city.",
        },
        {
          day: "Day 7",
          title: "Bishkek tour and departure",
          description:
            "After breakfast — sightseeing tour of Bishkek: Ala-Too square, Victory Park, Philharmonic, local markets and souvenir shops. The guide talks about cultural and historical value of attractions. After the tour, transfer to the airport and farewell to the group. End of tour.",
        },
      ],
    },
    bookButton: "Book Now",
  },
  "ky-KG": {
    breadcrumb: {
      home: "Башкы бет",
      tours: "Турлар",
    },
    tour: {
      title: "Сары-Челек",
      description:
        "Сары-Челек көлү — Кыргызстандын эң сулуу көлдөрүнүн бири, тыгыз токой жана тоолор менен курчалган.",
    },
    features: {
      startPoint: "Башталыш чекити",
      duration: "Убактысы",
      cost: "Баасы",
      level: "Деңгээли",
      groupSize: "Топтун өлчөмү",
    },
    values: {
      startPoint: "Бишкек",
      duration: "3 күн 2 түн",
      cost: "500$",
      level: "Орточо",
      groupSize: "4тен 14кө чейин",
    },
    agent: {
      name: "Мастер Тур",
      address: "Бишкек, Киев көчөсү, 112",
    },
    program: {
      title: "Тур программасы",
      days: [
        {
          day: "1-күн",
          title: "Бишкекке келүү жана Сары-Челекке трансфер",
          description:
            "Топту Бишкек аэропортунда тосуп алуу, гид менен таанышуу жана тур боюнча кыска инструктаж. Эртең мененки тамактан кийин — ыңгайлуу транспорт менен сулуу өрөөндөр, тоо ашуулары жана кичинекей жашоо пункттары аркылуу чыгуу. Жолдо гид аймактын тарыхы жана маданияты жөнүндө айтып берет. Сары-Челек коругуна келүү, конок үйгө жайгашуу, кечки тамак жана жолдон кийин эс алуу.",
        },
        {
          day: "2-күн",
          title: "Сары-Челек көлүнө экскурсия",
          description:
            "Эртең мененки тамактан кийин — негизги Сары-Челек көлүнө сейилдөө. Жээкти карап чыгуу, токой жана тоолордун фонунда фото тартуу. Жолдо гид коруктун өсүмдүктөрү жана жаныбарлары, сейрек кездешүүчү жаныбарлар жана өсүмдүктөр жөнүндө айтып берет. Көлдүн көрүнүшү менен табияттагы түшкү тамак. Түшкү тамактан кийин суу менен сугунууга, сейилдөөгө жана канаттууларды байкоого эркин убакыт. Кечинде базага кайтуу, кечки тамак жана эс алуу.",
        },
        {
          day: "3-күн",
          title: "Кичине көлдөргө жорук",
          description:
            "Эртең мененки тамак, жорукка даярдык. Кичине көлдөргө жол, ал хвойлуу токойлор, альп талаалары жана тоо агымдары аркылуу өтөт. Сейрек өсүмдүктөрдү көрүү, таза аба жана таза суу менен ырахаттануу мүмкүнчүлүгү. Пикник менен табияттагы түшкү тамак. Кечинде лагерге кайтуу, таасирлер менен бөлүшүү, кечки тамак жана эркин убакыт.",
        },
        {
          day: "4-күн",
          title: "Чаткал тоолору боюнча треккинг",
          description:
            "Эртең мененки эрте тамак жана Чаткал тоолоруна чыгуу. Өрөөндөргө, муздуктарга жана көлдөргө панорамалык көрүнүштөрдү ачкан соктор боюнча узак сейилдөө. Гид аймактын географиясы, экологиясы жана тарыхый фактылары жөнүндө айтып берет. Сулуу көрүнүштөр менен бийиктикте пикник. Кечинде лагерге кайтуу, кечки тамак, эс алууга жана күн батышын тартууга эркин убакыт.",
        },
        {
          day: "5-күн",
          title: "Эркин күн / эс алуу",
          description:
            "Интенсивдүү треккингден кийин бир нече күн эс алуу. Аймакты өз алдынча изилдөө, аттуу сейилдөө, балык уулоо же көлдө сугунуу үчүн эркин убакыт (мезгилге жараша). Жергиликтүү тургундар менен баарлашуу, айланадагы айылдарды барып көрүү, коруктун табиятынан жана тынчтыгынан ырахаттануу мүмкүнчүлүгү. Кечинде топтун жалпы жолугушуусу, кечки тамак жана таасирлер менен бөлүшүү.",
        },
        {
          day: "6-күн",
          title: "Бишкекке кайтуу",
          description:
            "Эртең мененки тамак жана Сары-Челектен Бишкекке кайтуу. Жолдо — сулуу жерлерди, дарыяларды, ашууларды жана өрөөндөрдү тартуу үчүн токтоолор. Гид аймактын салт-санаалары жана маданияты жөнүндө айтып берет. Бишкекке келүү, мейманканага жайгашуу, жергиликтүү ресторанда кечки тамак жана жолдон кийин эс алуу. Шаар боюнча сейилдөө үчүн эркин убакыттын мүмкүнчүлүгү.",
        },
        {
          day: "7-күн",
          title: "Бишкек боюнча экскурсия жана учуу",
          description:
            "Эртең мененки тамактан кийин — Бишкек шаары боюнча көрүү экскурсиясы: Ала-Тоо аянты, Жеңиш паркы, филармония, жергиликтүү базарлар жана эстелик дүкөндөрү. Гид көрүүгө татыктуу жерлердин маданий жана тарыхый баалуулугу жөнүндө айтып берет. Экскурсиядан кийин аэропортко трансфер жана топ менен коштошуу. Тур аякталат.",
        },
      ],
    },
    bookButton: "Брондоо",
  },
};

export default function TourDetail() {
  const router = useRouter();
  const language = useAppSelector((state) => state.theme.language);
  const [showButton, setShowButton] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  const t =
    translations[language as keyof typeof translations] ||
    translations["ru-RU"];

  const review = 5.49;

  const tour = [
    {
      id: 1,
      title: t.tour.title,
      description: t.tour.description,
      url: tourimg,
    },
  ];

  const tourFeatures = [
    {
      id: 1,
      icon: location,
      label: t.features.startPoint,
      value: t.values.startPoint,
    },
    {
      id: 2,
      icon: durtion,
      label: t.features.duration,
      value: t.values.duration,
    },
    { id: 3, icon: price, label: t.features.cost, value: t.values.cost },
    { id: 4, icon: level, label: t.features.level, value: t.values.level },
    {
      id: 5,
      icon: group,
      label: t.features.groupSize,
      value: t.values.groupSize,
    },
  ];

  const toggle = (index: number) => setActive(active === index ? null : index);

  useEffect(() => {
    const handleScroll = () => setShowButton(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="mt-28 min-h-screen bg-gradient-to-br from-white to-[#ff6600]/20 flex justify-center p-4 md:p-10 relative">
      <div className="container mx-auto">
        <div className="text-sm text-gray-500 mb-6 flex gap-1 flex-wrap">
          <span
            className="cursor-pointer hover:underline"
            onClick={() => router.push("/")}
          >
            {t.breadcrumb.home}
          </span>
          /
          <span
            className="cursor-pointer hover:underline"
            onClick={() => router.push("/tours")}
          >
            {t.breadcrumb.tours}
          </span>
          /<span className="text-black font-semibold">{t.tour.title}</span>
        </div>

        {tour.map((el) => (
          <div
            key={el.id}
            className="flex flex-col lg:flex-row gap-10 items-start"
          >
            <div className="w-full lg:max-w-[600px]">
              <motion.div whileHover={{ scale: 1.03 }}>
                <Image
                  src={el.url}
                  alt={el.title}
                  width={600}
                  height={400}
                  className="rounded-xl shadow-md w-full h-auto object-cover"
                />
              </motion.div>

              <div className="flex gap-3 mt-5">
                {[1, 2, 3].map((_, idx) => (
                  <Image
                    key={idx}
                    src={el.url}
                    alt={el.title}
                    width={180}
                    height={130}
                    className="rounded-lg border shadow-sm cursor-pointer transition-all w-1/3 object-cover"
                  />
                ))}
              </div>
            </div>

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
                  <p className="font-semibold">{t.agent.name}</p>
                  <p className="inline-flex items-center gap-2 bg-[#ff6600] text-white text-sm rounded px-2 py-[2px] my-1">
                    <SlLike className="text-white" size={15} />{" "}
                    {Math.round(review)}/10
                  </p>
                  <p className="text-gray-500 text-sm">{t.agent.address}</p>
                </div>
              </motion.div>
            </div>
          </div>
        ))}

        <div className="flex flex-wrap justify-between mt-10 gap-4">
          {tourFeatures.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{
                y: -3,
                boxShadow: "0px 10px 25px rgba(255,165,0,0.3)",
              }}
              className="flex items-center gap-5 p-3 rounded-xl transition-all bg-white/40 border border-white/10 backdrop-blur-md flex-1 min-w-[200px]"
            >
              <Image src={item.icon} alt="icon" width={45} height={42} />
              <div>
                <p className="text-gray-500 text-sm">{item.label}:</p>
                <p className="font-semibold text-[#ff6600]">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col items-center mt-16 w-full">
          <h1 className="text-[30px] text-center font-bold">
            {t.program.title}
          </h1>
          <div className="max-w-3xl mx-auto mt-8 flex flex-col gap-4 w-full">
            {t.program.days.map((el, index) => (
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
              ? "translateX(-50%)"
              : "translate(-50%, 20px)",
          }}
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 25px rgba(255,165,0,0.5)",
            }}
            className="px-12 py-4 bg-orange-500 text-white rounded-lg text-[15px] hover:bg-orange-600 animate-pulse shadow-lg"
            onClick={() => router.push("/order")}
          >
            {t.bookButton}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
