"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { SignInForm } from "../../services/SignInForm";
import { SignUpForm } from "../../services/SignUpForm";
import { AuthSwitcher } from "@/components/Auth/AuthSwitcher";

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
    <div className="flex min-h-screen w-full relative bg-linear-to-br from-(--primary) via-(--accent) to-(--secondary)">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="w-full h-full bg-[url('/auth-texture.svg')] bg-repeat opacity-100" />
      </div>
      <div className="hidden md:block absolute top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
        <AuthSwitcher isLogin={isLogin} setIsLogin={setIsLogin} />
      </div>
      <div className="flex w-full md:w-1/2 items-stretch justify-center p-6 md:p-12 h-full md:h-screen">
        <div className="w-full h-full flex flex-col justify-center">
          <div className="mb-6 block md:hidden px-4">
            <AuthSwitcher isLogin={isLogin} setIsLogin={setIsLogin} />
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              className="h-full flex items-center justify-center"
              key={isLogin ? "left-login" : "left-image"}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={reduce ? { duration: 0 } : { duration: 0.35 }}
            >
              {isLogin ? (
                <SignInForm onSubmit={handleLogin} autoFocus={isLogin} />
              ) : (
                <>
                  <div className="w-full block md:hidden">
                    <SignUpForm onSubmit={handleRegister} autoFocus={!isLogin} />
                  </div>
                  <div className="hidden md:block relative w-full h-full rounded-2xl overflow-hidden">
                    <Image
                      src="/login.png"
                      alt="login"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      priority={false}
                    />
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="hidden md:flex md:w-1/2 items-stretch justify-center p-6 md:p-12 h-full md:h-screen">
        <div className="w-full h-full flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              className="h-full flex items-center justify-center"
              key={isLogin ? "right-image" : "right-register"}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={reduce ? { duration: 0 } : { duration: 0.35 }}
            >
              {isLogin ? (
                <div className="relative w-full h-full rounded-3xl overflow-hidden">
                  <Image
                    src="/reg.png"
                    alt="reg"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority={false}
                    loading="eager"
                  />
                </div>
              ) : (
                <SignUpForm onSubmit={handleRegister} autoFocus={!isLogin} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
