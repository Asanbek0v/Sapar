"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCars } from "@/src/services/cars.service";
import { Car } from "@/src/types/cars.interface";

const Cars = () => {
  const router = useRouter();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getCars();
        const mappedCars: Car[] = data.map((t) => ({
          id: t.id,
          images: t.images?.[0] || "/placeholder.jpg",
          model: t.model || "Unknown",
          brand: t.brand || "Unknown",
          capacity: t.capacity || 2,
          drive: t.drive || "front",
          places: t.places || 4,
          days: t.days || "3 days",
          year: t.year || 2020,
          price: t.price,
          transmission: t.transmission || "automatic",
          fuelType: t.fuelType || "gasoline",
        }));

        setCars(mappedCars);
      } catch (err) {
        console.error(err);
        setError("Не удалось загрузить машины");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) return <p className="text-center py-10">Загрузка...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <div className="container">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-[120px]">
        {cars.map((t) => (
          <div
            key={t.id}
            className="bg-white shadow rounded-xl overflow-hidden cursor-pointer"
            onClick={() => router.push(`/cars/${t.id}`)}
          >
            <div className="relative h-64">
              <Image src={t.images} alt={t.model} fill className="object-contain" />
              <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                {t.days}
              </span>
            </div>

            <div className="p-4">
              <h3 className="font-bold">{t.brand}</h3>
              <p className="text-sm text-gray-600">Объем двигателя: <span className="text-black">{t.capacity}L</span></p>
              <p className="text-sm text-gray-600">Привод: <span className="text-black">{t.drive}</span></p>
              <p className="text-sm text-gray-600">Мест: <span className="text-black">{t.places}</span></p>
              <p className="text-sm text-gray-600">Год выпуска: <span className="text-black">{t.year}</span></p>
              <h3 className="font-medium text-orange-500"><span className="font-semibold">От {Number(t.price) / 50}$</span> / в сутки</h3>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => router.push(`/cars/${t.id}`)}
                  className="border text-orange-500 border-orange-500 px-2 py-1 rounded"
                >
                  Подробнее
                </button>
                <button
                  onClick={() => router.push(`/cars/${t.id}`)}
                  className="bg-orange-500 text-white px-2 py-1 rounded"
                >
                  Арендовать
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cars;
