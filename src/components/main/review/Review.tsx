import React from "react";

const Review = () => {
  return (
    <section id="Review" className="py-16 bg-[#F8F8F8] rounded-3xl">
      <div className="container mx-auto px-4">
        <h1 className="text-center text-3xl sm:text-4xl font-bold text-orange-500 mb-16">
          Отзывы от наших гостей
        </h1>

        <div className="grid p-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((card) => (
            <div
              key={card}
              className="bg-white rounded-3xl p-6 shadow-md border border-gray-200 flex flex-col hover:shadow-lg transition"
            >
              <div className="flex items-center mb-4 pl-6">
                <div className="w-10 h-10 flex items-center justify-center bg-purple-200 rounded-xl text-lg">
                  💬
                </div>
                <div className="ml-3 text-yellow-400  text-lg">★★★★★</div>
              </div>

              <div className="text-sm text-gray-900 space-y-3 leading-relaxed flex-1">
                <p>
                  Профессиональные гиды с глубоким пониманием местной культуры и
                  природы
                </p>
                <p>
                  Хорошо спланированные маршруты, включающие популярные места и
                  скрытые жемчужины
                </p>
                <p>Комфортное и надежное размещение и транспортировка</p>
              </div>

              <div className="mt-4 text-xs text-gray-500">
                Сводка, созданная ИИ
                <br />
                На основе 33 отзывов о Tripadvisor
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center mt-14 gap-6">
          <button className="px-8 py-2 rounded-2xl border-2 border-orange-500 text-orange-500 text-lg font-semibold hover:bg-orange-500 hover:text-white transition">
            Оставить свой отзыв
          </button>
        </div>
      </div>
    </section>
  );
};

export default Review;
