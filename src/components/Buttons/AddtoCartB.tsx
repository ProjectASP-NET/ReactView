"use client";
import { useTranslations } from 'next-intl';
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { MOCK_PRODUCTS } from "@/types/Products";

interface AddtoCartProps {
  productID: string;
  inStock: boolean;
}

export function AddtoCart({ productID, inStock }: AddtoCartProps) {
  const t = useTranslations('Product');
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAdd = () => {
    const product = MOCK_PRODUCTS.find((p) => p.id === productID);
    if (product) {
      addToCart(product);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  if (!inStock) {
    return (
      <button
        disabled
        className="mt-4 w-full rounded-xl bg-(--card-bg) py-3 text-sm font-bold text-(--text-muted) cursor-not-allowed border border-(--border)"
      >
        {t('outOfStock')}
      </button>
    );
  }

  return (
    <button
      onClick={handleAdd}
      className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all active:scale-95 ${
        isAdded ? "bg-green-500 text-white" : "bg-(--text-primary) text-(--background) hover:scale-[1.02]"
      }`}
    >
      <ShoppingCart size={18} />
      {isAdded ? t('added') : t('addToCart')}
    </button>
  );
}
