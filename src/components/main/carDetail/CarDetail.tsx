"use client";
import React, { useState } from "react";
import Image from "next/image";
import car1 from "@/src/assets/car1.png";
import car2 from "@/src/assets/car2.png";
import car3 from "@/src/assets/car3.png";
import car4 from "@/src/assets/car4.png";
import axios from "axios";
import { toast } from "react-toastify";

const CarDetail = () => {
  const [activeTab, setActiveTab] = useState("Характеристики");
  const [mainImgIndex, setMainImgIndex] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [delivery, setDelivery] = useState(false);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const images = [car1, car2, car3, car4];
  const tabs = ["Характеристики", "Описание", "Условия проката", "Отзывы"];
  const [reviews, setReviews] = useState([
    {
      name: "Алексей М.",
      rating: 5,
      text: "Отличная машина! Все прошло гладко, рекомендую!",
    },
    {
      name: "Мария К.",
      rating: 5,
      text: "Очень довольны сервисом. Машина в идеальном состоянии.",
    },
    {
      name: "Дмитрий С.",
      rating: 4,
      text: "Хорошая цена и качество. Обязательно вернёмся снова.",
    },
  ]);

  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);

  const sendBookingToTelegram = async () => {
    if (!name || !phone || !startDate || !endDate) {
      toast.error("Заполните все обязательные поля");
      return;
    }

    try {
      setLoading(true);
      const token = "8598838314:AAH2i5jkdQLUqGO42hr55zBZOcJP9tzeL-U";
      const chat_id = "@Sapar_kg";
      const api_url = `https://api.telegram.org/bot${token}/sendMessage`;
      const message = `
🚗 <b>Новая бронь авто</b>

<b>Авто:</b> Toyota RAV4 2023
<b>Имя:</b> ${name}
<b>Телефон:</b> ${phone}
<b>Дата начала:</b> ${startDate}
<b>Дата окончания:</b> ${endDate}
<b>Доставка:</b> ${delivery ? "Да" : "Нет"}
${delivery ? `<b>Адрес:</b> ${address}` : ""}
`;

      await axios.post(api_url, {
        chat_id,
        text: message,
        parse_mode: "HTML",
      });

      toast.success("Заявка отправлена! Мы свяжемся с вами.");

      setName("");
      setPhone("");
      setStartDate("");
      setEndDate("");
      setDelivery(false);
      setAddress("");
    } catch (error) {
      toast.error("Ошибка отправки");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");

    if (!digits.startsWith("996")) {
      return "+996";
    }

    return (
      "+996 " +
      digits.slice(3, 6) +
      " " +
      digits.slice(6, 9) +
      " " +
      digits.slice(9, 12)
    ).trim();
  };
  if (!formatPhone(phone)) {
    toast.error("Введите номер в формате +996XXXXXXXXX");
    return;
  }
  const addReview = () => {
    if (!reviewName || !reviewText || reviewRating === 0) {
      toast.error("Заполните имя, отзыв и рейтинг");
      return;
    }

    setReviews([
      ...reviews,
      {
        name: reviewName,
        rating: reviewRating,
        text: reviewText,
      },
    ]);

    setReviewName("");
    setReviewText("");
    setReviewRating(0);

    toast.success("Отзыв добавлен");
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-28 pl-25 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-5">
            <div className="sticky top-6">
              <div className="relative h-[400px] rounded-2xl overflow-hidden mb-4 group bg-white shadow-lg border border-gray-100">
                <Image
                  src={images[mainImgIndex]}
                  alt="main car"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  Доступен
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {images.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setMainImgIndex(i)}
                    className={`h-24 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border-2 ${
                      mainImgIndex === i
                        ? "border-red-500 shadow-lg scale-105"
                        : "border-gray-200 hover:border-gray-300 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`car ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-3 leading-tight">
                Toyota RAV4 2023
              </h1>
              <p className="text-gray-600 text-lg">
                Премиум кроссовер в Бишкеке
              </p>
            </div>

            <div className="flex items-center gap-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-semibold">4.9</span>
                <span className="text-gray-500 text-sm">(47 отзывов)</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200">
              <p className="text-sm text-gray-500 mb-2">Общие характеристики</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Двигатель</p>
                    <p className="font-semibold">2.0 бензин</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Год</p>
                    <p className="font-semibold">2023</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Мест</p>
                    <p className="font-semibold">5</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-purple-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Привод</p>
                    <p className="font-semibold">Передний</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-6 text-white">
              <p className="text-sm opacity-90 mb-2">Стоимость аренды</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold">75$</span>
                <span className="text-xl opacity-90">/ сутки</span>
              </div>
              <p className="text-sm opacity-90 mt-2">
                Специальные цены от 4 дней
              </p>
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="sticky top-6 bg-white rounded-2xl shadow-xl border border-gray-100 p-6 pb-8">
              <h3 className="text-2xl font-bold mb-5 text-gray-900">
                Забронировать
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Ваше имя
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Введите имя"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300
          focus:border-red-500 focus:ring-2 focus:ring-red-200
          outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(formatPhone(e.target.value))}
                    placeholder="+996 XXX XXX XXX"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300
          focus:border-red-500 focus:ring-2 focus:ring-red-200
          outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Дата начала
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300
          focus:border-red-500 focus:ring-2 focus:ring-red-200
          outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Дата окончания
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300
          focus:border-red-500 focus:ring-2 focus:ring-red-200
          outline-none transition-all"
                  />
                </div>

                <label className="flex items-center gap-3 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={delivery}
                    onChange={(e) => setDelivery(e.target.checked)}
                    className="w-5 h-5 text-red-500 rounded border-gray-300 focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700">
                    Доставка по адресу
                  </span>
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Адрес доставки"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300
        focus:border-red-500 focus:ring-2 focus:ring-red-200
        outline-none transition-all"
                />
              </div>
              <button
                onClick={sendBookingToTelegram}
                disabled={loading}
                className="mt-5 w-full bg-gradient-to-r from-red-500 to-orange-500
  text-white py-4 rounded-xl text-lg font-semibold
  shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
              >
                {loading ? "Отправка..." : "Забронировать сейчас"}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-200 overflow-x-auto">
            <div className="flex gap-1 p-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200 h-fit">
              <h3 className="text-xl font-bold mb-6 text-gray-900">
                Стоимость проката
              </h3>

              <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="bg-white rounded-xl p-4 border border-gray-200 text-center hover:border-red-500 transition-all cursor-pointer">
                  <p className="text-xs text-gray-500 mb-1">1-3 дня</p>
                  <p className="text-2xl font-bold text-red-500">75$</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-200 text-center hover:border-red-500 transition-all cursor-pointer">
                  <p className="text-xs text-gray-500 mb-1">4-7 дней</p>
                  <p className="text-2xl font-bold text-red-500">70$</p>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-200 text-center hover:border-red-500 transition-all cursor-pointer">
                  <p className="text-xs text-gray-500 mb-1">от 8 дней</p>
                  <p className="text-2xl font-bold text-red-500">65$</p>
                </div>
              </div>

              <div>
                <h4 className="font-bold mb-4 text-gray-900">
                  Требования к водителям
                </h4>
                <ul className="space-y-3 text-sm text-gray-700">
                  {[
                    "Возраст от 21-65, стаж не менее 3-х лет",
                    "Паспорт, загранпаспорт, водительское удостоверение",
                    "Минимальный срок аренды 24 часа",
                    "Депозит от 500$",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-2 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200">
              {activeTab === "Характеристики" && (
                <div>
                  <h4 className="text-2xl font-bold mb-6 text-gray-900">
                    Технические характеристики
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { label: "Тип двигателя", value: "2.0 бензин" },
                      { label: "Привод", value: "Передний" },
                      { label: "Год выпуска", value: "2023" },
                      { label: "Категория", value: "Кроссовер" },
                      { label: "Количество мест", value: "5" },
                      { label: "Марка", value: "Toyota" },
                      { label: "Модель", value: "RAV4" },
                      { label: "Коробка передач", value: "Автомат" },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="bg-white rounded-xl p-4 border border-gray-200"
                      >
                        <p className="text-xs text-gray-500 mb-1">
                          {item.label}
                        </p>
                        <p className="font-semibold text-gray-900">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "Описание" && (
                <div>
                  <h4 className="text-2xl font-bold mb-6 text-gray-900">
                    Комплектация и особенности
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "Антиблокировочная система",
                      "Система помощи при экстренном торможении",
                      "Подушки безопасности водителя",
                      "Подушки безопасности пассажира",
                      "Дистанционный запуск двигателя",
                      "Центральный замок",
                      "Система автоматической парковки",
                      "Контроль полосы движения",
                      "Электроскладывание зеркал",
                      "Беспроводная зарядка телефона",
                      "Кожаный салон",
                      "Электрический люк",
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 bg-white rounded-lg p-3 border border-gray-200"
                      >
                        <svg
                          className="w-5 h-5 text-green-500 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === "Условия проката" && (
                <div>
                  <h4 className="text-2xl font-bold mb-6 text-gray-900">
                    Условия проката
                  </h4>
                  <div className="space-y-4">
                    {[
                      { title: "Возраст", desc: "От 21 до 65 лет" },
                      { title: "Водительский стаж", desc: "Минимум 3 года" },
                      {
                        title: "Документы",
                        desc: "Паспорт и водительское удостоверение",
                      },
                      { title: "Минимальный срок", desc: "24 часа аренды" },
                      { title: "Депозит", desc: "От 500$ (возвращается)" },
                      { title: "Страховка", desc: "Включена в стоимость" },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="bg-white rounded-xl p-5 border border-gray-200"
                      >
                        <h5 className="font-semibold text-gray-900 mb-1">
                          {item.title}
                        </h5>
                        <p className="text-gray-600">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === "Отзывы" && (
                <div>
                  <h4 className="text-2xl font-bold mb-6 text-gray-900">
                    Отзывы клиентов
                  </h4>

                  <div className="space-y-4 mb-10">
                    {reviews.map((review, i) => (
                      <div
                        key={i}
                        className="bg-white rounded-xl p-6 border border-gray-200"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-semibold text-gray-900">
                            {review.name}
                          </h5>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, j) => (
                              <svg
                                key={j}
                                className={`w-4 h-4 ${
                                  j < review.rating
                                    ? "text-yellow-500"
                                    : "text-gray-300"
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600">{review.text}</p>
                      </div>
                    ))}
                  </div>

                  {/* ФОРМА ОТЗЫВА */}
                  <h4 className="text-2xl font-bold mb-4 text-gray-900">
                    Оставьте отзыв об автомобиле
                  </h4>

                  <div className="bg-white rounded-xl p-6 border border-gray-200 space-y-4 max-w-xl">
                    <input
                      type="text"
                      placeholder="Ваше имя"
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-200 outline-none"
                    />

                    <textarea
                      placeholder="Ваш отзыв"
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-200 outline-none"
                    />

                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setReviewRating(star)}
                          className="text-2xl"
                        >
                          {star <= reviewRating ? "⭐" : "☆"}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={addReview}
                      className="px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
                    >
                      Отправить отзыв
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarDetail;
