import tour1 from "@/src/assets/img/tour1.svg";
import tour2 from "@/src/assets/img/tour2.svg";
import tour3 from "@/src/assets/img/tour3.svg";
import tour4 from "@/src/assets/img/tour4.svg";
import tour5 from "@/src/assets/img/tour5.svg";
import { StaticImageData } from "next/image";

export interface Category {
  slug: string;
  title: string;
  apiCategory: string;
  img: StaticImageData;
}

export const categories: Category[] = [
  {
    slug: "trekking",
    title: "Треккинг",
    apiCategory: "Треккинг",
    img: tour1,
  },
  {
    slug: "culture",
    title: "Культурные туры",
    apiCategory: "Культурные туры",
    img: tour2,
  },
  {
    slug: "active",
    title: "Активные туры",
    apiCategory: "Активные туры",
    img: tour3,
  },
  {
    slug: "alpinism",
    title: "Альпинизм",
    apiCategory: "Альпинизм",
    img: tour4,
  },
  {
    slug: "ski",
    title: "Лыжные туры",
    apiCategory: "Лыжные туры",
    img: tour5,
  },
];
