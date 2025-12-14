"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const NotFound = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const router = useRouter();

  const handleGoHome = () => {
    router.push("/");
  };

  const handleGoBack = () => {
    router.back();
  };

  useEffect(() => {
    const handleMouseMove = (e: any) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 rounded-full opacity-10 transition-all duration-1000 ease-out"
          style={{
            background: "radial-gradient(circle, #ff4500 0%, transparent 70%)",
            left: `${mousePos.x}%`,
            top: `${mousePos.y}%`,
            transform: "translate(-50%, -50%)",
            filter: "blur(80px)",
          }}
        />

        <div
          className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-20"
          style={{ animation: "slideRight 8s ease-in-out infinite" }}
        ></div>
        <div
          className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-20"
          style={{ animation: "slideLeft 10s ease-in-out infinite" }}
        ></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-16">
            <div className="relative inline-block">
              <h1
                className="text-[10rem] md:text-[16rem] font-black leading-none tracking-tighter"
                style={{
                  background:
                    "linear-gradient(135deg, #ff6b35 0%, #ff4500 50%, #dc2626 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "gradientShift 3s ease-in-out infinite",
                }}
              >
                404
              </h1>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div
                  className="w-48 h-48 md:w-72 md:h-72 border-2 border-orange-500 rounded-full opacity-20"
                  style={{ animation: "rotateScale 6s ease-in-out infinite" }}
                ></div>
              </div>
            </div>
          </div>

          <div
            className="flex flex-col items-center text-center mb-20 space-y-6"
            style={{ animation: "fadeInUp 1s ease-out 0.3s backwards" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Страница не найдена
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto py-4">
              Эта страница потерялась. Вернитесь на главную или попробуйте
              поиск.
            </p>
          </div>

          <div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center py-6"
            style={{ animation: "fadeInUp 1s ease-out 0.7s backwards" }}
          >
            <button
              className="group relative px-12 py-3 font-bold text-lg text-white rounded-full overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-xl"
              style={{
                background:
                  "linear-gradient(135deg, #ff6b35 0%, #ff4500 50%, #dc2626 100%)",
                boxShadow: "0 10px 30px rgba(255, 69, 0, 0.3)",
              }}
              onClick={handleGoHome}
            >
              <span className="relative flex items-center gap-3 z-10">
                <svg
                  className="w-6 h-6 transition-transform duration-500 group-hover:rotate-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                На главную
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            </button>

            <button
              className="group px-12 py-3 font-bold text-lg rounded-full border-2 transition-all duration-500 hover:scale-105"
              style={{
                borderColor: "#ff4500",
                color: "#ff4500",
              }}
              onClick={handleGoBack}
            >
              <span className="flex items-center gap-3">
                <svg
                  className="w-6 h-6 transition-transform duration-500 group-hover:-translate-x-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Назад
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* SVG Definitions */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff6b35" />
            <stop offset="50%" stopColor="#ff4500" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
        </defs>
      </svg>

      <style jsx>{`
        @keyframes slideRight {
          0%,
          100% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 0.2;
          }
        }
        @keyframes slideLeft {
          0%,
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
          50% {
            opacity: 0.2;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes rotateScale {
          0%,
          100% {
            transform: translate(-50%, -50%) rotate(0deg) scale(1);
          }
          50% {
            transform: translate(-50%, -50%) rotate(180deg) scale(1.1);
          }
        }
        @keyframes gradientShift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </div>
  );
};

export default NotFound;
