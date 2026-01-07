"use client";
import Image from "next/image";
import React, { useState } from "react";
import frends from "../../../assets/frends.png";
import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cooporation = () => {
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);

  const sendQuestionToTelegram = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !question || !contact) {
      toast.error("Пожалуйста, заполните все поля!");
      return;
    }

    try {
      setLoading(true);
      const token = "8598838314:AAH2i5jkdQLUqGO42hr55zBZOcJP9tzeL-U"; // твой токен
      const chat_id = "@Sapar_kg";
      const api_url = `https://api.telegram.org/bot${token}/sendMessage`;

      const message = `
📩 <b>Новый вопрос с сайта</b>

<b>Имя:</b> ${name}
<b>Вопрос:</b> ${question}
<b>Контакты:</b> ${contact}
`;

      await axios.post(api_url, {
        chat_id,
        text: message,
        parse_mode: "HTML",
      });

      toast.success("Сообщение отправлено! Мы свяжемся с вами.");
      setName("");
      setQuestion("");
      setContact("");
    } catch (error) {
      console.error(error);
      toast.error("Ошибка отправки сообщения");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pt-25 pb-16">
      <ToastContainer />
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between gap-8 items-center">
          <div className="max-w-xl">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 ">
              Сотрудничество с <br />
              <span className="text-orange-500">нами</span>
            </h1>

            <p className="font-semibold mb-6 pt-5 pb-5">
              Добро пожаловать на страницу <br /> сотрудничества с Sapar.kg
            </p>

            <p className="mb-4 text-gray-700 leading-relaxed">
              Мы готовы рассмотреть любые варианты сотрудничества с
              туристическими агентствами, отелями и другими компаниями или
              лицами, которые заинтересованы в организации туров и любых
              туристических услуг в Кыргызстане. Наша компания предоставляет
              широкий спектр туров, включая пешие и конные туры, восхождения на
              горные пики, экскурсии по достопримечательностям, организация
              конференций, трансфер и многое другое.
            </p>

            <p className="mt-6 text-gray-800 pb-10 pt-4">
              С уважением, <br />
              Основатели / Дастан, Нурсултан, Бакдөөлөт, Байдөөлөт.
            </p>
          </div>

          <div className="flex justify-center sm:justify-end relative w-full sm:w-1/2 h-[400px]">
            <Image src={frends} alt="frends" fill className="object-contain" />
          </div>
        </div>

        <div className="mt-16 border-9 border-orange-500 rounded-4xl sm:pt-10 sm:p-10 bg-[#f3f3f3]">
          <div className="flex flex-col sm:flex-row justify-between gap-10 items-start">
            <div className="max-w-sm">
              <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                Задать вопрос
              </h2>

              <p className="text-gray-600 mb-6 p-9">
                Наш менеджер свяжется с <br /> вами в ближайшее время
              </p>

              <div className="flex items-center gap-5 relative left-18">
                <div className="w-12 h-12 bg-white border rounded-full flex items-center justify-center text-green-500 text-xl">
                  <Link href="https://wa.me/996XXXYYYZZZ" target="_blank">
                    <FaWhatsapp />
                  </Link>
                </div>

                <div className="w-12 h-12 bg-white border rounded-full flex items-center justify-center text-blue-500 text-xl">
                  <Link
                    href="https://web.telegram.org/k/#-5038113903"
                    target="_blank"
                  >
                    <FaTelegramPlane />
                  </Link>
                </div>
              </div>
            </div>

            <form
              onSubmit={sendQuestionToTelegram}
              className="flex flex-col gap-4 w-full max-w-xl"
            >
              <input
                type="text"
                placeholder="Ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-full p-3 border bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />

              <textarea
                placeholder="Ваш вопрос"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="rounded-2xl p-4 border h-28 resize-none bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />

              <input
                type="text"
                placeholder="Ваши контакты"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="rounded-full p-3 border bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />

              <button
                type="submit"
                disabled={loading}
                className="bg-orange-500 text-white py-3 rounded-full hover:bg-orange-600 transition-colors"
              >
                {loading ? "Отправка..." : "Отправить"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cooporation;
