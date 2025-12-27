"use client";

import Image from "next/image";
import footerlogo from "@/src/assets/header.jpg";
import { FC, useState } from "react";
import { FaInstagram, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Footer: FC = () => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidPhone = (phone: string) =>
    /^\+996\d{9}$/.test(phone.replace(/\s/g, ""));

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (!digits.startsWith("996")) return "+" + digits;
    return (
      "+" +
      digits.slice(0, 3) +
      " " +
      digits.slice(3, 6) +
      " " +
      digits.slice(6, 9) +
      " " +
      digits.slice(9, 12)
    );
  };

  const addTelegram = async () => {
    if (!phone.trim()) {
      toast.error("Пожалуйста, введите номер телефона");
      return;
    }

    if (!isValidPhone(phone)) {
      toast.error("Введите номер в формате +996XXXXXXXXX");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        `https://api.telegram.org/bot8598838314:AAH2i5jkdQLUqGO42hr55zBZOcJP9tzeL-U/sendMessage`,
        {
          chat_id: "@Sapar_kg",
          text: `📞 Новый заказ обратного звонка\nТелефон: ${phone.replace(
            /\s/g,
            ""
          )}`,
        }
      );

      toast.success("Спасибо! Мы свяжемся с вами.");
      setPhone("");
    } catch {
      toast.error("Ошибка отправки");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="mt-24 bg-white">
      <ToastContainer position="top-right" />

      <div className="container py-10">
        <div
          className="
            max-w-[1300px] mx-auto
            grid gap-10
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-5
          "
        >
          <div className="flex flex-col gap-4 text-center sm:text-left">
            <Image
              src={footerlogo}
              alt="logo"
              width={70}
              className="mx-auto sm:mx-0"
            />

            <h1 className="text-gray-500 font-medium text-[18px]">
              Туроператор №1 <br /> по Кыргызстану
            </h1>

            <div className="flex justify-center sm:justify-start gap-4 mt-2">
              <a href="https://t.me/Sapar_kg" target="_blank">
                <FaTelegramPlane className="text-[#FF6600] text-2xl" />
              </a>
              <a href="https://wa.me/996704210706" target="_blank">
                <FaWhatsapp className="text-[#FF6600] text-2xl" />
              </a>
              <a href="https://instagram.com/asanbek0v15" target="_blank">
                <FaInstagram className="text-[#FF6600] text-2xl" />
              </a>
            </div>

            <span className="text-gray-400 text-[12px]">© Sapar.kg 2025</span>
          </div>

          <div className="flex flex-col gap-3 text-center sm:text-left">
            <h1 className="text-black text-[20px] font-medium">Контакты</h1>
            <p className="text-gray-700">+996 704 210 706</p>
            <p className="text-gray-700 leading-snug">
              Кыргызстан <br /> г. Бишкек <br /> ул. Куренкеева 138
            </p>
          </div>

          <div className="flex flex-col gap-2 text-center sm:text-left">
            <h1 className="text-black text-[20px] font-medium">Информация</h1>
            {[
              "Отдых в Кыргызстане",
              "Пограничный пропуск",
              "Достопримечательности",
              "Чем заняться",
              "Культура и традиции",
            ].map((el) => (
              <p key={el} className="text-gray-600 text-[14px]">
                {el}
              </p>
            ))}
          </div>

          <div className="flex flex-col gap-2 text-center sm:text-left">
            <h1 className="text-black text-[20px] font-medium">О нас</h1>
            {[
              "О компании",
              "Туры",
              "Сотрудничество",
              "Публичная оферта",
              "Политика конфиденциальности",
              "Политика устойчивости",
            ].map((el) => (
              <p key={el} className="text-gray-600 text-[14px]">
                {el}
              </p>
            ))}
          </div>

          <div className="flex flex-col gap-3 text-center sm:text-left">
            <h1 className="text-black text-[20px] font-medium">
              Заказать <br /> обратный звонок
            </h1>

            <p className="text-gray-600 text-[15px]">Оставьте номер телефона</p>

            <div className="flex flex-col xs:flex-row gap-3">
              <input
                type="tel"
                placeholder="+996 XXX XXX XXX"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                className="py-2 px-3 border border-[#ff6600] rounded-md outline-none flex-1"
              />

              <button
                disabled={loading}
                onClick={addTelegram}
                className="py-2 px-4 rounded-md bg-[#ff6600] text-white disabled:opacity-50"
              >
                {loading ? "Отправка..." : "Отправить"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
