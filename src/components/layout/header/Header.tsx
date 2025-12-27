"use client";

import { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Moon, Sun, Menu, X, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import Headerlogo from "@/src/assets/header.jpg";

const Header: FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [fav, setFav] = useState(false);
  const router = useRouter();

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="fixed top-4 left-0 w-full z-50 px-3">
      <div className="container mx-auto">
        <div className="flex items-center justify-between px-5 py-2 bg-white/95 backdrop-blur rounded-[35px] shadow-lg">
          {/* Logo */}
          <Image
            src={Headerlogo}
            alt="sapar.kg"
            width={50}
            className="cursor-pointer rounded-full"
            onClick={() => router.push("/")}
          />

          <nav className="hidden lg:flex gap-8 text-[16px] font-medium">
            <Link href="/tours" className="hover:text-orange-500">
              Туры
            </Link>
            <Link href="/companies" className="hover:text-orange-500">
              Компании
            </Link>
            <Link href="/carDetail" className="hover:text-orange-500">
              CarDetails
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

          <div className="flex items-center gap-4">
            {/* Favorite */}
            <motion.div
              whileTap={{ scale: 0.8 }}
              onClick={() => setFav(!fav)}
              className="cursor-pointer"
            >
              <Heart
                className="w-6 h-6"
                fill={fav ? "#ff4040" : "none"}
                stroke={fav ? "#ff4040" : "currentColor"}
              />
            </motion.div>

            <select className="hidden md:block border rounded-lg px-2 py-1 text-sm">
              <option>RU</option>
              <option>EN</option>
            </select>

            <button onClick={toggleTheme}>
              {isDark ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>

            {/* Login */}
            <button
              onClick={() => router.push("/auth")}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg"
            >
              Войти
            </button>
          </div>

          {/* BURGER (mobile only) */}
          <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="lg:hidden mt-3 bg-white rounded-2xl shadow-lg p-5 flex flex-col gap-4">
            <Link href="/tours">Туры</Link>
            <Link href="/companies">Компании</Link>
            <Link href="/carDetail">CarDetails</Link>
            <Link href="/about">О нас</Link>
            <Link href="#footer">Контакты</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
