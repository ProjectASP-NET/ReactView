"use client";

import { useState } from "react";

interface SignUpFormProps {
  onSubmit: (data: { name: string; email: string; password: string; passwordConfirm: string }) => void;
}

export function SignUpForm({ onSubmit }: SignUpFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, password, passwordConfirm });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <h1>Регистрация на сайте</h1>
      <input
        type="text"
        placeholder="Имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Подтвердите пароль"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />
      <button type="submit">Зарегистрироваться</button>
    </form>
  );
}
