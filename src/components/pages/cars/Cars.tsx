"use client";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import car1 from "@/src/assets/car1.png";
import car2 from "@/src/assets/car2.png";
import car3 from "@/src/assets/car3.png";
import car4 from "@/src/assets/car4.png";

type Car = {
  id: number;
  img: StaticImageData;
  title: string;
  capacity: number;
  drive: string;
  places: number;
  days: string;
  year: number;
  price: number;
};

const cars: Car[] = [
  {
    id: 1,
    img: car1,
    title: "Sedan Deluxe",
    capacity: 2.5,
    drive: "front",
    places: 4,
    year: 2020,
    days: "3 days",
    price: 120,
  },
  {
    id: 2,
    img: car2,
    title: "SUV Adventure",
    capacity: 2.0,
    drive: "front",
    places: 4,
    year: 2020,
    days: "5 days",
    price: 200,
  },
  {
    id: 3,
    img: car3,
    title: "Compact Eco",
    capacity: 2.3,
    drive: "front",
    places: 4,
    year: 2020,
    days: "2 days",
    price: 80,
  },
  {
    id: 4,
    img: car4,
    title: "Sedan Deluxe",
    capacity: 2.0,
    drive: "front",
    places: 4,
    year: 2020,
    days: "3 days",
    price: 120,
  },
];

const Cars = () => {
  const router = useRouter();

  return (
    <div className="container">
      <div className="grid grid-cols-4 gap-6 mt-[120px]">
        {cars.map((t) => (
          <div
            key={t.id}
            className="bg-white shadow rounded-xl overflow-hidden"
          >
            <div className="relative h-74">
              <Image src={t.img} alt={t.title} fill className="object-cover" />
              <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                {t.days}
              </span>
            </div>

            <div className="p-4">
              <h3 className="font-bold">{t.title}</h3>
              <p className="text-sm text-gray-600">Capacity: {t.capacity}L</p>
              <p className="text-sm text-gray-600">Drive: {t.drive}</p>
              <p className="text-sm text-gray-600">Places: {t.places}</p>
              <p className="text-sm text-gray-600">{t.year}</p>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => router.push(`/cars/${t.id}`)}
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
    </div>
  );
};

export default Cars;
