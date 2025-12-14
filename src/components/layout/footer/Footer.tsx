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
      const token = "8598838314:AAH2i5jkdQLUqGO42hr55zBZOcJP9tzeL-U";
      const chat_id = "@Sapar_kg";
      const api_key = `https://api.telegram.org/bot${token}/sendMessage`;

      await axios.post(api_key, {
        chat_id,
        text: ` Новый заказ обратного звонка\nТелефон: ${phone.replace(
          /\s/g,
          ""
        )}`,
        parse_mode: "HTML",
      });

      toast.success("Спасибо! Мы свяжемся с вами в ближайшее время.");
      setPhone("");
    } catch (e) {
      toast.error("Ошибка отправки. Попробуйте позже");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="mt-28 mb-10 bg-gray-50">
      <ToastContainer position="top-right" />
      <div className="container mx-auto px-4 overflow-x-auto">
        <div className="flex flex-nowrap gap-10 min-w-max">
          {/* Логотип и соцсети */}
          <div className="flex flex-col gap-4">
            <Image src={footerlogo} alt="logo" width={70} />
            <h1 className="text-gray-500 font-medium text-[20px] leading-snug">
              Туроператор №1 <br /> по Кыргызстану
            </h1>
            <div className="flex gap-4 mt-2">
              <a href="https://t.me/Sapar_kg" target="_blank">
                <FaTelegramPlane className="text-[#FF6600] text-3xl" />
              </a>
              <a href="https://wa.me/996704210706" target="_blank">
                <FaWhatsapp className="text-[#FF6600] text-3xl" />
              </a>
              <a href="https://instagram.com/asanbek0v15" target="_blank">
                <FaInstagram className="text-[#FF6600] text-3xl" />
              </a>
            </div>
            <h2 className="text-gray-400 text-[11px] mt-2">
              Sapar.kg 2025. All rights reserved
            </h2>
          </div>

          <div className="flex flex-col gap-3.5">
            <h1 className="text-black text-[22px] font-medium">Контакты</h1>
            <p className="text-gray-700 text-[16px]">+996704210706</p>
            <p className="text-gray-700 text-[16px] leading-snug">
              Кыргызстан <br /> г. Бишкек, улица <br /> Куренкеева 138
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-black text-[20px] font-medium">Информация</h1>
            <p className="text-gray-600 text-[14px]">Отдых в Кыргызстана</p>
            <p className="text-gray-600 text-[14px]">Пограничный пропуск</p>
            <p className="text-gray-600 text-[14px]">Достопримечательности</p>
            <p className="text-gray-600 text-[14px]">Чем заняться</p>
            <p className="text-gray-600 text-[14px]">Культура и традиции</p>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-black text-[20px] font-medium">О нас</h1>
            <p className="text-gray-600 text-[14px]">О компании</p>
            <p className="text-gray-600 text-[14px]">Туры</p>
            <p className="text-gray-600 text-[14px]">Сотрудничество</p>
            <p className="text-gray-600 text-[14px]">Публичная оферта</p>
            <p className="text-gray-600 text-[14px]">
              Политика конфиденциальности
            </p>
            <p className="text-gray-600 text-[14px]">Политика устойчивости</p>
          </div>

          <div className="flex flex-col gap-3.5">
            <h1 className="text-black text-[20px] font-medium">
              Заказать обратный <br /> звонок
            </h1>
            <p className="text-gray-600 text-[16px] my-2">
              Оставьте свой номер телефона ниже
            </p>
            <div className="flex gap-3">
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
