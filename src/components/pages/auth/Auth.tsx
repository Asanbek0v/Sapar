"use client";

import { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[#ff6600] flex items-center justify-center p-10 relative overflow-hidden pt-30">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="text-center pt-12 pb-8 px-8">
            <h1 className="text-4xl font-normal text-black mb-2 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-black text-md	">
              Hey <span className="text-purple-400 font-semibold">Buddy</span>,
              Please Enter Your Details
            </p>
          </div>

          <div className="flex gap-4 px-8 mb-8">
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-3 rounded-xl font-medium transition-all duration-300 ${
                !isSignUp
                  ? "bg-white/50 text-[#ff6500] shadow-lg scale-105"
                  : "bg-white/5 text-black hover:bg-white/10"
              }`}
            >
              SIGN IN
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-3 rounded-xl font-medium transition-all duration-300 ${
                isSignUp
                  ? "bg-white/50 text-[#ff6500] shadow-lg scale-105"
                  : "bg-white/5 text-black hover:bg-white/10"
              }`}
            >
              SIGN UP
            </button>
          </div>

          <div className="px-8 pb-8 space-y-5">
            <div
              className={`transition-all duration-500 overflow-hidden ${
                isSignUp ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-[#ff6500] group-focus-within:text-[#7b2ff7] transition-colors" />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-[#ff6500] group-focus-within:text-purple-400 transition-colors" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-white/20 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              />
              {formData.email && (
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-[#ff6500] group-focus-within:text-purple-400 transition-colors" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-white/20 rounded-xl py-4 pl-12 pr-24 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-white transition-colors focus-within:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-purple-500" />
                  ) : (
                    <Eye className="w-5 h-5 text-purple-500" />
                  )}
                </button>
                {formData.password && (
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            <div
              className={`transition-all duration-500 overflow-hidden ${
                !isSignUp ? "max-h-10 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="flex justify-end">
                <a
                  href="#"
                  className="text-xl text-white hover:text-purple-300 transition-colors"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full uppercase bg-white hover:bg-gray-100 text-gray-600 font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-103 hover:shadow-xl mt-5"
            >
              Continue
            </button>

            <div className="relative my-4">
              <div className="relative flex justify-center">
                <span className="uppercase px-4 bg-transparent text-gray-600">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl py-3 flex items-center justify-center transition-all duration-300 transform hover:scale-105"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path
                    fill="#fff"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#fff"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#fff"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#fff"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl py-3 flex items-center justify-center transition-all duration-300 transform hover:scale-105"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
              <button
                type="button"
                className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl py-3 flex items-center justify-center transition-all duration-300 transform hover:scale-105"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
