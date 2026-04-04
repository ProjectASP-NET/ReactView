"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { PAGES } from "@/config/pages.config";
import { Sparkles, Droplets, ArrowRight } from "lucide-react";

interface Props {
  isLogin: boolean;
}

export function AuthSidePanel({ isLogin }: Props) {
  const shouldReduce = useReducedMotion();

  const motionProps = shouldReduce
    ? { initial: {}, animate: {}, exit: {}, transition: { duration: 0 } }
    : undefined;

  return (
    <div className="hidden md:flex md:w-1/2 relative overflow-hidden">
      <motion.div
        key={isLogin ? "login-image" : "register-image"}
        initial={motionProps?.initial ?? { opacity: 0, scale: 1.1 }}
        animate={motionProps?.animate ?? { opacity: 1, scale: 1 }}
        exit={motionProps?.exit ?? { opacity: 0, scale: 0.9 }}
        transition={motionProps?.transition ?? { duration: 0.5 }}
        className="absolute inset-0 w-full h-full"
      >
        <div className="absolute inset-0 bg-linear-to-br from-(--primary) via-(--accent) to-(--secondary)" />

        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
          <motion.div
            initial={motionProps?.initial ?? { scale: 0, rotate: -180 }}
            animate={motionProps?.animate ?? { scale: 1, rotate: 0 }}
            transition={motionProps?.transition ?? { duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="w-24 h-24 rounded-3xl bg-(--background)/20 backdrop-blur-sm flex items-center justify-center">
              <Droplets size={48} className="text-(--background)" />
            </div>
          </motion.div>

          <motion.h2
            initial={motionProps?.initial ?? { opacity: 0, y: 20 }}
            animate={motionProps?.animate ?? { opacity: 1, y: 0 }}
            transition={motionProps?.transition ?? { duration: 0.5, delay: 0.4 }}
            className="text-4xl font-bold text-(--background) mb-4"
          >
            {isLogin ? "С возвращением!" : "Присоединяйся!"}
          </motion.h2>

          <motion.p
            initial={motionProps?.initial ?? { opacity: 0, y: 20 }}
            animate={motionProps?.animate ?? { opacity: 1, y: 0 }}
            transition={motionProps?.transition ?? { duration: 0.5, delay: 0.5 }}
            className="text-lg text-(--background)/80 mb-8 max-w-md"
          >
            {isLogin
              ? "Войдите в свой аккаунт, чтобы получить доступ к эксклюзивным предложениям и истории заказов"
              : "Создайте аккаунт и откройте для себя мир качественных жидкостей для вейпов"}
          </motion.p>

          <motion.div
            initial={motionProps?.initial ?? { opacity: 0, y: 20 }}
            animate={motionProps?.animate ?? { opacity: 1, y: 0 }}
            transition={motionProps?.transition ?? { duration: 0.5, delay: 0.6 }}
            className="flex items-center gap-2 text-(--background)/60"
          >
            <Sparkles size={16} />
            <span className="text-sm">Премиальное качество</span>
            <span className="mx-2">•</span>
            <span className="text-sm">Более 1000 вкусов</span>
            <span className="mx-2">•</span>
            <span className="text-sm">Быстрая доставка</span>
          </motion.div>

          <Link
            href={PAGES.CATALOG}
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-(--background) text-(--accent) font-medium hover:gap-4 transition-all"
            aria-label="Перейти в каталог"
          >
            <span>Перейти в каталог</span>
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-(--background)/10 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-(--background)/10 to-transparent" />
      </motion.div>
    </div>
  );
}
