"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { categories } from "@/src/data/Categories";

const Tours = () => {
  const router = useRouter();

  return (
    <section className="my-22">
      <div className="container">
        <h1 className="text-4xl font-bold">
          Выберите свой <br />
          <span className="text-orange-500">тур</span>
        </h1>

        <div className="grid gap-4 mt-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <div
              key={c.slug}
              onClick={() => router.push(`/tours/category/${c.slug}`)}
              className="relative h-60 rounded-2xl overflow-hidden cursor-pointer group"
            >
              <div className="absolute inset-0 bg-black/40 z-10" />
              <Image
                src={c.img}
                alt={c.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform"
              />
              <h2 className="absolute bottom-4 left-6 z-20 text-white text-xl font-bold">
                {c.title}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tours;
