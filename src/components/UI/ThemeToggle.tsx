"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--card-bg) border border-(--border) transition-all hover:border-(--text-secondary)"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun size={20} className="text-(--text-secondary)" />
      ) : (
        <Moon size={20} className="text-(--text-secondary)" />
      )}
    </button>
  );
}
