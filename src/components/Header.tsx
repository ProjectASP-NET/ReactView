"use client";

import Image from "next/image";
import Link from "next/link";
import { Navigation } from "./Navigation";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--header-bg)] backdrop-blur-lg transition-all duration-300">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3 transition-transform hover:scale-105 active:scale-95">
          <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-[var(--card-bg)] p-2 ring-1 ring-[var(--border)] transition-all group-hover:ring-[var(--text-secondary)]">
            <Image
              src="/logo1.png"
              alt="D&DLiquid"
              width={40}
              height={40}
              className="h-auto w-full object-contain brightness-110 grayscale transition-all group-hover:grayscale-0"
              priority
            />
          </div>
          <span className="hidden text-xl font-light tracking-[0.2em] text-[var(--text-primary)] uppercase sm:block">
            D&D <span className="font-bold">Liquid</span>
          </span>
        </Link>
        <Navigation />
      </div>
    </header>
  );
}
