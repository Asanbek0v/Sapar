"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import Image from "next/image";
import bgTour from "@/src/assets/img/bg-tour.svg";
import car1 from "@/src/assets/img/car1.svg";
import car2 from "@/src/assets/img/car2.svg";
import car3 from "@/src/assets/img/car3.svg";
import PriceRange from "./PriceRange/PriceRange";
import { getTours } from "@/src/services/tours.service";
import { Tour } from "@/src/types/tour.interface";

type GroupType = "group" | "individual";

const USD_RATE = 87.5;

type CarCard = {
  id: number;
  name: string;
  img: string;
  available: boolean;
  route: string;
  price: number;
  images: string[];
};

const carsData: CarCard[] = [
  { id: 1, name: "Легковой автомобиль", img: car1.src },
  { id: 2, name: "Внедорожник", img: car2.src },
  { id: 3, name: "Мини автобус", img: car3.src },
];

export default function TourPage() {
  const router = useRouter();
  const [groupType, setGroupType] = useState<GroupType>("group");
  const [tours, setTours] = useState<Tour[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const data = await getTours();
        setTours(data);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);
console.log();

  const toursWithUsdPrice = useMemo(() => {
    return tours.map((t) => ({
      ...t,
      priceUsd: t.price / USD_RATE,
    }));
  }, [tours]);

  const prices = useMemo(() => {
    if (!toursWithUsdPrice.length) return { min: 0, max: 0 };
    const values = toursWithUsdPrice.map((t) => t.priceUsd);
    return {
      min: Math.floor(Math.min(...values)),
      max: Math.ceil(Math.max(...values)),
    };
  }, [toursWithUsdPrice]);
  const filteredTours = tours?.filter(
    (t) => t.price >= priceRange[0] && t.price <= priceRange[1]
  );
  return (
    <div className="w-full">
      <section
        className="w-full h-[260px] sm:h-80 lg:h-[380px] bg-cover bg-center flex items-center relative"
        style={{ backgroundImage: `url(${bgTour.src})` }}
      >
        <div className="container mx-auto px-4 text-white z-10 relative">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            ТРЕККИНГ
          </h1>
          <p className="text-base sm:text-lg lg:text-xl max-w-xl">
            Собери рюкзак — и отправься за новыми историями
          </p>
        </div>
        <div className="absolute inset-0 bg-black/40"></div>
      </section>

  useEffect(() => {
    if (prices.max > 0) setPriceRange([prices.min, prices.max]);
  }, [prices]);

  const filteredTours = useMemo(() => {
    return toursWithUsdPrice.filter(
      (t) => t.priceUsd >= priceRange[0] && t.priceUsd <= priceRange[1]
    );
  }, [toursWithUsdPrice, priceRange]);

  if (loading) return <p className="text-center py-10">Загрузка...</p>;

  return (
    <div className="w-full mt-[100px]">
      <div className="container mx-auto px-4 py-10 flex flex-col lg:flex-row gap-6">
        <aside className="w-full lg:w-[260px] bg-white shadow p-5 rounded-xl h-fitfixed">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setGroupType("group")}
              className={`text-left py-2 ${
                groupType === "group" ? "font-semibold text-orange-500" : ""
              }`}
            >
              Групповые туры
            </button>
            <button
              onClick={() => setGroupType("individual")}
              className={`text-left py-2 ${
                groupType === "individual"
                  ? "font-semibold text-orange-500"
                  : ""
              }`}
            >
              Индивидуальные туры
            </button>

            {groupType === "group" && prices.max > 0 && (
              <>
                <p className="text-sm mt-4">
                  Цена: ${priceRange[0].toFixed(0)} – $
                  {priceRange[1].toFixed(0)}
                </p>
                <PriceRange
                  min={prices.min}
                  max={prices.max}
                  step={10}
                  value={priceRange}
                  onChange={setPriceRange}
                />
              </>
            )}
          </div>
        </aside>

        <main className="flex-1 mt-4">
          {groupType === "group" && (
            <>
              {filteredTours.length === 0 ? (
                <p className="text-center text-gray-500">
                  Туры по выбранной цене не найдены
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTours.map((t) => (
                    <div
                      key={t.id}
                      className="rounded-xl overflow-hidden cursor-pointer"
                      onClick={() => router.push(`/toursData/${t.id}`)}
                    >
                      <div className="relative h-44">
                        <Image
                          src={t.images?.[0] || "/placeholder.jpg"}
                          alt={t.name}
                          fill
                          className="object-cover"
                        />
                        <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                          {t.duration} дней {t.duration - 1} ночей
                        </span>
                      </div>

                      <div className="flex flex-col justify-between h-50">
                        <h3 className="font-bold text-[18px] mt-2">{t.name}</h3>
                        <p className="text-[15px] text-gray-600">
                          {t.category}
                        </p>
                        <p className="text-[16px] text-gray-900 line-clamp-2">
                          {t.description}
                        </p>
                        <div className="flex justify-between items-center mt-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/toursData/${t.id}`);
                            }}
                            className="bg-orange-500 text-white px-4 py-1 rounded-md"
                          >
                            Подробнее
                          </button>
                          <span className="font-semibold text-orange-500">
                            ${t.priceUsd.toFixed(0)}
                          </span>
                        </div>
                      </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTours?.map((t) => (
                <div
                  key={t.id}
                  className="bg-white shadow rounded-xl overflow-hidden cursor-pointer"
                  onClick={() => router.push(`/tours/${t.id}`)}
                >
                  <div className="relative h-44">
                    <img
                      src={t.images?.[0] || "/placeholder.jpg"}
                      alt={t.name}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded z-10">
                      {t.days}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold">{t.name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {t.route}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/tours/${t.id}`);
                        }}
                        className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600 transition"
                      >
                        Подробнее
                      </button>
                      <span className="font-semibold">${t.price}</span>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {groupType === "individual" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {carsData.map((c) => (
                <div
                  key={c.id}
                  onClick={() => router.push("/cars")}
                  className="text-center cursor-pointer bg-white shadow rounded-xl p-4 hover:shadow-lg transition"
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
