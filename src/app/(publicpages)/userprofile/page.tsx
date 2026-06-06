"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { useProducts } from "@/context/ProductContext";
import { ProductCard } from "@/components/Product/ProductCard";
import { useLikeandFav } from "@/context/LikeandFavContext";
import { PAGES } from "@/config/pages.config";
import { Link } from 'next-view-transitions';
import { User, Mail, Edit2, Save, X, Package } from "lucide-react";
import { ProtectedRoute } from "@/components/Auth/ProtectedRoute";

const MOCK_ORDERS = [
  { id: "1234", date: "15.03.2024", total: 1500, status: "delivered", items: 2 },
  { id: "1235", date: "10.03.2024", total: 2200, status: "shipped", items: 3 },
  { id: "1236", date: "05.03.2024", total: 800, status: "processing", items: 1 },
];

const getStatusLabel = (status: string) => {
  switch (status) {
    case "delivered":
      return { label: "Доставлен", color: "text-green-500" };
    case "shipped":
      return { label: "В пути", color: "text-blue-500" };
    case "processing":
      return { label: "В обработке", color: "text-yellow-500" };
    default:
      return { label: status, color: "text-(--text-secondary)" };
  }
};

export default function UserProfilePage() {
  const { user, updateUser, logout, isLoggedIn } = useUser();
  const { favorites, likedProducts } = useLikeandFav();
  const { products, isLoading } = useProducts();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
      });
    }
  }, [user]);

  const handleSave = () => {
    if (user) {
      updateUser(formData);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
      });
    }
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
  };

  const favoriteProducts = products.filter((p) =>
    favorites.has(p.id)
  );

  const likedProds = products.filter((p) => likedProducts.has(p.id));

  return (
    <ProtectedRoute>
    <main className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
          ЛИЧНЫЙ <span className="text-(--text-muted)">КАБИНЕТ</span>
        </h1>
        <p className="mt-4 text-lg text-(--text-secondary)">
          Добро пожаловать{user ? `, ${user.username}!` : "!"}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <section className="rounded-3xl border border-(--border) bg-(--card-bg) p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-(--text-primary)">Личные данные</h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 rounded-xl border border-(--border) bg-(--card-bg) px-4 py-2 text-sm font-medium text-(--text-secondary) transition-colors hover:border-(--text-secondary)"
                >
                  <Edit2 size={16} />
                  Редактировать
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 rounded-xl bg-green-500 px-4 py-2 text-sm font-bold text-white"
                  >
                    <Save size={16} />
                    Сохранить
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 rounded-xl border border-red-500 px-4 py-2 text-sm font-medium text-red-500"
                  >
                    <X size={16} />
                    Отмена
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-xl border border-(--border) bg-(--card-bg) p-4">
                <User size={20} className="text-(--text-secondary)" />
                <div className="flex-1">
                  <p className="text-xs text-(--text-muted)">Имя</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      className="w-full bg-transparent text-(--text-primary) outline-none"
                    />
                  ) : (
                    <p className="font-medium text-(--text-primary)">{user?.username || "—"}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-(--border) bg-(--card-bg) p-4">
                <Mail size={20} className="text-(--text-secondary)" />
                <div className="flex-1">
                  <p className="text-xs text-(--text-muted)">Email</p>
                  {isEditing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent text-(--text-primary) outline-none"
                    />
                  ) : (
                    <p className="font-medium text-(--text-primary)">{user?.email || "—"}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-(--border) bg-(--card-bg) p-4">
                <User size={20} className="text-(--text-secondary)" />
                <div className="flex-1">
                  <p className="text-xs text-(--text-muted)">Роль</p>
                  <p className="font-medium text-(--text-primary)">{user?.role.name || "—"}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-(--border) bg-(--card-bg) p-6">
            <h2 className="mb-6 text-xl font-bold text-(--text-primary)">История заказов</h2>
            <div className="space-y-4">
              {MOCK_ORDERS.map((order) => {
                const status = getStatusLabel(order.status);
                return (
                  <div
                    key={order.id}
                    className="flex items-center justify-between rounded-xl border border-(--border) bg-(--card-bg) p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--text-secondary)/10">
                        <Package size={20} className="text-(--text-secondary)" />
                      </div>
                      <div>
                        <p className="font-bold text-(--text-primary)">Заказ #{order.id}</p>
                        <p className="text-sm text-(--text-muted)">
                          {order.date} • {order.items} товара(ов)
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-(--text-primary)">{order.total} MDL</p>
                      <p className={`text-sm ${status.color}`}>{status.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="rounded-3xl border border-(--border) bg-(--card-bg) p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-(--text-primary)">Избранное</h2>
              <Link
                href={PAGES.FAVORITES}
                className="text-sm text-(--text-secondary) hover:text-(--text-primary)"
              >
                Смотреть все →
              </Link>
            </div>
            {favoriteProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {favoriteProducts.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-center text-(--text-muted) py-8">
                Нет избранных товаров
              </p>
            )}
          </section>

          <section className="rounded-3xl border border-(--border) bg-(--card-bg) p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-(--text-primary)">Мои лайки</h2>
              <Link
                href={PAGES.LIKES}
                className="text-sm text-(--text-secondary) hover:text-(--text-primary)"
              >
                Смотреть все →
              </Link>
            </div>
            {likedProds.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {likedProds.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-center text-(--text-muted) py-8">
                Нет лайкнутых товаров
              </p>
            )}
          </section>

          <button
            onClick={handleLogout}
            className="w-full rounded-xl border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-500 transition-colors hover:bg-red-500/20"
          >
            Выйти из профиля
          </button>
        </div>
      </div>
    </main>
    </ProtectedRoute>
  );
}
