"use client";

import { Scale } from "lucide-react";
import Link from "next/link";
import { useCompare } from "@/context/CompareContext";
import { PAGES } from "@/config/pages.config";

export function CompareIcon() {
  const { count } = useCompare();

  return (
    <Link
      href={PAGES.MATCHER}
      className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-(--card-bg) border border-(--border) transition-colors hover:border-(--text-secondary)"
    >
      <Scale size={20} className="text-(--text-secondary)" />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-(--text-secondary) text-[10px] font-bold text-(--background)">
          {count > 4 ? "4+" : count}
        </span>
      )}
    </Link>
  );
}
