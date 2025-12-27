"use client";

import { FC, useState } from "react";
import { Star, Send, User } from "lucide-react";
import { useGetTodosQuery } from "@/src/redux/api/todo";

interface ITodo {
  id: number;
  UserID: string;
  rating: number;
  commet: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}
interface IReviewUI {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
}

const Review: FC = () => {
  const { data, isLoading, isError } = useGetTodosQuery();
  const reviews: IReviewUI[] =
    data?.data?.map((el: ITodo) => ({
      id: el.id,
      name: el.UserID || "UserName",
      rating: el.rating,
      text: el.commet,
      date: new Date(el.createdAt).toLocaleDateString(),
    })) ?? [];

  const [formData, setFormData] = useState({
    name: "",
    rating: 5,
    text: "",
  });

  const [hoveredStar, setHoveredStar] = useState(0);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (formData.name.trim() && formData.text.trim()) {
      const newReview = {
        id: Date.now(),
        name: formData.name,
        rating: formData.rating,
        text: formData.text,
        date: new Date().toLocaleDateString(),
      };

      setReviews([newReview, ...reviews]);

      setFormData({
        name: "",
        rating: 5,
        text: "",
      });
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-white to-[#ff6600] pt-40 pb-15 px-4 relative overflow-hidden">
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

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-[#222] mb-4 tracking-tight">
            Оставьте Отзыв Нашему Сайту
          </h2>
          <p className="text-[#222] text-xl">
            Поделитесь своим мнением и помогите нам стать лучше!
          </p>
        </div>

        <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12 mb-12">
          <div className="space-y-6">
            <div className="relative group">
              <label className="text-gray-700 font-medium mb-2 block text-xl">
                Ваше имя
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-6 w-6 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Введите ваше имя"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-xl py-4 pl-12 pr-4 text-black text-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-600 font-medium mb-2 block text-xl">
                Ваша оценка
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    className="transition-transform duration-200 hover:scale-125"
                  >
                    <Star
                      className={`w-10 h-10 transition-all duration-200 ${
                        star <= (hoveredStar || formData.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-400"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-gray-600 font-medium mb-2 block text-xl">
                Ваш отзыв
              </label>
              <textarea
                name="text"
                placeholder="Расскажите о вашем опыте..."
                value={formData.text}
                onChange={handleInputChange}
                rows={5}
                className="w-full bg-white/10 border border-white/20 rounded-xl py-4 px-4 text-black text-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 rounded-xl transition-all duration-700 transform hover:scale-101 hover:shadow-2xl flex items-center justify-center gap-2 text-xl"
            >
              <Send className="w-6 h-6" />
              Отправить отзыв
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-3xl font-bold text-gray-600 mb-6">
            Все отзывы ({reviews.length})
          </h3>

          {reviews.map((review) => (
            <div
              key={review.id}
              className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-lg border border-white/20 p-6 transition-all duration-300 hover:bg-white/15 hover:scale-102"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    {review.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-black font-semibold text-lg">
                      {review.name}
                    </h4>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-400"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-gray-800 text-xl">{review.date}</span>
              </div>
              <p className="text-black leading-relaxed">{review.text}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-lg border border-white/20 p-6 text-center">
            <div className="text-4xl font-bold text-white mb-2">
              {(
                reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
              ).toFixed(1)}
            </div>
            <div className="text-purple-600 text-xl">Средний рейтинг</div>
          </div>
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-lg border border-white/20 p-6 text-center">
            <div className="text-4xl font-bold text-white mb-2">
              {reviews.length}
            </div>
            <div className="text-purple-600 text-xl">Всего отзывов</div>
          </div>
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-lg border border-white/20 p-6 text-center">
            <div className="text-4xl font-bold text-white mb-2">
              {reviews.filter((r) => r.rating >= 4).length}
            </div>
            <div className="text-purple-600 text-xl">Положительных</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Review;
