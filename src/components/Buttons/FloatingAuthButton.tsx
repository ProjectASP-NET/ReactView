"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, LogIn, LogOut, Star, Heart, Shield } from "lucide-react";
import { Link } from 'next-view-transitions';
import { useUser } from "@/context/UserContext";
import { PAGES } from "@/config/pages.config";

interface MenuItem {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  href: string;
  onClick?: () => void;
  adminOnly?: boolean;
}

const loggedInMenuItems: MenuItem[] = [
  { icon: User, label: "Профиль", href: PAGES.USERPROFILE },
  { icon: Star, label: "Избранное", href: PAGES.FAVORITES },
  { icon: Heart, label: "Мои лайки", href: PAGES.LIKES },
  { icon: Shield, label: "Админ панель", href: PAGES.ADMIN, adminOnly: true },
  { icon: LogOut, label: "Выйти", href: "#", },
];

const loggedOutMenuItems: MenuItem[] = [
  { icon: LogIn, label: "Вход / Регистрация", href: PAGES.AUTH },
];

const menuVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 10 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: 0.2, ease: "easeOut" as const }
  },
  exit: { 
    opacity: 0, 
    scale: 0.9, 
    y: 10,
    transition: { duration: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05, duration: 0.2 }
  })
};

export function FloatingAuthButton() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { isLoggedIn, logout, user } = useUser();

  const isAdminOrManager = user?.role?.name === "Admin" || user?.role?.name === "Manager";

  const filteredMenuItems = loggedInMenuItems.filter(item =>
    !item.adminOnly || isAdminOrManager
  );

  const menuItems = isLoggedIn ? filteredMenuItems : loggedOutMenuItems;

  const handleItemClick = (item: MenuItem) => {
    if (item.href === "#") {
      logout();
    }
    setIsOpen(false);
  };

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
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className="absolute bottom-16 right-0 mb-2 w-48 overflow-hidden rounded-xl border border-(--border) bg-(--card-bg) shadow-lg"
          >
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={itemVariants}
              >
                <Link
                  href={item.href}
                  onClick={() => handleItemClick(item)}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-(--text-secondary) transition-colors hover:bg-(--background) hover:text-(--text-primary)"
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-(--text-primary) text-(--background) shadow-lg transition-all hover:scale-110 hover:shadow-xl active:scale-95"
      >
        <User size={24} />
      </button>
    </div>
  );
}