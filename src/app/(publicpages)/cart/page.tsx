"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from 'next-view-transitions';
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { PAGES } from "@/config/pages.config";

const FREE_DELIVERY_THRESHOLD = 300;

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } =
    useCart();
  const [removingItems, setRemovingItems] = useState<Set<string>>(new Set());

  const remainingForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - totalPrice);
  const freeDeliveryProgress = Math.min(100, (totalPrice / FREE_DELIVERY_THRESHOLD) * 100);

  const handleRemove = (productId: string) => {
    setRemovingItems((prev) => new Set(prev).add(productId));
    setTimeout(() => {
      removeFromCart(productId);
      setRemovingItems((prev) => {
        const next = new Set(prev);
        next.delete(productId);
        return next;
      });
    }, 300);
  };

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-24 lg:px-8">
        <h1 className="mb-6 md:mb-8 text-3xl md:text-4xl font-black text-(--text-primary)">Корзина</h1>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center py-16 md:py-20 rounded-2xl md:rounded-3xl border border-(--border) bg-(--card-bg)"
        >
          <p className="text-lg md:text-xl font-bold text-(--text-secondary)">Корзина пуста</p>
          <p className="mt-2 text-(--text-muted)">
            Добавьте товары из каталога
          </p>
          <Link
            href={PAGES.CATALOG}
            className="mt-6 rounded-full bg-(--text-primary) px-6 md:px-8 py-3 text-sm font-bold text-(--background) transition-transform hover:scale-105 active:scale-95"
          >
            ПЕРЕЙТИ В КАТАЛОГ
          </Link>
        </motion.div>
      </main>
    );
  }

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <main className="mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-24 lg:px-8">
      <div className="mb-6 md:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl md:text-4xl font-black text-(--text-primary)">
          Корзина{" "}
          <span className="text-(--text-muted)">({totalItems} товаров)</span>
        </h1>
        <button
          onClick={clearCart}
          className="text-sm font-medium text-(--text-muted) hover:text-red-500 transition-colors"
        >
          Очистить корзину
        </button>
      </div>

      {remainingForFreeDelivery > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-xl border border-(--border) bg-(--card-bg) p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-(--text-secondary)">
              Бесплатная доставка от {FREE_DELIVERY_THRESHOLD} MDL
            </span>
            <span className="text-sm font-bold text-(--text-primary)">
              {Math.round(freeDeliveryProgress)}%
            </span>
          </div>
          <div className="h-2 rounded-full bg-(--border) overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${freeDeliveryProgress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full bg-linear-to-r from-green-400 to-green-600 rounded-full"
            />
          </div>
          <p className="mt-2 text-xs text-(--text-muted)">
            Осталось <span className="font-bold text-green-400">{remainingForFreeDelivery} MDL</span> до бесплатной доставки
          </p>
        </motion.div>
      )}

      {remainingForFreeDelivery === 0 && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-xl border border-green-500/30 bg-green-500/10 p-4"
        >
          <p className="text-sm font-bold text-green-400">
            ✓ Бесплатная доставка уже активирована!
          </p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-3 md:space-y-4">
          <AnimatePresence mode="popLayout">
            {items.map(({ product, quantity }, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: removingItems.has(product.id) ? 0 : 1,
                  x: removingItems.has(product.id) ? -20 : 0,
                  scale: removingItems.has(product.id) ? 0.95 : 1
                }}
                exit={{ opacity: 0, x: -20, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                layout
                className="flex flex-col sm:flex-row gap-3 md:gap-4 rounded-xl md:rounded-2xl border border-(--border) bg-(--card-bg) p-3 md:p-4"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Link
                  href={PAGES.getProduct(product.id)}
                  className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-xl bg-black/50"
                >
                  <Image
                    src={product.img}
                    alt={product.name}
                    fill
                    className="object-contain p-2"
                  />
                </Link>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-(--text-muted)">
                      {product.brand}
                    </p>
                    <Link
                      href={PAGES.getProduct(product.id)}
                      className="font-bold text-(--text-primary) hover:text-(--text-secondary) transition-colors"
                    >
                      {product.name}
                    </Link>
                  </div>
                  <div className="flex items-center justify-between mt-2 sm:mt-0">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-(--card-bg) border border-(--border) transition-colors hover:border-(--text-secondary)"
                      >
                        <Minus size={14} className="text-(--text-secondary)" />
                      </button>
                      <span className="w-8 text-center font-bold text-(--text-primary)">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-(--card-bg) border border-(--border) transition-colors hover:border-(--text-secondary)"
                      >
                        <Plus size={14} className="text-(--text-secondary)" />
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemove(product.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-(--text-muted) transition-colors hover:bg-red-500/20 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 sm:gap-0">
                  <p className="text-lg font-black text-(--text-primary)">
                    {product.price * quantity}{" "}
                    <span className="text-sm font-light text-(--text-muted)">MDL</span>
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="rounded-xl md:rounded-2xl border border-(--border) bg-(--card-bg) p-4 md:p-6 h-fit lg:sticky lg:top-24">
          <h2 className="mb-3 md:mb-4 text-lg md:text-xl font-bold text-(--text-primary)">
            Итого
          </h2>
          <div className="space-y-3 border-b border-(--border) pb-4">
            <div className="flex justify-between text-sm text-(--text-secondary)">
              <span>Товары ({totalItems})</span>
              <span>{totalPrice} MDL</span>
            </div>
            <div className="flex justify-between text-sm text-(--text-secondary)">
              <span>Доставка</span>
              <span className={remainingForFreeDelivery === 0 ? "text-green-500" : "text-(--text-muted)"}>
                {remainingForFreeDelivery === 0 ? "Бесплатно" : "100 MDL"}
              </span>
            </div>
          </div>
          <div className="flex justify-between py-4">
            <span className="text-lg font-bold text-(--text-primary)">К оплате</span>
            <span className="text-2xl font-black text-(--text-primary)">
              {remainingForFreeDelivery === 0 ? totalPrice : totalPrice + 100}{" "}
              <span className="text-sm font-light">MDL</span>
            </span>
          </div>
          <button className="w-full rounded-xl bg-(--text-primary) py-4 text-sm font-bold text-(--background) transition-transform hover:scale-[1.02] active:scale-[0.98]">
            ОФОРМИТЬ ЗАКАЗ
          </button>
          <p className="mt-3 text-center text-xs text-(--text-muted)">
            Оплата при получении
          </p>
        </div>
      </div>
    </main>
  );
}
