"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MENU } from "../types/menu.data";
import { CartIcon } from "./CartIcon";
import { ThemeToggle } from "./ThemeToggle";

export function Navigation() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center gap-4">
      {MENU.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`relative py-2 font-medium tracking-wide transition-colors ${
              isActive ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            {item.name}
            {isActive && (
              <span className="absolute -bottom-1 left-0 h-px w-full bg-gradient-to-r from-transparent via-[var(--text-secondary)] to-transparent" />
            )}
          </Link>
        );
      })}
      <ThemeToggle />
      <CartIcon />
    </nav>
  );
}
