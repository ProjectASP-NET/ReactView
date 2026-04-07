"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { User, Mail, Lock, Eye, EyeOff, Check, X } from "lucide-react";
import React from "react";

interface SignUpFormProps {
  onSubmit: (data: { name: string; email: string; password: string; passwordConfirm: string }) => void;
}

interface SignUpFormPropsExt extends SignUpFormProps {
  autoFocus?: boolean;
}

export function SignUpForm({ onSubmit, autoFocus }: SignUpFormPropsExt) {
  const t = useTranslations("Auth");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const passwordRequirements = [
    { met: password.length >= 8, text: t("reqLength") },
    { met: /[A-Z]/.test(password), text: t("reqUppercase") },
    { met: /[a-z]/.test(password), text: t("reqLowercase") },
    { met: /[0-9]/.test(password), text: t("reqNumber") },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) return;
    onSubmit({ name, email, password, passwordConfirm });
  };

  const nameRef = React.useRef<HTMLInputElement | null>(null);
  React.useEffect(() => {
    if (autoFocus && nameRef.current) nameRef.current.focus();
  }, [autoFocus]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold text-(--text-primary)">{t("registerTitle")}</h2>
        <p className="text-(--text-secondary) text-sm mt-1">{t("registerSubtitle")}</p>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-(--text-secondary)">{t("name")}</label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-secondary)" size={18} />
          <input
            ref={nameRef}
            type="text"
            placeholder={t("namePlaceholder")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-(--background) border border-(--border) text-(--text-primary) placeholder:text-(--text-secondary)/50 focus:outline-none focus:border-(--accent) transition-colors"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-(--text-secondary)">{t("email")}</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-secondary)" size={18} />
          <input
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

      {password.length > 0 && (
        <div className="flex flex-col gap-1 p-3 rounded-lg bg-(--card-bg) border border-(--border)">
          <p className="text-xs text-(--text-secondary) mb-2">{t("passwordRequirements")}:</p>
          {passwordRequirements.map((req, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              {req.met ? (
                <Check size={14} className="text-green-500" />
              ) : (
                <X size={14} className="text-red-500" />
              )}
              <span className={req.met ? "text-green-500" : "text-(--text-secondary)"}>
                {req.text}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-1">
        <label className="text-sm text-(--text-secondary)">{t("confirmPassword")}</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-secondary)" size={18} />
          <input
            type={showPassword ? "text" : "password"}
            placeholder={t("passwordPlaceholder")}
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-(--background) border border-(--border) text-(--text-primary) placeholder:text-(--text-secondary)/50 focus:outline-none focus:border-(--accent) transition-colors"
            required
          />
        </div>
        {passwordConfirm.length > 0 && password !== passwordConfirm && (
          <p className="text-xs text-red-500 mt-1">{t("passwordMismatch")}</p>
        )}
      </div>

      <label className="flex items-start gap-2 cursor-pointer text-sm">
        <input
          type="checkbox"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e.target.checked)}
          className="w-4 h-4 mt-0.5 rounded border-(--border) bg-(--background) accent-(--accent)"
        />
        <span className="text-(--text-secondary)">
          {t("agreeTermsStart")}{" "}
          <a href="#" className="text-(--accent) hover:underline">{t("termsLink")}</a> {t("and")}{" "}
          <a href="#" className="text-(--accent) hover:underline">{t("privacyLink")}</a>
        </span>
      </label>

      <button
        type="submit"
        disabled={!agreedToTerms}
        className="w-full py-3 rounded-lg bg-(--accent) text-(--background) font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {t("submitRegister")}
      </button>

      <p className="text-center text-sm text-(--text-secondary)">
        {t("hasAccount")}{" "}
        <span className="text-(--accent) cursor-pointer hover:underline">
          {t("loginLink")}
        </span>
      </p>
    </form>
  );
}
