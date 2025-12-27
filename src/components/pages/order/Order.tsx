"use client";

import { useState } from "react";
import {
  MapPin,
  Calendar,
  Users,
  Phone,
  Mail,
  CreditCard,
  Check,
  Plane,
  Hotel,
  Utensils,
  Camera,
} from "lucide-react";
import Link from "next/link";

type Tour = {
  id: number;
  name: string;
  destination: string;
  duration: string;
  price: number;
  image: string;
  includes: string[];
  description: string;
};

type FormData = {
  tourId: string;
  fullName: string;
  email: string;
  phone: string;
  date: string;
  adults: number;
  children: number;
  specialRequests: string;
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCVV: string;
};

const OrderPage = () => {
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    tourId: "",
    fullName: "",
    email: "",
    phone: "",
    date: "",
    adults: 1,
    children: 0,
    specialRequests: "",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCVV: "",
  });

  const tours: Tour[] = [
    {
      id: 1,
      name: "Париж - Город Любви",
      destination: "Париж, Франция",
      duration: "7 дней / 6 ночей",
      price: 1299,
      image: "🗼",
      includes: ["Авиаперелет", "Отель 4★", "Завтраки", "Экскурсии"],
      description: "Романтическое путешествие по столице Франции",
    },
    {
      id: 2,
      name: "Тропический Рай",
      destination: "Мальдивы",
      duration: "10 дней / 9 ночей",
      price: 2499,
      image: "🏝️",
      includes: ["Авиаперелет", "Вилла 5★", "Все включено", "Дайвинг"],
      description: "Незабываемый отдых на райских островах",
    },
    {
      id: 3,
      name: "Древний Восток",
      destination: "Стамбул, Турция",
      duration: "5 дней / 4 ночи",
      price: 799,
      image: "🕌",
      includes: ["Авиаперелет", "Отель 4★", "Завтраки", "Гид"],
      description: "Погружение в культуру и историю Востока",
    },
    {
      id: 4,
      name: "Альпийские Вершины",
      destination: "Швейцария",
      duration: "6 дней / 5 ночей",
      price: 1599,
      image: "⛰️",
      includes: ["Авиаперелет", "Шале 4★", "Завтраки", "Ski-pass"],
      description: "Горнолыжный отдых в Альпах",
    },
    {
      id: 5,
      name: "Сафари Приключение",
      destination: "Кения, Африка",
      duration: "8 дней / 7 ночей",
      price: 1899,
      image: "🦁",
      includes: ["Авиаперелет", "Лодж 4★", "Полный пансион", "Сафари"],
      description: "Встреча с дикой природой Африки",
    },
    {
      id: 6,
      name: "Азиатская Экзотика",
      destination: "Бали, Индонезия",
      duration: "12 дней / 11 ночей",
      price: 1699,
      image: "🌺",
      includes: ["Авиаперелет", "Вилла 5★", "Завтраки", "Экскурсии"],
      description: "Остров богов и бесконечных пляжей",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTourSelect = (tour: Tour) => {
    setSelectedTour(tour);
    setFormData({
      ...formData,
      tourId: tour.id.toString(),
    });
    setStep(2);
  };

  const calculateTotal = () => {
    if (!selectedTour) return 0;
    const adultsPrice = selectedTour.price * formData.adults;
    const childrenPrice = selectedTour.price * 0.7 * formData.children;
    return adultsPrice + childrenPrice;
  };

  const handleSubmit = () => {
    console.log("Order submitted:", formData);
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#ff6600] py-40 px-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#232323] mb-4 tracking-tight">
            Забронировать Тур
          </h1>
          <p className="text-gray-700 text-lg">
            Выберите свое следующее приключение
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                    step >= s
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white scale-110"
                      : "bg-white/10 text-gray-400"
                  }`}
                >
                  {step > s ? <Check className="w-6 h-6" /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 transition-all duration-300 ${
                      step > s
                        ? "bg-gradient-to-r from-purple-500 to-pink-500"
                        : "bg-white/20"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((tour) => (
              <div
                key={tour.id}
                className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 overflow-hidden transition-all duration-300 hover:scale-105 hover:bg-white/15 cursor-pointer"
                onClick={() => handleTourSelect(tour)}
              >
                <div className="h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-9xl">
                  {tour.image}
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {tour.name}
                  </h3>
                  <div className="flex items-center gap-2 text-[#242424] mb-3 text-xl">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{tour.destination}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#242424] mb-4 text-xl">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{tour.duration}</span>
                  </div>
                  <p className="text-gray-800 text-sm mb-4">
                    {tour.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    {tour.includes.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-gray-300 text-sm"
                      >
                        <Check className="w-5 h-5 text-green-500" />
                        <span className="text-[16px] text-gray-900">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-gray-700 text-sm">от</span>
                      <div className="text-3xl font-bold text-gray-800">
                        ${tour.price}
                      </div>
                      <span className="text-gray-700 text-sm font-medium">
                        на человека
                      </span>
                    </div>
                    <button className="bg-[#ff6500] text-white px-6 py-3 rounded-lg font-semibold  transition-all duration-300">
                      Выбрать
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {step === 2 && selectedTour && (
          <div className="max-w-4xl mx-auto">
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12 mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Личные данные
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-gray-700 font-semibold mb-2 block">
                    Полное имя
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Ваше имя"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 rounded-xl py-4 px-4 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-700 font-semibold mb-2 block">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
                    <input
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 rounded-xl py-4 pl-12 pr-4 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-700 font-semibold mb-2 block">
                    Телефон
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+996 555 123 456"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 rounded-xl py-4 pl-12 pr-4 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-700 font-semibold mb-2 block">
                    Дата отъезда
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 rounded-xl py-4 pl-12 pr-4 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-700 font-semibold mb-2 block">
                    Взрослые
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          adults: Math.max(1, formData.adults - 1),
                        })
                      }
                      className="w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-gray-700 font-bold transition-all duration-300"
                    >
                      -
                    </button>
                    <span className="text-2xl font-bold text-gray-700">
                      {formData.adults}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          adults: formData.adults + 1,
                        })
                      }
                      className="w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-gray-700 font-bold transition-all duration-300"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-gray-700 font-semibold mb-2 block">
                    Дети (до 12 лет)
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          children: Math.max(0, formData.children - 1),
                        })
                      }
                      className="w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-gray-700 font-bold transition-all duration-300"
                    >
                      -
                    </button>
                    <span className="text-2xl font-bold text-gray-700">
                      {formData.children}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          children: formData.children + 1,
                        })
                      }
                      className="w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-gray-700 font-bold transition-all duration-300"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label className="text-gray-700 font-semibold mb-2 block text-s,">
                  Особые пожелания
                </label>
                <textarea
                  name="specialRequests"
                  placeholder="Укажите особые требования к туру..."
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full bg-white/10 border border-white/20 rounded-xl py-4 px-4 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 resize-none"
                />
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 text-gray-700 font-semibold py-4 rounded-xl transition-all duration-300"
                >
                  Назад
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 bg-[#ff6500] hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform"
                >
                  Продолжить
                </button>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Выбранный тур
              </h3>
              <div className="flex items-start gap-6">
                <div className="text-8xl">{selectedTour.image}</div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-800 mb-2">
                    {selectedTour.name}
                  </h4>
                  <p className="text-purple-800 mb-2 text-lg">
                    {selectedTour.destination}
                  </p>
                  <p className="text-gray-800 text-lg">
                    {selectedTour.duration}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-800">
                    ${calculateTotal()}
                  </div>
                  <div className="text-gray-800 text-lg">Итого</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && selectedTour && (
          <div className="max-w-4xl mx-auto">
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12 mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Оплата</h2>

              <div className="space-y-6">
                <div>
                  <label className="text-gray-800 font-medium mb-2 block">
                    Номер карты
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-800" />
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      maxLength={19}
                      className="w-full bg-white/10 border border-white/20 rounded-xl py-4 pl-12 pr-4 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-800 font-medium mb-2 block">
                    Имя на карте
                  </label>
                  <input
                    type="text"
                    name="cardName"
                    placeholder="IVAN IVANOV"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-xl py-4 px-4 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-gray-800 font-medium mb-2 block">
                      Срок действия
                    </label>
                    <input
                      type="text"
                      name="cardExpiry"
                      placeholder="MM/YY"
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      maxLength={5}
                      className="w-full bg-white/10 border border-white/20 rounded-xl py-4 px-4 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="text-gray-800 font-medium mb-2 block">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cardCVV"
                      placeholder="123"
                      value={formData.cardCVV}
                      onChange={handleInputChange}
                      maxLength={3}
                      className="w-full bg-white/10 border border-white/20 rounded-xl py-4 px-4 text-gray-800 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 text-gray-800 font-semibold py-4 rounded-xl transition-all duration-300"
                >
                  Назад
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 bg-[#ff6500] hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform"
                >
                  Оплатить ${calculateTotal()}
                </button>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8">
              <h3 className="text-2xl font-bold text-gray-700 mb-6">
                Детали заказа
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-800 text-lg font-bold">
                  <span>
                    Взрослые ({formData.adults} x ${selectedTour.price})
                  </span>
                  <span className="text-gray-800 font-semibold">
                    ${selectedTour.price * formData.adults}
                  </span>
                </div>
                {formData.children > 0 && (
                  <div className="flex justify-between text-gray-800 text-lg font-bold">
                    <span>
                      Дети ({formData.children} x $
                      {Math.round(selectedTour.price * 0.7)})
                    </span>
                    <span className="text-gray-800 font-semibold">
                      $
                      {Math.round(selectedTour.price * 0.7 * formData.children)}
                    </span>
                  </div>
                )}
                <div className="border-t border-white/20 pt-4 mt-4">
                  <div className="flex justify-between text-xl">
                    <span className="text-gray-800 font-bold">Итого:</span>
                    <span className="text-gray-800 font-bold">
                      ${calculateTotal()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-12">
              <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-gray-700 mb-4">
                Поздравляем!
              </h2>
              <p className="text-xl text-gray-800 mb-8">
                Ваш тур успешно забронирован!
              </p>
              <div className="bg-white/5 rounded-2xl p-6 mb-8">
                <p className="text-gray-800 mb-2">
                  Детали бронирования отправлены на: Telegram
                </p>
                <p className="text-gray-800 font-semibold text-lg">
                  {formData.email}
                </p>
              </div>
              <Link
                href={"/"}
                type="button"
                onClick={() => {
                  setStep(1);
                  setSelectedTour(null);
                  setFormData({
                    tourId: "",
                    fullName: "",
                    email: "",
                    phone: "",
                    date: "",
                    adults: 1,
                    children: 0,
                    specialRequests: "",
                    cardNumber: "",
                    cardName: "",
                    cardExpiry: "",
                    cardCVV: "",
                  });
                }}
                className="bg-[#ff6500] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform"
              >
                На главный экран
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
