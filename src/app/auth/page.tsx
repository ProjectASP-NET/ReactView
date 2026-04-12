"use client";

import { useState } from "react";
import Link from "next/link";
import { PAGES } from "@/config/pages.config";
import { ThemeToggle } from "@/components/UI/ThemeToggle";
import { SignInForm } from "../../services/SignInForm";
import { SignUpForm } from "../../services/SignUpForm";
import { ArrowLeft } from "lucide-react";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

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
    <div className="flex min-h-screen w-full relative items-center justify-center bg-[url('/banner.png')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/60" />
      
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

      <div className="relative z-10 w-full max-w-md px-4 py-8">
        <div className="bg-(--card-bg)/95 backdrop-blur-sm rounded-2xl md:rounded-3xl border border-(--border) p-6 md:p-8 shadow-2xl">
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

          <div className="min-h-[300px]">
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
    </div>
  );
}