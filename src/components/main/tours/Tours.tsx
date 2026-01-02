"use client";
import tour1 from "@/src/assets/img/tour1.svg";
import tour2 from "@/src/assets/img/tour2.svg";
import tour3 from "@/src/assets/img/tour3.svg";
import tour4 from "@/src/assets/img/tour4.svg";
import tour5 from "@/src/assets/img/tour5.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

const categories = [
  { slug: "trekking", title: "Треккинг", img: tour1 },
  { slug: "culture", title: "Культурные туры", img: tour2 },
  { slug: "active", title: "Активные туры", img: tour3 },
  { slug: "alpinism", title: "Альпинизм", img: tour4 },
  { slug: "ski", title: "Лыжные туры", img: tour5 },
];

const Tours = () => {
  const router = useRouter();

  return (
    <section className="tours m-[50px_0]">
      <div className="container">
        <h1 className="text-4xl font-bold text-black">
          Выберите свой <br />
          <span className="text-orange-500">тур</span>
        </h1>
        <div className="flex flex-wrap gap-4 mt-6">
          {categories.map((c) => (
            <div
              key={c.slug}
              onClick={() => router.push(`/tours/${c.slug}`)}
              className="relative w-[395px] h-60 overflow-hidden rounded-2xl cursor-pointer group"
            >
              <div className="absolute inset-0 bg-black/40 z-10" />
              <Image
                src={c.img}
                alt={c.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <h1 className="absolute bottom-4 left-6 z-20 text-xl text-white font-bold">
                {c.title}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tours;
