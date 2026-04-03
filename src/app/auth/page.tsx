"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SignInForm } from "../../services/SignInForm";
import { SignUpForm } from "../../services/SignUpForm";
import { Sparkles, Droplets, ArrowRight } from "lucide-react";

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
    <div className="flex min-h-screen w-full">
      <div className="flex w-full md:w-1/2 items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-lg transition-colors ${
                isLogin
                  ? "bg-(--text-primary) text-(--background)"
                  : "bg-transparent text-(--text-secondary) border border-(--border)"
              }`}
            >
              Вход
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-lg transition-colors ${
                !isLogin
                  ? "bg-(--text-primary) text-(--background)"
                  : "bg-transparent text-(--text-secondary) border border-(--border)"
              }`}
            >
              Регистрация
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login" : "register"}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              {isLogin ? (
                <SignInForm onSubmit={handleLogin} />
              ) : (
                <SignUpForm onSubmit={handleRegister} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="hidden md:flex md:w-1/2 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? "login-image" : "register-image"}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-full"
          >
            <div className="absolute inset-0 bg-linear-to-br from-(--primary) via-(--accent) to-(--secondary)" />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-8"
              >
                <div className="w-24 h-24 rounded-3xl bg-(--background)/20 backdrop-blur-sm flex items-center justify-center">
                  <Droplets size={48} className="text-(--background)" />
                </div>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-4xl font-bold text-(--background) mb-4"
              >
                {isLogin ? "С возвращением!" : "Присоединяйся!"}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-lg text-(--background)/80 mb-8 max-w-md"
              >
                {isLogin 
                  ? "Войдите в свой аккаунт, чтобы получить доступ к эксклюзивным предложениям и истории заказов"
                  : "Создайте аккаунт и откройте для себя мир качественных жидкостей для вейпов"
                }
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex items-center gap-2 text-(--background)/60"
              >
                <Sparkles size={16} />
                <span className="text-sm">Премиальное качество</span>
                <span className="mx-2">•</span>
                <span className="text-sm">Более 1000 вкусов</span>
                <span className="mx-2">•</span>
                <span className="text-sm">Быстрая доставка</span>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="mt-8 flex items-center gap-2 px-6 py-3 rounded-full bg-(--background) text-(--accent) font-medium hover:gap-4 transition-all"
              >
                <span>Перейти в каталог</span>
                <ArrowRight size={18} />
              </motion.button>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-(--background)/10 to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-(--background)/10 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
