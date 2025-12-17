"use client";
import { useState } from "react";
import Image from "next/image";
import tour1 from "@/src/assets/img/tour1.svg";
import bgTour from "@/src/assets/img/bg-tour.svg";
import car1 from "@/src/assets/img/car1.svg";
import car2 from "@/src/assets/img/car2.svg";
import car3 from "@/src/assets/img/car3.svg";
import { useRouter } from "next/navigation";
import PriceRange from "./PriceRange/PriceRange";

const tours = [
  {
    id: 1,
    days: "11 дней, 10 ночей",
    title: "Вкус Тянь-Шаня",
    available: true,
    route: "Бишкек пик Учитель-Ош-Ачык-Таш-Лагерь 1-Пик-Южина-Ачык-Таш-Ош",
    price: 500,
    img: tour1,
  },
  {
    id: 2,
    days: "11 дней, 10 ночей",
    title: "Вкус Тянь-Шаня",
    available: true,
    route: "Бишкек пик Учитель-Ош-Ачык-Таш-Лагерь 1-Пик-Южина-Ачык-Таш-Ош",
    price: 500,
    img: tour1,
  },
];

const cars = [
  { id: 1, name: "Легковой автомобиль", img: car1 },
  { id: 2, name: "Внедорожник", img: car2 },
  { id: 3, name: "Мини автобус", img: car3 },
];

export default function TourPage() {
  const router = useRouter();
  const [groupType, setGroupType] = useState("group");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const filteredTours = tours.filter(
    (t) =>
      groupType === "group" &&
      t.price >= priceRange[0] &&
      t.price <= priceRange[1]
  );

  return (
    <div className="w-full">
      <section
        className="w-full h-[380px] bg-cover bg-center flex items-center relative"
        style={{ backgroundImage: `url(${bgTour.src})` }}
      >
        <div className="container mx-auto px-4 text-white z-10">
          <h1 className="text-5xl font-bold">ТРЕККИНГ</h1>
          <p className="text-xl">
            Собери рюкзак — и отправься за новыми историями
          </p>
        </div>
        <div className="absolute inset-0 bg-black/40"></div>
      </section>
      <div className="container mx-auto px-4 py-10 flex gap-6">
        <aside className="w-[260px] bg-white shadow p-5 rounded-xl h-fit1">
          <div className="flex flex-col">
            <a
              onClick={() => setGroupType("group")}
              className={`py-2 rounded-md ${
                groupType === "group" && "text-[#646464]"
              }`}
            >
              Групповые туры
            </a>
            <a
              onClick={() => setGroupType("individual")}
              className={`py-2 rounded-md ${
                groupType === "individual" && "text-[#646464]"
              }`}
            >
              Индивидуальные туры
            </a>
            {groupType === "group" && (
              <>
                <p className="text-sm text-black m-[10px_0_10px_0]">Цена</p>
                <PriceRange
                  min={0}
                  max={5000}
                  step={50}
                  value={priceRange}
                  onChange={(val: [number, number]) => setPriceRange(val)}
                />
              </>
            )}
          </div>
        </aside>
        <main className="flex-1 mt-5">
          {groupType === "group" && (
            <div className="grid grid-cols-3 gap-6">
              {filteredTours.map((t) => (
                <div
                  key={t.id}
                  className="bg-white shadow rounded-xl overflow-hidden cursor-pointer"
                  onClick={() => router.push("/tours/tourDetail")}
                >
                  <div className="relative h-44">
                    <Image
                      src={t.img}
                      alt={t.title}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                      {t.days}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold">{t.title}</h3>
                    <p className="text-sm text-gray-600">{t.route}</p>
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={() => router.push("/tours/tourDetail")}
                        className="bg-orange-500 text-white px-4 py-1 rounded cursor-pointer"
                      >
                        Подробнее
                      </button>
                      <span className="font-semibold">${t.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {groupType === "individual" && (
            <div className="grid grid-cols-3 gap-8">
              {cars.map((c) => (
                <div
                  key={c.id}
                  onClick={() => router.push("/cars")}
                  className="text-center cursor-pointer"
                >
                  <div className="relative h-40 mb-3">
                    <Image
                      src={c.img}
                      alt={c.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="font-medium">{c.name}</p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
