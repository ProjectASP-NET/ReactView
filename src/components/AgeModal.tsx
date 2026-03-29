"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function AgeModal() {
  const [showModal, setShowModal] = useState<boolean | "declined">(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const verified = localStorage.getItem("age_verified");
    if (!verified) setShowModal(true);
  }, []);

  const handleConfirm = () => {
    localStorage.setItem("age_verified", "true");
    setShowModal(false);
  };

  const handleDecline = () => {
    setShowModal("declined");
  };

  if (!mounted) return null;
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xl">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[--border] bg-[--section-bg] p-8 text-center shadow-2xl">
        <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-[--text-muted]/5 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-[--text-muted]/5 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-[--card-bg] p-3 ring-1 ring-[--border]">
            <Image
              src="/logo1.png"
              alt="D&D Liquid Logo"
              width={60}
              height={60}
              className="object-contain brightness-110 grayscale"
            />
          </div>

          <h2 className="mb-2 text-3xl font-black tracking-tight text-[--text-primary] uppercase">
            Вам есть 18 лет?
          </h2>
          <p className="mb-8 text-sm font-light leading-relaxed text-[--text-secondary]">
            Доступ к сайту <b>D&D Liquid</b> разрешен только совершеннолетним. 
            Продукция содержит никотин, который вызывает привыкание.
          </p>
          {showModal === "declined" && (
            <p className="mb-6 text-sm font-bold text-red-500 animate-pulse">
              Извините, доступ на сайт закрыт.
            </p>
          )}

          <div className="flex w-full flex-col gap-3">
            <button
              onClick={handleConfirm}
              className="w-full rounded-xl bg-[--text-primary] py-4 text-sm font-bold tracking-wider text-[--background] transition-transform hover:scale-[1.02] active:scale-95"
            >
              ДА, МНЕ ЕСТЬ 18
            </button>
            <button
              onClick={handleDecline}
              className="w-full rounded-xl border border-[--border] bg-[--card-bg] py-4 text-sm font-bold tracking-wider text-[--text-primary] transition-colors hover:bg-[--card-hover] active:scale-95"
            >
              НЕТ, МНЕ МЕНЬШЕ 18
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
