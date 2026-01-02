"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { getTours } from "@/src/services/tours.service";
import { Tour } from "@/src/types/tour.interface";
import { useRouter } from "next/navigation";

const USD_RATE = 87.5;

const categories = [
  { slug: "trekking", title: "Треккинг" },
  { slug: "culture", title: "Культурные туры" },
  { slug: "active", title: "Активные туры" },
  { slug: "alpinism", title: "Альпинизм" },
  { slug: "ski", title: "Лыжные туры" },
];

const ToursByCategory = () => {
  const { category } = useParams<{ category: string }>();
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const data = await getTours();
        setTours(data);
      } catch (e) {
        console.error("Турларды жүктөө катасы", e);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  const filteredTours = useMemo(() => {
    if (!category) return [];
    const catObj = categories.find((c) => c.slug === category);
    if (!catObj) return [];
    return tours.filter((t) => t.category === catObj.title);
  }, [tours, category]);

  if (loading) return <p className="py-10 text-center">Жүктөлүүдө...</p>;

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mt-[100px] capitalize">
        {categories.find((c) => c.slug === category)?.title}
      </h1>

      {filteredTours.length === 0 && (
        <p className="text-gray-500">Бул категорияда тур жок</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredTours.map((tour) => (
          <div key={tour.id} className="rounded-xl">
            <div className="relative h-56">
              <Image
                src={tour.images[0] || "/placeholder.jpg"}
                alt={tour.name}
                fill
                className="object-cover rounded-2xl"
              />
            </div>
            <div className="flex flex-col justify-between h-50">
              <h2 className="font-semibold text-lg mt-2">{tour.name}</h2>
              <h2 className="font-medium text-l text-gray-500">
                {tour.category}
              </h2>
              <p className="font-light text-[15px] text-gray-900">
                {tour.description}
              </p>
              <div className="">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="bg-orange-500 text-white px-4 py-1 rounded-md"
                >
                  Подробнее
                </button>
              <p className="mt-2 text-orange-500 font-bold">
                ${Math.round(tour.price / USD_RATE)}
              </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToursByCategory;
