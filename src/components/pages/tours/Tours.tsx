"use client";
import { useState } from "react";
import Image from "next/image";
import tour1 from "@/src/assets/img/tour1.svg";
import bgTour from "@/src/assets/img/bg-tour.svg";
import car1 from "@/src/assets/img/car1.svg";
import car2 from "@/src/assets/img/car2.svg";
import car3 from "@/src/assets/img/car3.svg";
import { useRouter } from "next/navigation";

export default function TourPage() {
  const router = useRouter()
  const [priceRange, setPriceRange] = useState([1299, 3999]);
  const [dayFilter, setDayFilter] = useState("3-5");
  const [groupType, setGroupType] = useState({
    group: true,
    individual: false,
  });
  const tours = [
    {
      id: 1,
      days: "11 дней, 10 ночей",
      title: "Вкус Тянь-Шаня",
      available: true,
      route: "Бишкек пик Учитель-Ош-Ачык-Таш-Лагерь 1-Пик-Южина-Ачык-Таш-Ош",
      price: 500,
      category: "group",
      img: tour1,
    },
    {
      id: 2,
      days: "11 дней, 10 ночей",
      title: "Вкус Тянь-Шаня",
      available: true,
      route: "Бишкек пик Учитель-Ош-Ачык-Таш-Лагерь 1-Пик-Южина-Ачык-Таш-Ош",
      price: 500,
      category: "group",
      img: tour1,
    },
    {
      id: 3,
      days: "11 дней, 10 ночей",
      title: "Вкус Тянь-Шаня",
      available: true,
      route: "Бишкек пик Учитель-Ош-Ачык-Таш-Лагерь 1-Пик-Южина-Ачык-Таш-Ош",
      price: 500,
      category: "group",
      img: tour1,
    },
  ];

  const cars = [
    {
      id: 1,
      name: "Легковой автомобиль",
      img: car1,
    },
    {
      id: 2,
      name: "Внедорожник",
      img: car2,
    },
    {
      id: 3,
      name: "Мини автобус",
      img: car3,
    },
  ];

  const filteredTours = tours.filter(() => {
    if (groupType.individual) return false;
    return true;
  });

  return (
    <div className="w-full">
      <section
        className="w-full h-[380px] bg-cover bg-center flex items-center relative"
        style={{ backgroundImage: `url(${bgTour.src})` }}
      >
        <div className="container mx-auto px-4 text-white z-10 flex flex-col gap-3">
          <h1 className="text-5xl font-bold">ТРЕККИНГ</h1>
          <p className="text-xl max-w-lg">
            Собери рюкзак — и отправься за новыми историями
          </p>
        </div>
        <div className="bg-[#0000004c] w-full h-full absolute top-0 left-0"></div>
      </section>

      <div className="flex container mx-auto px-4 py-10 gap-6">
        <aside className="w-[260px] bg-white shadow p-5 rounded-xl h-fit">
          <h2 className="text-lg font-semibold mb-3">Фильтрация Туров</h2>

          <p className="text-sm text-gray-600 mb-1">Цена от и до</p>
          <div className="mb-4">
            <input
              type="range"
              min={1299}
              max={3999}
              value={priceRange[0]}
              onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
              className="w-full cursor-pointer"
            />
            <input
              type="range"
              min={1299}
              max={3999}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
              className="w-full cursor-pointer"
            />
            <p className="text-sm mt-1">
              ${priceRange[0]} - ${priceRange[1]}
            </p>
          </div>
          <p className="font-medium mb-2">Туры</p>
          <div className="flex flex-col gap-2 mb-4">
            {["3-5", "7-10", "15-20"].map((d) => (
              <button
                key={d}
                onClick={() => setDayFilter(d)}
                className={`px-3 py-1 rounded-md border text-sm transition ${
                  dayFilter === d
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-gray-200 border-gray-300"
                }`}
              >
                {d} дней
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 mb-3">
            <input
              type="checkbox"
              checked={groupType.group}
              onChange={() =>
                setGroupType({ ...groupType, group: !groupType.group })
              }
            />
            Групповые туры
          </label>

          <label className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              checked={groupType.individual}
              onChange={() =>
                setGroupType({
                  ...groupType,
                  individual: !groupType.individual,
                })
              }
            />
            Индивидуальные туры
          </label>

          <button className="w-full bg-orange-500 text-white py-2 rounded-md font-semibold hover:bg-orange-600">
            Поиск
          </button>
        </aside>

        {/* CONTENT */}
        <main className="flex-1 m-[50px_0]">
          {!groupType.individual && (
            <div className="grid grid-cols-3 gap-6">
              {filteredTours.map((t) => (
                <div
                  key={t.id}
                  className="shadow rounded-xl overflow-hidden bg-white"
                >
                  <div className="relative h-44 w-full">
                    <Image
                      src={t.img}
                      alt={t.title}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-md">
                      {t.days}
                    </span>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-lg">{t.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">Доступно</p>
                    <p className="text-sm text-gray-600 mb-4">
                      Маршрут: {t.route}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <button
                        className="bg-orange-500 text-white px-4 py-1 rounded-lg text-sm hover:bg-orange-600"
                        onClick={() => router.push("/tours/tourDetail")}
                      >
                        Подробнее
                      </button>
                      <span className="font-semibold">от ${t.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {groupType.individual && (
            <div className="grid grid-cols-3 gap-8 pt-10">
              {cars.map((c) => (
                <div key={c.id} className="text-center" onClick={() => router.push("/cars")}>
                  <div className="relative h-40 w-full mb-3 cursor-pointer">
                    <Image
                      src={c.img}
                      alt={c.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="font-medium text-lg">{c.name}</p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
