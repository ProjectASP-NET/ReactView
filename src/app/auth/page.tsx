"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    <div className="w-full max-w-md p-6">
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setIsLogin(true)}
          className={`flex-1 py-2 rounded-lg transition-colors ${
            isLogin
              ? "bg-(--text-primary) text-(--background)"
              : "bg-(--background) text-(--text-primary)"
          }`}
        >
          Вход
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={`flex-1 py-2 rounded-lg transition-colors ${
            !isLogin
              ? "bg-(--text-primary) text-(--background)"
              : "bg-(--background) text-(--text-primary)"
          }`}
        >
          Регистрация
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={isLogin ? "login" : "register"}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.2 }}
        >
          {isLogin ? (
            <SignInForm onSubmit={handleLogin} />
          ) : (
            <SignUpForm onSubmit={handleRegister} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
