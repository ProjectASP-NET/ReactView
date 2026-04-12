"use client";

import { useState } from "react";
import Link from "next/link";
import { PAGES } from "@/config/pages.config";
import { ThemeToggle } from "@/components/UI/ThemeToggle";
import { SignInForm } from "../../services/SignInForm";
import { SignUpForm } from "../../services/SignUpForm";
import FadeIn from "@/components/UI/FadeIn";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = (data: { email: string; password: string }) => {
    console.log("Login:", data);
  };

  const handleRegister = (data: {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
  }) => {
    console.log("Register:", data);
  };

  return (
    <div className="flex min-h-screen w-full relative items-center justify-center">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover hidden md:block"
      >
        <source src="/Auth.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/90 md:hidden" />
      <div className="relative z-10 w-full max-w-212.5 px-4 md:p-8">
        <div 
          style={{
            borderRadius: '24px',
            transition: 'border-radius 700ms ease-in-out',
          }}
          className="relative min-h-[500px] md:min-h-[550px] bg-(--card-bg)/90 backdrop-blur-sm shadow-2xl overflow-hidden flex flex-col md:flex-row border border-(--border)"
        >
          <div className="absolute top-0 left-0 w-full md:w-1/2 h-full flex flex-col items-center justify-center px-6 md:px-12 py-8 md:py-0">
            <SignInForm onSubmit={handleLogin} autoFocus={isLogin} />
          </div>

          <div className="absolute top-0 right-0 w-full md:w-1/2 h-full flex flex-col items-center justify-center px-6 md:px-12 py-8 md:py-0">
            <SignUpForm onSubmit={handleRegister} />
          </div>

          <div 
            style={{
              transform: isLogin ? 'translateX(0%)' : 'translateX(100%)',
              borderRadius: isLogin ? '24px 0 0 24px' : '0 24px 24px 0',
              transition: 'all 700ms ease-in-out',
            }}
            className="absolute top-0 left-0 w-full md:w-1/2 h-full z-20 bg-linear-to-br from-(--primary) to-(--secondary) flex flex-col items-center justify-center px-6 md:px-12 py-8 md:py-0 text-center"
          >
            {isLogin ? (
              <div className="md:hidden px-6 py-4">
                <h2 className="text-2xl font-bold mb-3 text-white">Привет, друг!</h2>
                <p className="mb-6 text-white/80 text-sm">Введите свои личные данные и начните путешествие с нами</p>
              </div>
            ) : (
              <div className="md:hidden px-6 py-4">
                <h2 className="text-2xl font-bold mb-3 text-white">С возвращением!</h2>
                <p className="mb-6 text-white/80 text-sm">Чтобы оставаться на связи с нами, пожалуйста, войдите под своей учетной записью</p>
              </div>
            )}
            {isLogin ? (
              <div>
                <h2 className="hidden md:block text-4xl font-bold mb-4 text-white">Привет, друг!</h2>
                <p className="hidden md:block mb-8 text-white/80">Введите свои личные данные и начните путешествие с нами</p>
                <button
                  onClick={() => setIsLogin(false)}
                  className="px-10 py-3 border-2 border-white rounded-xl font-bold hover:bg-white hover:text-(--primary) transition-all text-white"
                >
                  Регистрация
                </button>
              </div>
            ) : (
              <div>
                <h2 className="hidden md:block text-4xl font-bold mb-4 text-white">С возвращением!</h2>
                <p className="hidden md:block mb-8 text-white/80">Чтобы оставаться на связи с нами, пожалуйста, войдите под своей учетной записью</p>
                <button
                  onClick={() => setIsLogin(true)}
                  className="px-10 py-3 border-2 border-white rounded-xl font-bold hover:bg-white hover:text-(--primary) transition-all text-white"
                >
                  Войти
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Link 
        href={PAGES.CATALOG} 
        className="absolute top-6 left-6 z-50 text-white/80 hover:text-white transition-colors"
      >
        ← На главную
      </Link>

      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>
    </div>
  );
}