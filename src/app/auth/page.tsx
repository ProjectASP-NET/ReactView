"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { PAGES } from "@/config/pages.config";
import { SignInForm } from "../../services/SignInForm";
import { SignUpForm } from "../../services/SignUpForm";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const reduce = useReducedMotion();

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
    <div className="flex min-h-screen w-full relative items-center justify-center bg-(--background) p-4">
      <div className="relative w-full max-w-[850px] h-[550px] bg-(--card-bg) rounded-3xl shadow-2xl overflow-hidden flex border border-(--border)">
        {/* Нижний слой: Формы */}
        
        {/* Форма Входа (слева) - показывается когда панель справа (isLogin=true) */}
        <div className={`absolute top-0 left-0 w-1/2 h-full flex flex-col items-center justify-center px-12 transition-opacity duration-500 ${isLogin ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <SignInForm onSubmit={handleLogin} autoFocus={isLogin} />
        </div>

        {/* Форма Регистрации (справа) - показывается когда панель слева (isLogin=false) */}
        <div className={`absolute top-0 right-0 w-1/2 h-full flex flex-col items-center justify-center px-12 transition-opacity duration-500 ${isLogin ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <SignUpForm onSubmit={handleRegister} />
        </div>

        {/* Верхний слой: Плавающая панель с анимацией */}
        <motion.div
          className={`absolute top-0 left-0 w-1/2 h-full z-10 bg-gradient-to-br from-(--primary) to-(--secondary) flex flex-col items-center justify-center px-12 text-center ${
            isLogin ? 'rounded-l-[100px]' : 'rounded-r-[100px]'
          }`}
          animate={{
            x: isLogin ? '100%' : '0%',
            borderRadius: isLogin ? '36px 0 0 36px' : '0 36px 36px 0',
          }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            mass: 1,
          }}
        >
          {isLogin ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-4xl font-bold mb-4 text-white">Привет, друг!</h2>
              <p className="mb-8 text-white/80">Введите свои личные данные и начните путешествие с нами</p>
              <button
                onClick={() => setIsLogin(false)}
                className="px-10 py-3 border-2 border-white rounded-xl font-bold hover:bg-white hover:text-(--primary) transition-all text-white"
              >
                Регистрация
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-4xl font-bold mb-4 text-white">С возвращением!</h2>
              <p className="mb-8 text-white/80">Чтобы оставаться на связи с нами, пожалуйста, войдите под своей учетной записью</p>
              <button
                onClick={() => setIsLogin(true)}
                className="px-10 py-3 border-2 border-white rounded-xl font-bold hover:bg-white hover:text-(--primary) transition-all text-white"
              >
                Войти
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Ссылка на главную */}
      <Link 
        href={PAGES.CATALOG} 
        className="absolute top-6 left-6 text-(--text-secondary) hover:text-(--text-primary) transition-colors"
      >
        ← На главную
      </Link>
    </div>
  );
}