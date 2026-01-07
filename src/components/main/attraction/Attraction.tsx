"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Carousel from "../../carousel/Carousel";
import { getTopTours } from "../../../services/tours.service";
import { Tour } from "../../../types/tour.interface";

const Attraction = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const router = useRouter();

  useEffect(() => {
    getTopTours().then(setTours).catch(console.error);
  }, []);

  const handleClick = (id: number | string) => {
    router.push(`/tours/${id}`);
  };

  return (
    <section className="my-16">
      <div className="container">
        <h1 className="text-4xl font-bold text-black mb-6">
          Топ-10 достопримечательностей <br />
          <span className="text-orange-500">Кыргызстана</span>
        </h1>

        <Carousel
          items={tours}
          onItemClick={(tour) => handleClick(tour.id)}
        />
      </div>
    </section>
  );
};

export default Attraction;
