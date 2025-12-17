"use client";
import tour1 from "@/src/assets/img/tour1.svg";
import tour2 from "@/src/assets/img/tour2.svg";
import tour3 from "@/src/assets/img/tour3.svg";
import tour4 from "@/src/assets/img/tour4.svg";
import tour5 from "@/src/assets/img/tour5.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Tours = () => {
  const router = useRouter();
  return (
    <section className="tours m-[50px_0]">
      <div className="container">
        <h1 className="text-4xl font-bold text-[black]">
          Выберите свой <br />{" "}
          <span className="text-4xl font-bold text-orange-500">тур</span>
        </h1>
        <div className="flex relative gap-3 mt-[30px]">
          <div
            onClick={() => router.push("/tours")}
            className="relative w-[760px] h-[500px] overflow-hidden rounded-4xl cursor-pointer group"
          >
            <div className="absolute inset-0 bg-black/40 z-10" />

            <Image
              src={tour1}
              alt="Треккинг"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />

            <h1 className="absolute bottom-6 left-30 z-20 text-xl text-white font-bold">
              Треккинг
            </h1>
          </div>

          <div className="flex flex-wrap gap-[15px]">
            <div
              onClick={() => router.push("/tours")}
              className="relative w-[395px] h-60 overflow-hidden rounded-4xl cursor-pointer group"
            >
              <div className="absolute inset-0 bg-black/40 z-10" />

              <Image
                src={tour2}
                alt="Культурные туры"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              <h1 className="absolute bottom-4 left-25 z-20 text-xl text-white font-bold">
                Культурные туры
              </h1>
            </div>

            <div
              onClick={() => router.push("/tours")}
              className="relative w-[395px] h-60 overflow-hidden rounded-4xl cursor-pointer group"
            >
              <div className="absolute inset-0 bg-black/40 z-10" />

              <Image
                src={tour3}
                alt="Активные туры"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              <h1 className="absolute bottom-4 left-25 z-20 text-xl text-white font-bold">
                Активные туры
              </h1>
            </div>

            <div
              onClick={() => router.push("/tours")}
              className="relative w-[395px] h-60 overflow-hidden rounded-4xl cursor-pointer group"
            >
              <div className="absolute inset-0 bg-black/40 z-10" />

              <Image
                src={tour4}
                alt="Альпинизм"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              <h1 className="absolute bottom-4 left-30 z-20 text-xl text-white font-bold">
                Альпинизм
              </h1>
            </div>

            <div
              onClick={() => router.push("/tours")}
              className="relative w-[395px] h-60 overflow-hidden rounded-4xl cursor-pointer group"
            >
              <div className="absolute inset-0 bg-black/40 z-10" />

              <Image
                src={tour5}
                alt="Лыжные туры"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              <h1 className="absolute bottom-4 left-25 z-20 text-xl text-white font-bold">
                Лыжные туры
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tours;
