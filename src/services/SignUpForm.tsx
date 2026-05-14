"use client";

import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, Check, X } from "lucide-react";
import React from "react";

interface SignUpFormProps {
  onSubmit: (data: { name: string; email: string; password: string; passwordConfirm: string }) => void;
  onSwitchToLogin?: () => void;
  disabled?: boolean;
}

interface SignUpFormPropsExt extends SignUpFormProps {
  autoFocus?: boolean;
}

export function SignUpForm({ onSubmit, autoFocus, onSwitchToLogin, disabled }: SignUpFormPropsExt) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const passwordRequirements = [
    { met: password.length >= 8, text: "Минимум 8 символов" },
    { met: /[A-Z]/.test(password), text: "Заглавная буква" },
    { met: /[a-z]/.test(password), text: "Строчная буква" },
    { met: /[0-9]/.test(password), text: "Цифра" },
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-1">
        <label className="text-sm text-(--text-secondary)">Имя</label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-secondary)" size={18} />
          <input
            ref={nameRef}
            type="text"
            placeholder="Ваше имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full pl-10 pr-4 py-4 rounded-xl bg-(--background) border border-(--border) text-(--text-primary) placeholder:text-(--text-secondary)/50 focus:outline-none focus:border-(--accent) transition-colors text-base"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-(--text-secondary)">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-secondary)" size={18} />
          <input
            type="email"
            placeholder="example@mail.ru"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-4 rounded-xl bg-(--background) border border-(--border) text-(--text-primary) placeholder:text-(--text-secondary)/50 focus:outline-none focus:border-(--accent) transition-colors text-base"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-(--text-secondary)">Пароль</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-secondary)" size={18} />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-12 py-4 rounded-xl bg-(--background) border border-(--border) text-(--text-primary) placeholder:text-(--text-secondary)/50 focus:outline-none focus:border-(--accent) transition-colors text-base"
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
          <p className="text-xs text-(--text-secondary) mb-2">Требования к паролю:</p>
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
        <label className="text-sm text-(--text-secondary)">Подтверждение пароля</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-secondary)" size={18} />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="w-full pl-10 pr-4 py-4 rounded-xl bg-(--background) border border-(--border) text-(--text-primary) placeholder:text-(--text-secondary)/50 focus:outline-none focus:border-(--accent) transition-colors text-base"
            required
          />
        </div>
        {passwordConfirm.length > 0 && password !== passwordConfirm && (
          <p className="text-xs text-red-500 mt-1">Пароли не совпадают</p>
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
          Я согласен с{" "}
          <a href="#" className="text-(--accent) hover:underline">правилами</a> и{" "}
          <a href="#" className="text-(--accent) hover:underline">политикой конфиденциальности</a>
        </span>
      </label>

      <button
        type="submit"
        disabled={!agreedToTerms || disabled}
        className="w-full py-4 rounded-xl bg-(--accent) text-(--background) font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed text-base"
      >
        {disabled ? "Загрузка..." : "Зарегистрироваться"}
      </button>
    </form>
  );
}
