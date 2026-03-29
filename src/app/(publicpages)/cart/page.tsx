"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { PAGES } from "@/config/pages.config";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } =
    useCart();

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <h1 className="mb-8 text-4xl font-black text-white">Корзина</h1>
        <div className="flex flex-col items-center justify-center py-20 rounded-3xl border border-white/10 bg-white/5">
          <p className="text-xl font-bold text-white/60">Корзина пуста</p>
          <p className="mt-2 text-white/40">
            Добавьте товары из каталога
          </p>
          <Link
            href={PAGES.CART}
            className="mt-6 rounded-full bg-white px-8 py-3 text-sm font-bold text-black transition-transform hover:scale-105 active:scale-95"
          >
            ПЕРЕЙТИ В КАТАЛОГ
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-black text-white">
          Корзина{" "}
          <span className="text-white/40">({items.length} товаров)</span>
        </h1>
        <button
          onClick={clearCart}
          className="text-sm font-medium text-white/40 hover:text-red-500 transition-colors"
        >
          Очистить корзину
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <Link
                href={`/catalog/${product.id}`}
                className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-black/50"
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
                  <p className="text-xs font-bold uppercase tracking-widest text-white/40">
                    {product.brand}
                  </p>
                  <Link
                    href={`/catalog/${product.id}`}
                    className="font-bold text-white hover:text-white/80 transition-colors"
                  >
                    {product.name}
                  </Link>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 transition-colors hover:bg-white/20"
                    >
                      <Minus size={14} className="text-white" />
                    </button>
                    <span className="w-8 text-center font-bold text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 transition-colors hover:bg-white/20"
                    >
                      <Plus size={14} className="text-white" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-red-500/20 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between">
                <p className="text-lg font-black text-white">
                  {product.price * quantity}{" "}
                  <span className="text-sm font-light text-white/50">MDL</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 h-fit sticky top-24">
          <h2 className="mb-4 text-xl font-bold text-white">
            Итого
          </h2>
          <div className="space-y-3 border-b border-white/10 pb-4">
            <div className="flex justify-between text-sm text-white/60">
              <span>Товары ({items.reduce((sum, i) => sum + i.quantity, 0)})</span>
              <span>{totalPrice} MDL</span>
            </div>
            <div className="flex justify-between text-sm text-white/60">
              <span>Доставка</span>
              <span className="text-green-500">Бесплатно</span>
            </div>
          </div>
          <div className="flex justify-between py-4">
            <span className="text-lg font-bold text-white">К оплате</span>
            <span className="text-2xl font-black text-white">
              {totalPrice} <span className="text-sm font-light">MDL</span>
            </span>
          </div>
          <button className="w-full rounded-xl bg-white py-4 text-sm font-bold text-black transition-transform hover:scale-[1.02] active:scale-[0.98]">
            ОФОРМИТЬ ЗАКАЗ
          </button>
          <p className="mt-3 text-center text-xs text-white/40">
            Оплата при получении
          </p>
        </div>
      </div>
    </main>
  );
}
