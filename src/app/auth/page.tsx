"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PAGES } from "@/config/pages.config";
import { ThemeToggle } from "@/components/UI/ThemeToggle";
import { SignInForm } from "../../services/SignInForm";
import { SignUpForm } from "../../services/SignUpForm";
import { ArrowLeft } from "lucide-react";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [isDesktop, setIsDesktop] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

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
      {/* === MOBILE BACKGROUND (< 768px) === */}
      <div className="md:hidden absolute inset-0 bg-[url('/banner.png')] bg-cover bg-center" />
      <div className="md:hidden absolute inset-0 bg-black/60" />

      {/* === DESKTOP BACKGROUND (≥ 768px) === */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="hidden md:block absolute inset-0 w-full h-full object-cover"
      >
        <source src="/Auth.mp4" type="video/mp4" />
      </video>
      <div className="hidden md:block absolute inset-0 bg-black/60" />

      {/* === MOBILE HEADER (< 768px) === */}
      <div className="absolute top-4 left-4 z-50 md:hidden">
        <Link 
          href={PAGES.CATALOG} 
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Назад</span>
        </Link>
      </div>

      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* === MOBILE LAYOUT (< 768px) === */}
      <div className="md:hidden relative z-10 w-full max-w-md px-4 py-8">
        <div className="bg-(--card-bg)/95 backdrop-blur-sm rounded-2xl border border-(--border) p-6 shadow-2xl">
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-black text-(--text-primary) tracking-tight">
              D&D <span className="text-(--text-muted)">LIQUID</span>
            </h1>
            <p className="text-sm text-(--text-secondary) mt-2">
              {activeTab === "login" ? "С возвращением!" : "Присоединяйтесь к нам"}
            </p>
          </div>

          <div className="flex gap-2 p-1 rounded-xl bg-(--background) mb-6">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === "login"
                  ? "bg-(--card-bg) text-(--text-primary) shadow-sm"
                  : "text-(--text-secondary) hover:text-(--text-primary)"
              }`}
            >
              Вход
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === "register"
                  ? "bg-(--card-bg) text-(--text-primary) shadow-sm"
                  : "text-(--text-secondary) hover:text-(--text-primary)"
              }`}
            >
              Регистрация
            </button>
          </div>

          <div className="min-h-75">
            {activeTab === "login" ? (
              <SignInForm onSubmit={handleLogin} />
            ) : (
              <SignUpForm onSubmit={handleRegister} onSwitchToLogin={() => setActiveTab("login")} />
            )}
          </div>
        </div>

        <div className="text-center mt-6">
          <Link href={PAGES.CATALOG} className="text-sm text-(--text-secondary) hover:text-(--text-primary) transition-colors">
            ← Вернуться на главную
          </Link>
        </div>
      </div>

      {/* === DESKTOP LAYOUT (≥ 768px) === */}
      <div className="hidden md:block relative z-10 w-full max-w-212.5 p-8">
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

        <Link 
          href={PAGES.CATALOG} 
          className="absolute top-6 left-6 z-50 text-white/80 hover:text-white transition-colors"
        >
          ← На главную
        </Link>
      </div>
    </div>
  );
}