"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import React from "react";

interface SignInFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
}

interface SignInFormPropsExt extends SignInFormProps {
  autoFocus?: boolean;
}

export function SignInForm({ onSubmit, autoFocus }: SignInFormPropsExt) {
  const t = useTranslations("Auth");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password });
  };
  const emailRef = React.useRef<HTMLInputElement | null>(null);
  React.useEffect(() => {
    if (autoFocus && emailRef.current) {
      emailRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold text-(--text-primary)">{t("welcomeBack")}</h2>
        <p className="text-(--text-secondary) text-sm mt-1">{t("welcomeSubtitle")}</p>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-(--text-secondary)">{t("email")}</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-secondary)" size={18} />
          <input
            ref={emailRef}
            type="email"
            placeholder={t("emailPlaceholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-(--background) border border-(--border) text-(--text-primary) placeholder:text-(--text-secondary)/50 focus:outline-none focus:border-(--accent) transition-colors"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-(--text-secondary)">{t("password")}</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-secondary)" size={18} />
          <input
            type={showPassword ? "text" : "password"}
            placeholder={t("passwordPlaceholder")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-12 py-3 rounded-lg bg-(--background) border border-(--border) text-(--text-primary) placeholder:text-(--text-secondary)/50 focus:outline-none focus:border-(--accent) transition-colors"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-(--text-secondary) hover:text-(--text-primary) transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded border-(--border) bg-(--background) accent-(--accent)"
          />
          <span className="text-(--text-secondary)">{t("rememberMe")}</span>
        </label>
        <a href="#" className="text-(--accent) hover:underline">{t("forgotPassword")}</a>
      </div>

      <button
        type="submit"
        className="w-full py-3 rounded-lg bg-(--accent) text-(--background) font-semibold hover:opacity-90 transition-opacity"
      >
        {t("submitLogin")}
      </button>
    </form>
  );
}
