"use client";
import { FC } from "react";
import Headerlogo from "@/src/assets/header.jpg";
import Image from "next/image";
import Link from "next/link";

const Header: FC = () => {
  return (
    <header className="py-4 bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Image
          src={Headerlogo}
          alt="sapar.kg"
          width={55}
          className="rounded-md"
        />

        {/* Navigation */}
        <nav className="flex items-center gap-8 text-[17px] font-medium">
          <Link href="/tours" className="hover:text-orange-500 transition">
            Туры
          </Link>

          <Link href="/company" className="hover:text-orange-500 transition">
            Компании
          </Link>

          <Link
            href="/cooperation"
            className="hover:text-orange-500  border-orange-500 pb-1"
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

        {/* Right Controls */}
        <div className="flex items-center gap-6">
          {/* Search */}
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
            >
              <path d="m21 21-4.34-4.34" />
              <circle cx="11" cy="11" r="8" />
            </svg>
          </div>

          {/* Language */}
          <div className="flex items-center gap-1 cursor-pointer">
            <span className="text-[15px]">Ru</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 mt-[1px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>

          {/* Login Button */}
          <button className="px-6 py-2 bg-orange-500 text-white rounded-lg text-[15px] hover:bg-orange-600 transition">
            Войти
          </button>

          {/* Dark Mode Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 cursor-pointer"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          >
            <path d="M12 3a9 9 0 1 0 9 9c0-.34-.02-.68-.06-1.01A7 7 0 0 1 12 3Z" />
          </svg>
        </div>
      </div>
    </header>
  );
};

export default Header;
