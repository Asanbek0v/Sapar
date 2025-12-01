"use client";
import { FC } from "react";
import Headerlogo from "@/src/assets/header.jpg";
import Image from "next/image";
import Link from "next/link";

const Header: FC = () => {
  return (
    <section id="header" className="py-5 ">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Image src={Headerlogo} alt="sapar.kg" width={50} />

          <div className="flex items-center gap-6">
            <Link href="/Туры" className="hover:text-orange-500">
              Туры
            </Link>
            <Link href="/сотрудничество" className="hover:text-orange-500">
              О сотрудничество
            </Link>
            <Link href="/Контакты" className="hover:text-orange-500">
              Контакты
            </Link>
            <Link href="/Контакты" className="hover:text-orange-500">
              Контакты
            </Link>
          </div>

          <div className="flex items-center gap-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="py-1 px-8 rounded-lg border border-black/40 outline-none hover:border-orange-500 transition"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-1 top-1/2 -translate-y-1/2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m21 21-4.34-4.34" />
                <circle cx="11" cy="11" r="8" />
              </svg>
            </div>

            <select className="border border-black/40 rounded-lg px-2 py-1">
              <option>Language</option>
              <option>Russian</option>
              <option>English</option>
            </select>

            <button className="px-6 py-2 bg-orange-500 text-white rounded-lg transition hover:bg-transparent hover:border hover:border-orange-500 hover:text-black">
              Консультация
            </button>

            <button className="px-6 py-2 bg-orange-500 text-white rounded-lg transition hover:bg-transparent hover:border hover:border-orange-500 hover:text-black">
              Войти
            </button>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
