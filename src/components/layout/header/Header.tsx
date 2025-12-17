"use client";
import { FC, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useRouter } from "next/navigation";
import Headerlogo from "@/src/assets/header.jpg";

const Header: FC = () => {
  const [fav, setFav] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const router = useRouter();

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (isDark) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <header className="fixed top-8 left-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between py-2 bg-white backdrop-blur-sm rounded-[35px] shadow-lg">
        <Image
          src={Headerlogo}
          alt="sapar.kg"
          width={55}
          className="rounded-md cursor-pointer ml-10"
          onClick={() => router.push("/")}
        />

        <nav className="flex items-center gap-8 text-[17px] font-medium text-black">
          <a onClick={() => router.push("/tours")} className="hover:text-orange-500 transition">
            Туры
          </a>
          <a onClick={() => router.push("/cooporation")} className="hover:text-orange-500 transition">
            О сотрудничество
          </a>
          <a onClick={() => router.push("/companies")} className="hover:text-orange-500 transition">
            Компании
          </a>
          <a onClick={() => router.push("/about")} className="hover:text-orange-500 transition">
            О нас
          </a>
          <a onClick={() => router.push("/contacts")} className="hover:text-orange-500 transition">
            Контакты
          </a>
        </nav>

        <div className="flex items-center gap-6">
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
                stroke="currentColor"
                strokeWidth="2"
                className="w-7 h-7 text-gray-500"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 
                  5.42 4.42 3 7.5 3c1.74 0 3.41 1.01 
                  4.5 2.09C13.09 4.01 14.76 3 
                  16.5 3 19.58 3 22 5.42 22 8.5c0 
                  3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            )}
          </motion.div>

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
    </header>
  );
};

export default Header;
