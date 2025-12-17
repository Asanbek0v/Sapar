"use client";
import { FC, useState } from "react";
import Headerlogo from "@/src/assets/header.jpg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";

const Header: FC = () => {
  const router = useRouter();
  const [fav, setFav] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="fixed top-4 left-0 w-full z-50 px-3 xs:px-4">
      <div className="container mx-auto">
        {/* MAIN */}
        <div
          className="mx-auto flex items-center justify-between
          py-2 bg-white/100 backdrop-blur-sm
          rounded-[35px] shadow-lg
          px-4 xs:px-6"
        >
          <Image
            src={Headerlogo}
            alt="sapar.kg"
            width={55}
            className="rounded-md cursor-pointer
            w-[38px] xs:w-[45px] md:w-[55px]"
            onClick={() => router.push("/")}
          />

          <nav className="hidden lg:flex items-center gap-8 text-[17px] font-medium text-black">
            <Link href="/tours" className="hover:text-orange-500">
              Туры
            </Link>
            <Link href="/companies" className="hover:text-orange-500">
              Компании
            </Link>
            <Link href="/cooporation" className="hover:text-orange-500">
              О сотрудничество
            </Link>
            <Link href="/about" className="hover:text-orange-500">
              О нас
            </Link>
            <Link href="#footer" className="hover:text-orange-500">
              Контакты
            </Link>
          </nav>

          <div className="flex items-center gap-3 xs:gap-4 mr-1 xs:mr-4">
            {/* SEARCH (md+) */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Куда вы хотите?"
                className="py-2 pl-4 pr-9 rounded-lg
                border border-orange-300 text-[14px]
                outline-none bg-white text-black"
              />
              <svg
                className="absolute right-2 top-1/2 -translate-y-1/2
                w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m21 21-4.34-4.34" />
                <circle cx="11" cy="11" r="8" />
              </svg>
            </div>

            <select
              className="hidden md:block
              bg-white text-black rounded-lg
              px-2 py-1 text-[13px]"
            >
              <option>RU</option>
              <option>EN</option>
            </select>

            <button
              className="hidden lg:block
              px-5 py-1.5 bg-orange-500 text-white
              rounded-lg text-[15px]
              hover:bg-orange-600 transition"
            >
              Войти
            </button>

            <motion.svg
              onClick={() => {
                router.push("/favorite");
                setFav(!fav);
              }}
              animate={{
                scale: fav ? [1, 1.4, 1] : 1,
                fill: fav ? "#ff4040" : "none",
              }}
              transition={{ duration: 0.4 }}
              className="w-5 h-5 xs:w-6 xs:h-6
              cursor-pointer stroke-orange-500"
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

            <button onClick={toggleTheme} className="text-black">
              {isDark ? (
                <Moon className="w-5 h-5 xs:w-6 xs:h-6" />
              ) : (
                <Sun className="w-5 h-5 xs:w-6 xs:h-6" />
              )}
            </button>

            <button
              className="lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div
            className="lg:hidden mt-3 bg-white
            rounded-2xl shadow-lg p-4 space-y-4 text-black gap-2"
          >
            <Link href="/tours">Туры</Link>
            <Link href="/companies">Компании</Link>
            <Link href="/cooporation">О сотрудничество</Link>
            <Link href="/about">О нас</Link>
            <Link href="#footer">Контакты</Link>

            <input
              placeholder="Куда вы хотите?"
              className="w-full py-2 px-3
              rounded-lg border border-orange-300"
            />

            <select className="w-full rounded-lg border px-3 py-2">
              <option>RU</option>
              <option>EN</option>
            </select>

            <button className="w-full py-2 bg-orange-500 text-white rounded-lg">
              Войти
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
