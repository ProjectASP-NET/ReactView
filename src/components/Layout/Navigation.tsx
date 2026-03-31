"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MENU } from "../../types/menu.data";
import { CartIcon } from "../Icons/CartIcon";
import { ThemeToggle } from "../UI/ThemeToggle";
import { CompareIcon } from "../Icons/CompareIcon";

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
  );
}
