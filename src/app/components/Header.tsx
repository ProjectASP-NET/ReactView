"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Catalog", href: "/catalog" },
    { name: "Profile", href: "/profile" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/20 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3 transition-transform hover:scale-105 active:scale-95">
          <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-white/10 to-transparent p-2 ring-1 ring-white/20 transition-all group-hover:ring-white/40">
            <Image
              src="/logo1.png"
              alt="D&DLiquid"
              width={40}
              height={40}
              className="h-auto w-full object-contain brightness-110 grayscale transition-all group-hover:grayscale-0"
              priority
            />
          </div>
          <span className="hidden text-xl font-light tracking-[0.2em] text-white/90 uppercase sm:block">
            D&D <span className="font-bold text-white">Liquid</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative py-2 text-sm font-medium tracking-wide transition-colors ${
                  isActive ? "text-white" : "text-white/60 hover:text-white"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Additional Actions (Placeholder) */}
        <div className="hidden items-center gap-4 sm:flex">
            <button className="rounded-full bg-white px-5 py-2 text-xs font-bold tracking-wider text-black transition-all hover:bg-white/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-95">
                JOIN NOW
            </button>
        </div>
      </div>
    </header>
  );
}
