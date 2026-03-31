"use client";

import { User } from "lucide-react";

export function FloatingAuthButton() {
  return (
    <button className="fixed bottom-6 right-6 z-90 flex h-12 w-12 items-center justify-center rounded-full bg-(--text-primary) text-(--background) shadow-lg transition-all hover:scale-110 hover:shadow-xl active:scale-95">
      <User size={24} />
    </button>
  );
}