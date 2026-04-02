"use client";

import { useState, useRef, useEffect } from "react";
import { User, LogIn, LogOut, Star, Heart } from "lucide-react";
import Link from "next/link";

interface MenuItem {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  href: string;
}

const menuItems: MenuItem[] = [
  { icon: LogIn, label: "Вход / Регистрация", href: "#" },
  { icon: Star, label: "Избранное", href: "/favorites" },
  { icon: Heart, label: "Мои лайки", href: "/likes" },
  { icon: LogOut, label: "Выйти", href: "#" },
];

export function FloatingAuthButton() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="fixed bottom-6 right-6 z-90">
      {isOpen && (
        <div className="absolute bottom-16 right-0 mb-2 w-48 overflow-hidden rounded-xl border border-(--border) bg-(--card-bg) shadow-lg">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm text-(--text-secondary) transition-all duration-200 hover:bg-(--background) hover:text-(--text-primary) hover:pl-5"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-(--text-primary) text-(--background) shadow-lg transition-all hover:scale-110 hover:shadow-xl active:scale-95"
      >
        <User size={24} />
      </button>
    </div>
  );
}