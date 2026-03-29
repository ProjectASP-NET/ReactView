"use client";

import { useState } from "react";
import Image from "next/image";

export default function AgeModal() {
  const [showModal, setShowModal] = useState(() => {
    if (typeof window !== "undefined") {
      return !localStorage.getItem("age_verified");
    }
    return false;
  });
  const [error, setError] = useState(false);
  const handleConfirm = () => {
    localStorage.setItem("age_verified", "true");
    setShowModal(false);
  };

  const handleDecline = () => {
    setError(true);
  };

  if (showModal === null || showModal === false) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xl transition-all">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--section-bg)] p-8 text-center shadow-2xl">
        <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-[var(--text-muted)]/5 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-[var(--text-muted)]/5 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-[var(--card-bg)] p-3 ring-1 ring-[var(--border)]">
            <Image
              src="/logo1.png"
              alt="D&D Liquid Logo"
              width={60}
              height={60}
              className="object-contain brightness-110 grayscale"
            />
          </div>

          <h2 className="mb-2 text-3xl font-black tracking-tight text-[var(--text-primary)] uppercase">
            Вам есть 18 лет?
          </h2>
          <p className="mb-8 text-sm font-light leading-relaxed text-[var(--text-secondary)]">
            Доступ к сайту <b>D&D Liquid</b> разрешен только совершеннолетним. 
            Продукция содержит никотин, который вызывает привыкание.
          </p>
          {error && (
            <p className="mb-6 text-sm font-bold text-red-500 animate-pulse">
              Извините, доступ на сайт закрыт.
            </p>
          )}

          <div className="flex w-full flex-col gap-3">
            <button
              onClick={handleConfirm}
              className="w-full rounded-xl bg-[var(--text-primary)] py-4 text-sm font-bold tracking-wider text-[var(--background)] transition-transform hover:scale-[1.02] active:scale-95"
            >
              ДА, МНЕ ЕСТЬ 18
            </button>
            <button
              onClick={handleDecline}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--card-bg)] py-4 text-sm font-bold tracking-wider text-[var(--text-primary)] transition-colors hover:bg-[var(--card-hover)] active:scale-95"
            >
              НЕТ, МНЕ МЕНЬШЕ 18
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
