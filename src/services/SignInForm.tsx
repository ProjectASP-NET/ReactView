"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import React from "react";

interface SignInFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
}

interface SignInFormPropsExt extends SignInFormProps {
  autoFocus?: boolean;
}

export function SignInForm({ onSubmit, autoFocus }: SignInFormPropsExt) {
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
      <div className="text-center mb-2">
        <h2 className="text-xl md:text-2xl font-bold text-(--text-primary)">С возвращением</h2>
        <p className="text-(--text-secondary) text-sm mt-1">Рады видеть вас снова</p>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-(--text-secondary)">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-secondary)" size={18} />
          <input
            ref={emailRef}
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

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded border-(--border) bg-(--background) accent-(--accent)"
          />
          <span className="text-(--text-secondary)">Запомнить меня</span>
        </label>
        <a href="#" className="text-(--accent) hover:underline">Забыли пароль?</a>
      </div>

      <button
        type="submit"
        className="w-full py-4 rounded-xl bg-(--accent) text-(--background) font-semibold hover:opacity-90 transition-opacity text-base"
      >
        Войти
      </button>
    </form>
  );
}
