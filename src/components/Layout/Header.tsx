"use client";

import Image from "next/image";
import Link from "next/link";
import { Navigation } from "./Navigation";
import { PAGES } from "@/config/pages.config";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-(--border) bg-(--header-bg) backdrop-blur-lg transition-all duration-300">
      <div className="mx-auto flex h-16 md:h-20 max-w-7xl items-center justify-between px-4 md:px-6 lg:px-8">
        <Link href={PAGES.HOME} className="group flex items-center gap-2 md:gap-3 transition-transform hover:scale-105 active:scale-95">
          <div className="relative flex h-10 w-10 md:h-12 md:w-12 items-center justify-center overflow-hidden rounded-xl bg-(--card-bg) p-1.5 md:p-2 ring-1 ring-(--border) transition-all group-hover:ring-(--text-secondary)">
            <Image
              src="/logo1.png"
              alt="D&DLiquid"
              width={40}
              height={40}
              className="h-auto w-full object-contain rounded-full brightness-110 grayscale transition-all group-hover:grayscale-0"
              priority
            />
          </div>
          <span className="hidden text-lg md:text-xl font-light tracking-[0.2em] text-(--text-primary) uppercase sm:block">
            D&D <span className="font-bold">Liquid</span>
          </span>
        </Link>
        <Navigation />
      </div>
    </header>
  );
}
