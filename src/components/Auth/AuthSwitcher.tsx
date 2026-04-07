"use client";

import React from "react";
import { useTranslations } from "next-intl";

interface Props {
  isLogin: boolean;
  setIsLogin: (v: boolean) => void;
}

export function AuthSwitcher({ isLogin, setIsLogin }: Props) {
  const t = useTranslations("Auth");

  return (
    <div className="mx-auto max-w-md px-1">
      <div className="bg-(--card-bg)/80 backdrop-blur-sm shadow-md rounded-xl p-1">
        <div className="flex gap-2 mb-0">
          <button
            onClick={() => setIsLogin(true)}
            aria-pressed={isLogin}
            className={`flex-1 py-2 rounded-lg transition-colors ${
              isLogin
                ? "bg-(--text-primary) text-(--background)"
                : "bg-transparent text-(--text-secondary) border border-(--border)"
            }`}
          >
            {t("loginTab")}
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-lg transition-colors ${
              !isLogin
                ? "bg-(--text-primary) text-(--background)"
                : "bg-transparent text-(--text-secondary) border border-(--border)"
            }`}
          >
            {t("registerTab")}
          </button>
        </div>
      </div>
    </div>
  );
}
