"use client";

import { useState } from "react";
import { Product } from "@/types/Mockdata";
import { ProductModal } from "../Modal/ProductModal";

export function QuickViewButton({ product }: { product: Product }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button 
        onClick={(e) => {
          e.preventDefault(); 
          setIsOpen(true);
        }}
        className="mt-3 w-full rounded-xl border border-(--border) bg-transparent py-2.5 text-xs font-bold uppercase tracking-widest text-(--text-secondary) transition-colors hover:bg-(--card-hover) hover:text-(--text-primary)"
      >
        Быстрый просмотр
      </button>

      <ProductModal 
        product={product} 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </div>
  );
}
