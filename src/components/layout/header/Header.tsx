"use client";
import { FC, useState } from "react";
import Headerlogo from "@/src/assets/header.jpg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

const Header: FC = () => {
  const router = useRouter();
  const [fav, setFav] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <header className="fixed top-8 left-0 w-full z-99">
      <div className="container">
        <div
          className="mx-auto flex items-center justify-between py-2 
                bg-white/100 backdrop-blur-sm 
                rounded-[35px] shadow-lg"
        >
          <Image
            src={Headerlogo}
            alt="sapar.kg"
            width={55}
            className="rounded-md cursor-pointer ml-10"
            onClick={() => router.push("/")}
          />
          <nav className="flex items-center gap-8 text-[17px] font-medium text-black">
            <Link href="/tours" className="hover:text-orange-500 transition">
              Туры
            </Link>
            <Link
              href="/companies"
              className="hover:text-orange-500 transition"
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
              Компании
            </Link>
            <Link
              href="/cooporation"
              className="hover:text-orange-500 transition"
            >
              О сотрудничество
            </Link>
            <Link href="/about" className="hover:text-orange-500 transition">
              О нас
            </Link>
            <Link href="#footer" className="hover:text-orange-500 transition">
              Контакты
            </Link>
          </nav>

          <div className="flex items-center gap-6 text-white mr-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Куда вы хотите?"
                className="py-2 pl-4 pr-9 rounded-lg border border-orange-300 text-[14px] outline-none transition focus:border-orange-500 bg-white text-black"
              />
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
                className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m21 21-4.34-4.34" />
                <circle cx="11" cy="11" r="8" />
              </svg>
            </div>
            <select className="focus:outline-none bg-white text-black rounded-lg px-2 py-1 text-[13px]">
              <option value="ru">RU</option>
              <option value="en">EN</option>
            </select>
            <button className="px-5 py-1.5 bg-orange-500/100 text-white rounded-lg text-[15px] hover:bg-orange-600 transition">
              Войти
            </button>
            <motion.svg
              onClick={() => {
                router.push("/favorite");
                setFav(!fav);
              }}
              initial={false}
              animate={{
                scale: fav ? [1, 1.5, 1.2, 1] : 1,
                fill: fav ? "#ff4040" : "none",
                filter: fav
                  ? "drop-shadow(0px 0px 10px rgba(255, 70, 70, 0.6))"
                  : "drop-shadow(0px 0px 0px rgba(0,0,0,0))",
              }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7 cursor-pointer stroke-orange-500 hover:scale-110 transition"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                 2 5.42 4.42 3 7.5 3c1.74 0 3.41 1.01 4.5 2.09 
                 C13.09 4.01 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5 
                 c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </motion.svg>

            <div
              className="flex items-center cursor-pointer text-[#ffffff]"
              onClick={toggleTheme}
            >
              <Sun
                className={`w-7 h-7 transition-all duration-300 ${
                  isDark ? "hidden" : "block"
                }`}
              />
              <Moon
                className={`w-6 h-6 transition-all duration-300 ${
                  isDark ? "block" : "hidden"
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
