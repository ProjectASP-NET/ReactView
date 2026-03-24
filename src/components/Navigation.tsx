"use client"; 

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MENU } from "./menu.data";

export function Navigation() {
  const pathname = usePathname();
  return (
    <nav className="flex items-center gap-8">
      {MENU.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`relative py-2 font-medium tracking-wide transition-colors ${
              isActive ? "text-white" : "text-white/60 hover:text-white"
            }`}
          >
            {item.name}
            {isActive && (
              <span className="absolute -bottom-1 left-0 h-px w-full bg-linear-to-r from-transparent via-white/50 to-transparent" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}