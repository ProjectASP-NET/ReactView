"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MENU } from "../../types/menu.data";
import { CartIcon } from "../Icons/CartIcon";
import { ThemeToggle } from "../UI/ThemeToggle";
import { CompareIcon } from "../Icons/CompareIcon";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav className="hidden md:flex items-center gap-4">
        {MENU.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`relative py-2 font-medium tracking-wide transition-colors ${
                isActive ? "text-(--text-primary)" : "text-(--text-secondary) hover:text-(--text-primary)"
              }`}
            >
              {item.name}
              {isActive && (
                <span className="absolute -bottom-1 left-0 h-px w-full bg-linear-to-r from-transparent via-(--text-secondary) to-transparent" />
              )}
            </Link>
          );
        })}
        <ThemeToggle />
        <CompareIcon />
        <CartIcon />
      </nav>

      <button
        onClick={toggleMobileMenu}
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-(--card-bg) border border-(--border)"
        aria-label="Меню"
      >
        {isMobileMenuOpen ? (
          <X size={24} className="text-(--text-primary)" />
        ) : (
          <Menu size={24} className="text-(--text-primary)" />
        )}
      </button>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            className="absolute inset-0 bg-black/80"
            onClick={closeMobileMenu}
          />
          <div className="absolute top-20 left-4 right-4 bg-(--background) border border-(--border) rounded-2xl p-4 shadow-2xl">
            <div className="flex flex-col gap-2">
              {MENU.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium tracking-wide transition-colors ${
                      isActive 
                        ? "bg-(--text-primary) text-(--background)" 
                        : "text-(--text-secondary) hover:bg-(--card-hover)"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <div className="flex items-center gap-3 px-4 py-3 border-t border-(--border) mt-2">
                <ThemeToggle />
                <CompareIcon />
                <CartIcon />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}