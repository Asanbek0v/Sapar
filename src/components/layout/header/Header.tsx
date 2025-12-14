"use client";
import { FC, useState } from "react";
import Headerlogo from "@/src/assets/header.jpg";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const Header: FC = () => {
  const [fav, setFav] = useState(false);

  return (
    <header className="py-4 bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <Image
          src={Headerlogo}
          alt="sapar.kg"
          width={55}
          className="rounded-md"
        />

        <nav className="flex items-center gap-8 text-[17px] font-medium">
          <Link href="/tours" className="hover:text-orange-500 transition">
            Туры
          </Link>

          <Link href="/company" className="hover:text-orange-500 transition">
            Компании
          </Link>

          <Link
            href="/carDetail"
            className="hover:text-orange-500 transition"
          >
            CarDetails
          </Link>

          <Link
            href="/cooporation"
            className="hover:text-orange-500 border-b border-orange-500 pb-1 transition"
          >
            О сотрудничество
          </Link>

          <Link href="/about" className="hover:text-orange-500 transition">
            О нас
          </Link>

          <Link href="/contacts" className="hover:text-orange-500 transition">
            Контакты
          </Link>
        </nav>

        <div className="flex items-center gap-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Куда вы хотите?"
              className="py-2 pl-4 pr-9 rounded-lg border border-orange-300 text-[14px] outline-none transition focus:border-orange-500"
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="16" y1="16" x2="22" y2="22" />
            </svg>
          </div>
        

          {/* Language */}
          <select className="focus:outline-none">
            <option value="ru">Russia</option>
            <option value="en">English</option>
          </select>
          <motion.div
            whileTap={{ scale: 0.8 }}
            onClick={() => setFav(!fav)}
            className="cursor-pointer"
          >
            {fav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="orange"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="orange"
                className="w-7 h-7"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 
                  5.42 4.42 3 7.5 3c1.74 0 3.41 1.01 
                  4.5 2.09C13.09 4.01 14.76 3 
                  16.5 3 19.58 3 22 5.42 22 8.5c0 
                  3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="gray"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.5c0 3.78-3.4 6.86-8.55 
                  11.54L12 21.35l-0.45-1.32C5.4 15.36 
                  2 12.28 2 8.5 2 5.42 4.42 3 
                  7.5 3c1.74 0 3.41 1.01 
                  4.5 2.09C13.09 4.01 14.76 3 
                  16.5 3 19.58 3 22 5.42 22 
                  8.5z"
                />
              </svg>
            )}
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header;
