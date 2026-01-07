"use client";

import { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Moon, Sun, Menu, X, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import Headerlogo from "@/src/assets/header.jpg";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { setLanguage } from "@/src/redux/slices/languageSlice";
import { toggleDarkMode } from "@/src/redux/slices/Slice";

const Header: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { items: favorites } = useAppSelector((s) => s.favorite);
  const { darkMode } = useAppSelector((s) => s.theme);
  const { currentLang, availableLanguages } = useAppSelector((s) => s.language);

  const toggleTheme = () => {
    dispatch(toggleDarkMode());
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setLanguage(e.target.value as "ru" | "en" | "kg"));
  };

  return (
    <header className="fixed top-4 left-0 w-full z-50 px-3">
      <div className="container mx-auto">
        <div className="flex items-center justify-between px-5 py-2 backdrop-blur rounded-[35px] shadow-lg bg-white">
          <Image
            src={Headerlogo}
            alt="logo"
            width={50}
            className="cursor-pointer rounded-full"
            onClick={() => router.push("/")}
          />

          <nav className="hidden lg:flex gap-6 text-[16px] font-medium">
            <Link
              href="/tours"
              className="hover:text-orange-500 transition-colors"
            >
              Туры
            </Link>
            <Link
              href="/companies"
              className="hover:text-orange-500 transition-colors"
            >
              Компании
            </Link>
            <Link
              href="/about"
              className="hover:text-orange-500 transition-colors"
            >
              О нас
            </Link>
            <Link
              href="#footer"
              className="hover:text-orange-500 transition-colors"
            >
              Контакты
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/favorite">
              <motion.div
                whileTap={{ scale: 0.8 }}
                className="relative cursor-pointer"
              >
                <Heart
                  className="w-6 h-6"
                  fill={favorites.length ? "#ff4040" : "none"}
                  stroke={favorites.length ? "#ff4040" : "currentColor"}
                />
                {favorites.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </motion.div>
            </Link>

            <select
              value={currentLang}
              onChange={handleLanguageChange}
              className="border rounded px-2 py-1 text-sm bg-white border-gray-300"
            >
              {Object.entries(availableLanguages).map(([key, lang]) => (
                <option key={key} value={key}>
                  {lang.name}
                </option>
              ))}
            </select>

            <motion.button whileTap={{ scale: 0.9 }} onClick={toggleTheme}>
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </motion.button>

            <button
              onClick={() => router.push("/auth")}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Войти
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
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden mt-3 rounded-2xl shadow-lg p-5 flex flex-col gap-4 bg-white"
          >
            <Link href="/tours" onClick={() => setMenuOpen(false)}>
              Туры
            </Link>
            <Link href="/companies" onClick={() => setMenuOpen(false)}>
              Компании
            </Link>
            <Link href="/carDetail" onClick={() => setMenuOpen(false)}>
              CarDetails
            </Link>
            <Link href="/about" onClick={() => setMenuOpen(false)}>
              О нас
            </Link>
            <Link href="#footer" onClick={() => setMenuOpen(false)}>
              Контакты
            </Link>
            <select
              value={currentLang}
              onChange={handleLanguageChange}
              className="border rounded px-2 py-1 text-sm bg-white border-gray-300"
            >
              {Object.entries(availableLanguages).map(([key, lang]) => (
                <option key={key} value={key}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
            <button
              onClick={() => router.push("/auth")}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Войти
            </button>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
