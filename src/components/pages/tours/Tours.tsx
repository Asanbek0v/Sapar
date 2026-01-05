"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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

const carsData = [
  { id: 1, name: "Легковой автомобиль", img: car1.src },
  { id: 2, name: "Внедорожник", img: car2.src },
  { id: 3, name: "Мини автобус", img: car3.src },
];

export default function TourPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [groupType, setGroupType] = useState<GroupType>("group");
  const [tours, setTours] = useState<Tour[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        // URL'ден параметрди текшерүү - /tours?all=true болсо бардыгын көрсөт
        const showAll = searchParams?.get("all") === "true";

        if (showAll) {
          // Header'ден келсе localStorage'ди тазалап, бардыгын көрсөт
          localStorage.removeItem("searchResults");
          localStorage.removeItem("searchParams");
          const data = await getTours();
          console.log("Header'ден: Бардык турлар көрсөтүлүүдө:", data.length);
          setTours(data);
        } else {
          // localStorage'ден издөө натыйжаларын текшерүү
          const searchResults = localStorage.getItem("searchResults");

          if (searchResults) {
            // Эгерде издөө натыйжалары бар болсо, аларды колдонуу
            const filteredTours = JSON.parse(searchResults);
            console.log("localStorage'ден турлар:", filteredTours.length);
            setTours(filteredTours);
          } else {
            // Эгерде издөө натыйжалары жок болсо, бардык турларды алуу
            const data = await getTours();
            console.log("API'ден бардык турлар:", data.length);
            setTours(data);
          }
        }
      } catch (error) {
        console.error("Турларды жүктөөдө ката:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [searchParams]);

  const toursWithUsdPrice = useMemo(
    () =>
      tours.map((t) => ({
        ...t,
        priceUsd: t.price / USD_RATE,
      })),
    [tours]
  );

  const prices = useMemo(() => {
    if (!toursWithUsdPrice.length) return { min: 0, max: 0 };
    const values = toursWithUsdPrice.map((t) => t.priceUsd);
    return {
      min: Math.floor(Math.min(...values)),
      max: Math.ceil(Math.max(...values)),
    };
  }, [toursWithUsdPrice]);

  useEffect(() => {
    if (prices.max > 0) {
      setPriceRange([prices.min, prices.max]);
    }
  }, [prices]);

  const filteredTours = useMemo(
    () =>
      toursWithUsdPrice.filter(
        (t) => t.priceUsd >= priceRange[0] && t.priceUsd <= priceRange[1]
      ),
    [toursWithUsdPrice, priceRange]
  );

  if (loading) {
    return <p className="text-center py-10">Загрузка...</p>;
  }

  if (tours.length === 0) {
    return (
      <div className="container mx-auto px-4 py-10 text-center">
        <p className="text-xl">Турлар табылган жок</p>
      </div>
    );
  }

  return (
    <div className="w-full mt-[100px]">
      {/* HEADER */}
      <section
        className="w-full h-[260px] bg-cover bg-center flex items-center relative"
        style={{ backgroundImage: `url(${bgTour.src})` }}
      >
        <div className="container mx-auto px-4 text-white z-10">
          <h1 className="text-4xl font-bold">ТРЕККИНГ</h1>
          <p>Собери рюкзак — и отправься за новыми историями</p>
        </div>
        <div className="absolute inset-0 bg-black/40" />
      </section>

      <div className="container mx-auto px-4 py-10 flex gap-6">
        {/* SIDEBAR */}
        <aside className="w-[260px] bg-white shadow p-5 rounded-xl h-fit">
          <button
            onClick={() => setGroupType("group")}
            className={`block mb-2 ${
              groupType === "group" && "text-orange-500 font-semibold"
            }`}
          >
            Групповые туры
          </button>

          <button
            onClick={() => setGroupType("individual")}
            className={`block ${
              groupType === "individual" && "text-orange-500 font-semibold"
            }`}
          >
            Индивидуальные туры
          </button>

          {groupType === "group" && prices.max > 0 && (
            <>
              <p className="mt-4">
                Цена: ${priceRange[0]} – ${priceRange[1]}
              </p>
              <PriceRange
                min={prices.min}
                max={prices.max}
                value={priceRange}
                onChange={setPriceRange}
              />
            </>
          )}
        </aside>

        <main className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
          {groupType === "group" &&
            filteredTours.map((t) => (
              <div
                key={t.id}
                onClick={() => router.push(`/tours/${t.id}`)}
                className="bg-white shadow rounded-xl overflow-hidden cursor-pointer"
              >
                <div className="relative h-44">
                  <Image
                    src={t.images?.[0] || "/placeholder.jpg"}
                    alt={t.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold">{t.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {t.description}
                  </p>
                  <div className="flex justify-between mt-4">
                    <span className="font-semibold text-orange-500">
                      ${t.priceUsd.toFixed(0)}
                    </span>
                    <button
                      className="bg-orange-500 text-white px-3 py-1 rounded"
                      onClick={() => router.push(`/tours/${t.id}`)}
                    >
                      Подробнее
                    </button>
                  </div>
                </div>
              </div>
            ))}

          {groupType === "individual" &&
            carsData.map((c) => (
              <div
                key={c.id}
                onClick={() => router.push("/cars")}
                className="bg-white shadow rounded-xl p-4 text-center cursor-pointer"
              >
                <Image src={c.img} alt={c.name} width={160} height={120} />
                <p className="mt-2">{c.name}</p>
              </div>
            ))}
        </main>
      </div>
    </div>
  );
}
