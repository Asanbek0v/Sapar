"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import bgTour from "@/src/assets/img/bg-tour.svg";
import car1 from "@/src/assets/img/car1.svg";
import car2 from "@/src/assets/img/car2.svg";
import car3 from "@/src/assets/img/car3.svg";
import { useRouter } from "next/navigation";
import PriceRange from "./PriceRange/PriceRange";
import { getTours } from "@/src/services/tours.service";

type Tour = {
  id: number;
  days: string;
  title: string;
  available: boolean;
  route: string;
  price: number;
  img: string;
};

const carsData = [
  { id: 1, name: "Легковой автомобиль", img: car1 },
  { id: 2, name: "Внедорожник", img: car2 },
  { id: 3, name: "Мини автобус", img: car3 },
];

export default function TourPage() {
  const router = useRouter();
  const [groupType, setGroupType] = useState<"group" | "individual">("group");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [tours, setTours] = useState<Tour[]>([]);
  console.log(tours);
  
  useEffect(() => {
    getTours().then(setTours);
  }, []);

  const filteredTours = tours.filter(
    (t) => t.price >= priceRange[0] && t.price <= priceRange[1]
  );

  return (
    <div className="w-full">
      <section
        className="w-full h-[260px] sm:h-80 lg:h-[380px] bg-cover bg-center flex items-center relative"
        style={{ backgroundImage: `url(${bgTour.src})` }}
      >
        <div className="container mx-auto px-4 text-white z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            ТРЕККИНГ
          </h1>
          <p className="text-base sm:text-lg lg:text-xl max-w-xl">
            Собери рюкзак — и отправься за новыми историями
          </p>
        </div>
        <div className="absolute inset-0 bg-black/40"></div>
      </section>

      <div className="container mx-auto px-4 py-10 flex flex-col lg:flex-row gap-6">
        <aside className="w-full lg:w-[260px] bg-white shadow p-5 rounded-xl h-fit">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setGroupType("group")}
              className={`text-left py-2 ${
                groupType === "group" && "font-semibold text-orange-500"
              }`}
            >
              Групповые туры
            </button>

            <button
              onClick={() => setGroupType("individual")}
              className={`text-left py-2 ${
                groupType === "individual" && "font-semibold text-orange-500"
              }`}
            >
              Индивидуальные туры
            </button>

            {groupType === "group" && (
              <>
                <p className="text-sm text-black mt-4">Цена</p>
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

        <main className="flex-1 mt-4">
          {groupType === "group" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTours.map((t) => (
                <div
                  key={t.id}
                  className="bg-white shadow rounded-xl overflow-hidden cursor-pointer"
                  onClick={() => router.push(`/toursData/${t.id}`)}
                >
                  <div className="relative h-44">
                    <Image
                      src={t.img || ""}
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
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {t.route}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <button
                        onClick={() => router.push(`/toursData/${t.id}`)}
                        className="bg-orange-500 text-white px-4 py-1 rounded"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {carsData.map((c) => (
                <div
                  key={c.id}
                  onClick={() => router.push("/cars")}
                  className="text-center cursor-pointer bg-white shadow rounded-xl p-4"
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
