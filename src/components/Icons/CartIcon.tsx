"use client";

import { ShoppingCart } from "lucide-react";
import { Link } from 'next-view-transitions';
import { useCart } from "@/context/CartContext";
import { PAGES } from "@/config/pages.config";

export function CartIcon() {
  const { totalItems } = useCart();

  return (
    <Link
      href = {PAGES.CART}
      className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-(--card-bg) border border-(--border) transition-colors hover:border-(--text-secondary)"
    >
      <ShoppingCart size={20} className="text-(--text-secondary)" />
      <span
        suppressHydrationWarning
        className={
          "absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-[10px] font-bold text-white " +
          (totalItems > 0 ? "" : "hidden")
        }
      >
        {totalItems > 9 ? "9+" : totalItems}
      </span>
    </Link>
  );
}
