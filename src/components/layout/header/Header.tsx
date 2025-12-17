<<<<<<< HEAD
'use client'

import { FC, useState } from 'react'
import Headerlogo from '@/src/assets/header.jpg'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Moon, SearchIcon, Sun } from 'lucide-react'

const Header: FC = () => {
	const router = useRouter()
	const [fav, setFav] = useState(false)
	const [isDark, setIsDark] = useState(false)

	const toggleTheme = () => {
		setIsDark((prev) => !prev)
		document.documentElement.classList.toggle('dark')
	}

	return (
		<header className="absolute top-8 left-0 w-full z-20">
			<div className="container">
				<div className="mx-auto flex items-center justify-between py-3 bg-white dark:bg-gray-900 rounded-[10px] shadow-lg px-5">
					{/* LOGO */}
					<Image
						src={Headerlogo}
						alt="SAPAR.KG"
						width={60}
						className="rounded-md cursor-pointer"
						onClick={() => router.push('/')}
					/>

					{/* NAV */}
					<nav className="flex items-center gap-8 text-[17px] font-medium text-gray-700 dark:text-gray-200">
						<Link href="/tours" className="hover:text-orange-500 transition">
							Туры
						</Link>
						<Link
							href="/companies"
							className="hover:text-orange-500 transition"
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

					{/* RIGHT */}
					<div className="flex items-center gap-6">
						{/* SEARCH */}
						<div className="relative">
							<input
								type="text"
								placeholder="Куда вы хотите?"
								className="py-1.5 pl-3 pr-9 rounded-lg border border-orange-300 text-[16px] outline-none transition focus:border-orange-500 bg-white text-black"
							/>
							<SearchIcon className="w-5 h-5 text-orange-500 absolute right-2 top-2 cursor-pointer hover:scale-110 transition" />
						</div>

						{/* LOGIN */}
						<Link
							href="/auth"
							className="px-5 py-2 bg-orange-500 text-white rounded-lg text-[16px] hover:bg-orange-600 transition"
						>
							Войти
						</Link>

						{/* FAVORITE */}
						<motion.svg
							onClick={() => {
								setFav(!fav)
								router.push('/favorite')
							}}
							initial={false}
							animate={{
								scale: fav ? [1, 1.4, 1.2, 1] : 1,
								fill: fav ? '#ff4040' : 'none',
							}}
							transition={{ duration: 0.4 }}
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

						{/* THEME */}
						<div
							className="flex items-center cursor-pointer"
							onClick={toggleTheme}
						>
							{!isDark ? (
								<Sun className="w-7 h-7 text-orange-500" />
							) : (
								<Moon className="w-6 h-6 text-orange-500" />
							)}
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header
=======
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
>>>>>>> f18f5de5313388f416403773c6352a78b906b16d
