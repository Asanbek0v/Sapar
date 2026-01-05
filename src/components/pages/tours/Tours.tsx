"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import PriceRange from "./PriceRange/PriceRange";
import { getTours } from "@/src/services/tours.service";
import { getCars } from "@/src/services/cars.service";
import { Tour } from "@/src/types/tour.interface";
import { Car } from "@/src/types/cars.interface";

import passengerImg from "@/src/assets/img/passenger.png";
import suvImg from "@/src/assets/img/suv.png";
import minibusImg from "@/src/assets/img/minibus.svg";

type GroupType = "group" | "individual";

const carCategories = [
  { id: "passenger", name: "Легковой автомобиль", img: passengerImg },
  { id: "suv", name: "Внедорожник", img: suvImg },
  { id: "minibus", name: "Мини автобус", img: minibusImg },
];

interface TourPageProps {
  categoryTitle: string;
}

export default function TourPage({ categoryTitle }: TourPageProps) {
  const router = useRouter();
  const [groupType, setGroupType] = useState<GroupType>("group");

  const [tours, setTours] = useState<Tour[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [loadingTours, setLoadingTours] = useState(true);

  const [cars, setCars] = useState<Car[]>([]);
  const [loadingCars, setLoadingCars] = useState(true);
  const [selectedCarCategory, setSelectedCarCategory] = useState<string>("passenger");

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const data = await getTours();
        const filteredByCategory = data.filter((t) => t.category === categoryTitle);
        setTours(filteredByCategory);
      } finally {
        setLoadingTours(false);
      }
    };
    fetchTours();
  }, [categoryTitle]);

  const USD_RATE = 87.5;
  const toursWithUsdPrice = useMemo(() => {
    return tours.map((t) => ({ ...t, priceUsd: t.price / USD_RATE }));
  }, [tours]);

  const prices = useMemo(() => {
    if (!toursWithUsdPrice.length) return { min: 0, max: 0 };
    const values = toursWithUsdPrice.map((t) => t.priceUsd);
    return { min: Math.floor(Math.min(...values)), max: Math.ceil(Math.max(...values)) };
  }, [toursWithUsdPrice]);

  useEffect(() => {
    if (prices.max > 0) setPriceRange([prices.min, prices.max]);
  }, [prices]);

  const filteredTours = useMemo(() => {
    return toursWithUsdPrice.filter(
      (t) => t.priceUsd >= priceRange[0] && t.priceUsd <= priceRange[1]
    );
  }, [toursWithUsdPrice, priceRange]);

  useEffect(() => {
    const fetchCarsData = async () => {
      try {
        const data = await getCars();
        setCars(data);
      } finally {
        setLoadingCars(false);
      }
    };
    fetchCarsData();
  }, []);

  const filteredCars = useMemo(() => {
    return cars.filter((c) => c.category === selectedCarCategory);
  }, [cars, selectedCarCategory]);

    console.log(filteredCars)

  if (loadingTours || loadingCars) return <p className="text-center py-10">Загрузка...</p>;

  return (
    <div className="container mx-auto px-4 py-10 flex flex-col lg:flex-row gap-6">
      <aside className="w-full lg:w-[260px] bg-white shadow p-5 rounded-xl h-fit">
        <button
          onClick={() => setGroupType("group")}
          className={`block w-full text-left py-2 ${
            groupType === "group" ? "text-orange-500 font-semibold" : ""
          }`}
        >
          Групповые туры
        </button>

        <button
          onClick={() => setGroupType("individual")}
          className={`block w-full text-left py-2 ${
            groupType === "individual" ? "text-orange-500 font-semibold" : ""
          }`}
        >
          Индивидуальные туры
        </button>

        {groupType === "group" && prices.max > 0 && (
          <>
            <p className="text-sm mt-4">
              Цена: ${priceRange[0]} – ${priceRange[1]}
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

        {groupType === "individual" && (
          <div className="mt-4">
            <p className="font-medium mb-2">Выберите категорию машины</p>
            <div className="flex gap-2">
              {carCategories.map((cat) => (
                <div
                  key={cat.id}
                  className={`p-2 border rounded cursor-pointer ${
                    selectedCarCategory === cat.id ? "border-orange-500" : "border-gray-300"
                  }`}
                  onClick={() => setSelectedCarCategory(cat.id)}
                >
                  <Image src={cat.img} alt={cat.name} width={100} height={100} />
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      <main className="flex-1 mt-3">
        {groupType === "group" && (
          <>
            {filteredTours.length === 0 ? (
              <p className="text-center text-gray-500">Туры не найдены</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTours.map((t) => (
                  <div
                    key={t.id}
                    className="overflow-hidden cursor-pointer"
                    onClick={() => router.push(`/toursData/${t.id}`)}
                  >
                    <div className="relative h-44">
                      <Image
                        src={t.images?.[0] || "/placeholder.jpg"}
                        alt={t.name}
                        fill
                        className="object-cover rounded-2xl"
                      />
                    </div>

                    <div className="pt-2 flex flex-col justify-between h-32">
                      <h3 className="font-bold">{t.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{t.description}</p>

                      <div className="flex justify-between items-center mt-4">
                        <button className="bg-orange-500 text-white px-4 py-1 rounded">
                          Подробнее
                        </button>
                        <span className="font-semibold text-orange-500">
                          ${t.priceUsd.toFixed(0)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {groupType === "individual" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {filteredCars.length === 0 ? (
              <p className="text-center text-gray-500">Машины не найдены</p>
            ) : (
              filteredCars.map((c) => (
                <div
                  key={c.id}
                  className="bg-white shadow rounded-xl p-4 text-center cursor-pointer"
                  onClick={() => router.push(`/cars/${c.id}`)}
                >
                  <div className="relative h-40 mb-3">
                    <Image src={c.images[0] || '/placeholder.svg'} alt={c.model} fill className="object-contain" />
                  </div>
                  <p className="font-medium">{c.brand} {c.model}</p>
                  <p className="text-sm text-gray-600">Мест: {c.places}</p>
                  <p className="text-sm text-gray-600">Год выпуска: {c.year}</p>
                  <h3 className="font-medium text-orange-500">От {Number(c.price) / 50}$ / сутки</h3>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}
