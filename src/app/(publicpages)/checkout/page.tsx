"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Link } from 'next-view-transitions';
import { ArrowLeft, Package, MapPin, MessageSquare } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { OrderService } from "@/services/order.service";
import { PAGES } from "@/config/pages.config";
import { ProtectedRoute } from "@/components/Auth/ProtectedRoute";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const DELIVERY_FEE = 100;
  const FREE_THRESHOLD = 300;
  const delivery = totalPrice >= FREE_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = totalPrice + delivery;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const orderItems = items.map(({ product, quantity }) => ({
        productId: Number(product.id),
        productName: product.name,
        price: product.price,
        quantity,
      }));

      await OrderService.create({
        deliveryAddress: address.trim(),
        comment: comment.trim() || undefined,
        items: orderItems,
      });

      clearCart();
      setShowSuccessModal(true);
    } catch (err: any) {
      setError(err.message || "Ошибка при оформлении заказа");
    } finally {
      setLoading(false);
    }
  };
  return (
    <ProtectedRoute>
      {items.length === 0 && !showSuccessModal ? (
        <main className="mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-24 lg:px-8">
          <div className="flex flex-col items-center justify-center py-20 rounded-2xl md:rounded-3xl border border-(--border) bg-(--card-bg)">
            <Package size={48} className="text-(--text-muted) mb-4" />
            <p className="text-lg md:text-xl font-bold text-(--text-secondary)">Корзина пуста</p>
            <p className="mt-2 text-(--text-muted)">Добавьте товары из каталога</p>
            <Link
              href={PAGES.CATALOG}
              className="mt-6 rounded-full bg-(--text-primary) px-6 md:px-8 py-3 text-sm font-bold text-(--background) transition-transform hover:scale-105 active:scale-95"
            >
              ПЕРЕЙТИ В КАТАЛОГ
            </Link>
          </div>
        </main>
      ) : (
        <>
          <main className="mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-24 lg:px-8">
            <div className="mb-8">
              <Link
                href={PAGES.CART}
                className="inline-flex items-center gap-2 text-sm text-(--text-muted) hover:text-(--text-primary) transition-colors"
              >
                <ArrowLeft size={16} />
                Вернуться в корзину
              </Link>
            </div>

            <h1 className="mb-8 text-3xl md:text-4xl font-black text-(--text-primary)">
              Оформление заказа
            </h1>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">

                  <div className="rounded-xl md:rounded-2xl border border-(--border) bg-(--card-bg) p-4 md:p-6">
                    <h2 className="flex items-center gap-2 text-lg font-bold text-(--text-primary) mb-4">
                      <MapPin size={20} />
                      Адрес доставки
                    </h2>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Город, улица, дом, квартира"
                      rows={3}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-(--background) border border-(--border) text-(--text-primary) placeholder:text-(--text-secondary)/50 focus:outline-none focus:border-(--accent) transition-colors text-base resize-none"
                    />
                  </div>

                  <div className="rounded-xl md:rounded-2xl border border-(--border) bg-(--card-bg) p-4 md:p-6">
                    <h2 className="flex items-center gap-2 text-lg font-bold text-(--text-primary) mb-4">
                      <MessageSquare size={20} />
                      Комментарий
                    </h2>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Пожелания к заказу (необязательно)"
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl bg-(--background) border border-(--border) text-(--text-primary) placeholder:text-(--text-secondary)/50 focus:outline-none focus:border-(--accent) transition-colors text-base resize-none"
                    />
                  </div>

                  {items.length > 0 && (
                    <div className="rounded-xl md:rounded-2xl border border-(--border) bg-(--card-bg) p-4 md:p-6">
                      <h2 className="flex items-center gap-2 text-lg font-bold text-(--text-primary) mb-4">
                        <Package size={20} />
                        Состав заказа
                      </h2>
                      <div className="space-y-3">
                        {items.map(({ product, quantity }) => (
                          <div key={product.id} className="flex items-center gap-3">
                            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-black/50">
                              <Image
                                src={product.img}
                                alt={product.name}
                                fill
                                className="object-contain p-1"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-(--text-primary) truncate">
                                {product.name}
                              </p>
                              <p className="text-xs text-(--text-muted)">
                                {product.price} MDL × {quantity}
                              </p>
                            </div>
                            <p className="text-sm font-bold text-(--text-primary)">
                              {product.price * quantity} MDL
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="rounded-xl md:rounded-2xl border border-(--border) bg-(--card-bg) p-4 md:p-6 h-fit lg:sticky lg:top-24">
                  <h2 className="mb-4 text-lg md:text-xl font-bold text-(--text-primary)">
                    Итого
                  </h2>
                  <div className="space-y-3 border-b border-(--border) pb-4">
                    <div className="flex justify-between text-sm text-(--text-secondary)">
                      <span>Товары ({items.length})</span>
                      <span>{totalPrice} MDL</span>
                    </div>
                    <div className="flex justify-between text-sm text-(--text-secondary)">
                      <span>Доставка</span>
                      <span className={delivery === 0 ? "text-green-500" : "text-(--text-muted)"}>
                        {delivery === 0 ? "Бесплатно" : `${delivery} MDL`}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between py-4">
                    <span className="text-lg font-bold text-(--text-primary)">К оплате</span>
                    <span className="text-2xl font-black text-(--text-primary)">
                      {total} <span className="text-sm font-light">MDL</span>
                    </span>
                  </div>

                  {error && (
                    <p className="mb-3 text-sm text-red-500">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading || !address.trim()}
                    className="w-full rounded-xl bg-(--text-primary) py-4 text-sm font-bold text-(--background) transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "ОФОРМЛЕНИЕ..." : "ПОДТВЕРДИТЬ ЗАКАЗ"}
                  </button>
                  <p className="mt-3 text-center text-xs text-(--text-muted)">
                    Оплата при получении
                  </p>
                </div>
              </div>
            </form>
          </main>

          {showSuccessModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="bg-(--card-bg) rounded-2xl p-8 max-w-md w-full mx-4 border border-(--border) text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <h3 className="text-2xl font-black text-(--text-primary) mb-2">Заказ оформлен!</h3>

                <p className="text-(--text-secondary) mb-6">
                  Посмотреть статус заказа можно в личном кабинете.
                  С вами свяжется поддержка для уточнения деталей заказа.
                </p>

                <div className="flex flex-col gap-3">
                  <Link href={PAGES.USERPROFILE}
                    className="w-full rounded-xl bg-(--text-primary) py-3 text-sm font-bold text-(--background) text-center
                               hover:scale-[1.02] active:scale-[0.98] transition-transform">
                    ПЕРЕЙТИ В ЛИЧНЫЙ КАБИНЕТ
                  </Link>
                  <Link href={PAGES.HOME}
                    className="w-full rounded-xl border border-(--border) py-3 text-sm font-bold text-(--text-secondary) text-center
                               hover:bg-(--background) transition-colors">
                    НА ГЛАВНУЮ
                  </Link>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </ProtectedRoute>
  );
}
