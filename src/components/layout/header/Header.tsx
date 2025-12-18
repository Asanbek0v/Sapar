"use client";

import { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
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
        <div className="flex items-center justify-between px-6 py-2 bg-white backdrop-blur rounded-[35px] shadow-lg">

          {/* LOGO */}
          <Image
            src={Headerlogo}
            alt="sapar.kg"
            width={50}
            className="cursor-pointer rounded-md"
            onClick={() => router.push("/")}
          />

          {/* NAV (desktop only) */}
          <nav className="hidden lg:flex gap-8 text-[16px] font-medium">
            <Link href="/tours">Туры</Link>
            <Link href="/companies">Компании</Link>
            <Link href="/cooporation">О сотрудничество</Link>
            <Link href="/about">О нас</Link>
            <Link href="#footer">Контакты</Link>
          </nav>

          {/* ACTIONS (desktop only) */}
          <div className="hidden lg:flex items-center gap-4">

            {/* Favorite */}
            <motion.svg
              onClick={() => {
                setFav(!fav);
                router.push("/favorite");
              }}
              animate={{ scale: fav ? [1, 1.3, 1] : 1 }}
              className="w-6 h-6 cursor-pointer"
              fill={fav ? "#ff4040" : "none"}
              stroke="orange"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 1.01 4.5 2.09C13.09 4.01 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z" />
            </motion.svg>

            {/* Theme */}
            <button onClick={toggleTheme}>
              {isDark ? <Moon /> : <Sun />}
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
          <button
            className="lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="lg:hidden mt-3 bg-white rounded-2xl shadow-lg p-4 space-y-4">

            {/* NAV */}
            <nav className="flex flex-col gap-3 font-medium">
              <Link href="/tours">Туры</Link>
              <Link href="/companies">Компании</Link>
              <Link href="/cooporation">О сотрудничество</Link>
              <Link href="/about">О нас</Link>
              <Link href="#footer">Контакты</Link>
            </nav>

            <hr />

            {/* ACTIONS */}
            <div className="flex items-center gap-4">

              <motion.svg
                onClick={() => {
                  setFav(!fav);
                  router.push("/favorite");
                }}
                animate={{ scale: fav ? [1, 1.3, 1] : 1 }}
                className="w-6 h-6 cursor-pointer"
                fill={fav ? "#ff4040" : "none"}
                stroke="orange"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 1.01 4.5 2.09C13.09 4.01 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z" />
              </motion.svg>

              <button onClick={toggleTheme}>
                {isDark ? <Moon /> : <Sun />}
              </button>
            </div>

            {/* LOGIN */}
            <button
              onClick={() => router.push("/auth")}
              className="w-full bg-orange-500 text-white py-2 rounded-lg"
            >
              Войти
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
