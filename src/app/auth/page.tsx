"use client";

import { useState } from "react";
import Link from "next/link";
import { PAGES } from "@/config/pages.config";
import { ThemeToggle } from "@/components/UI/ThemeToggle";
import { SignInForm } from "../../services/SignInForm";
import { SignUpForm } from "../../services/SignUpForm";

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
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/Auth.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 w-full max-w-212.5 p-8">
        <div 
          style={{
            borderRadius: '100px',
            transition: 'border-radius 700ms ease-in-out',
          }}
          className="relative h-137.5 bg-(--card-bg)/90 backdrop-blur-sm shadow-2xl overflow-hidden flex border border-(--border)"
        >
          <div className="absolute top-0 left-0 w-1/2 h-full flex flex-col items-center justify-center px-12">
            <SignInForm onSubmit={handleLogin} autoFocus={isLogin} />
          </div>

          <div className="absolute top-0 right-0 w-1/2 h-full flex flex-col items-center justify-center px-12">
            <SignUpForm onSubmit={handleRegister} />
          </div>

          <div 
            style={{
              transform: isLogin ? 'translateX(0%)' : 'translateX(100%)',
              borderRadius: isLogin ? '100px 0 0 100px' : '0 100px 100px 0',
              transition: 'all 700ms ease-in-out',
            }}
            className="absolute top-0 left-0 w-1/2 h-full z-20 bg-linear-to-br from-(--primary) to-(--secondary) flex flex-col items-center justify-center px-12 text-center"
          >
            {isLogin ? (
              <div>
                <h2 className="text-4xl font-bold mb-4 text-white">Привет, друг!</h2>
                <p className="mb-8 text-white/80">Введите свои личные данные и начните путешествие с нами</p>
                <button
                  onClick={() => setIsLogin(false)}
                  className="px-10 py-3 border-2 border-white rounded-xl font-bold hover:bg-white hover:text-(--primary) transition-all text-white"
                >
                  Регистрация
                </button>
              </div>
            ) : (
              <div>
                <h2 className="text-4xl font-bold mb-4 text-white">С возвращением!</h2>
                <p className="mb-8 text-white/80">Чтобы оставаться на связи с нами, пожалуйста, войдите под своей учетной записью</p>
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