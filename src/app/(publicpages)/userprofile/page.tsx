"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { useProducts } from "@/context/ProductContext";
import { ProductCard } from "@/components/Product/ProductCard";
import { useLikeandFav } from "@/context/LikeandFavContext";
import { PAGES } from "@/config/pages.config";
import { Link } from 'next-view-transitions';
import { User, Mail, Edit2, Save, X, Package, Lock, Eye, EyeOff } from "lucide-react";
import { ProtectedRoute } from "@/components/Auth/ProtectedRoute";
import { OrderService } from "@/services/order.service";
import { AuthService } from "@/services/auth.service";
import { OrderDTO, OrderStatusEnum } from "@/types/admin.types";

const STATUS_LABELS: Record<OrderStatusEnum, { label: string; color: string }> = {
  [OrderStatusEnum.Pending]:    { label: "Ожидает",       color: "text-yellow-500" },
  [OrderStatusEnum.Confirmed]: { label: "Подтверждён",   color: "text-blue-500" },
  [OrderStatusEnum.Processing]:{ label: "В обработке",   color: "text-blue-400" },
  [OrderStatusEnum.Shipped]:   { label: "Отправлен",     color: "text-purple-500" },
  [OrderStatusEnum.Delivered]: { label: "Доставлен",     color: "text-green-500" },
  [OrderStatusEnum.Cancelled]: { label: "Отменён",       color: "text-red-500" },
  [OrderStatusEnum.Refunded]:  { label: "Возврат",       color: "text-orange-500" },
};

export default function UserProfilePage() {
  const { user, updateUser, logout } = useUser();
  const { favorites, likedProducts } = useLikeandFav();
  const { products } = useProducts();
  const [orders, setOrders] = useState<OrderDTO[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ username: "", email: "" });

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  useEffect(() => {
    OrderService.getMyOrders()
      .then(data => { setOrders(data); setOrdersError(null); })
      .catch(err => setOrdersError(err.message || "Ошибка загрузки заказов"))
      .finally(() => setOrdersLoading(false));
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({ username: user.username, email: user.email });
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setProfileSaving(true);
    setProfileError(null);
    try {
      const updated = await AuthService.updateProfile(user.id, formData);
      updateUser(updated);
      setIsEditing(false);
    } catch (err: any) {
      setProfileError(err.message || "Ошибка сохранения");
    } finally {
      setProfileSaving(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({ username: user.username, email: user.email });
    }
    setIsEditing(false);
    setProfileError(null);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("Пароли не совпадают");
      return;
    }
    setPasswordSaving(true);
    setPasswordError(null);
    setPasswordSuccess(false);
    try {
      await AuthService.changePasswordApi({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setPasswordSuccess(true);
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setTimeout(() => setShowChangePassword(false), 2000);
    } catch (err: any) {
      setPasswordError(err.message || "Ошибка смены пароля");
    } finally {
      setPasswordSaving(false);
    }
  };

  const handleLogout = () => logout();

  const favoriteProducts = products.filter(p => favorites.has(p.id));
  const likedProds = products.filter(p => likedProducts.has(p.id));

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
                <button onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 rounded-xl border border-(--border) bg-(--card-bg) px-4 py-2 text-sm font-medium text-(--text-secondary) transition-colors hover:border-(--text-secondary)">
                  <Edit2 size={16} /> Редактировать
                </button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={handleSave} disabled={profileSaving}
                    className="flex items-center gap-2 rounded-xl bg-green-500 px-4 py-2 text-sm font-bold text-white disabled:opacity-50">
                    <Save size={16} /> {profileSaving ? "Сохранение..." : "Сохранить"}
                  </button>
                  <button onClick={handleCancel}
                    className="flex items-center gap-2 rounded-xl border border-red-500 px-4 py-2 text-sm font-medium text-red-500">
                    <X size={16} /> Отмена
                  </button>
                </div>
              )}
            </div>

            {profileError && (
              <p className="mb-4 text-sm text-red-500">{profileError}</p>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-xl border border-(--border) bg-(--card-bg) p-4">
                <User size={20} className="text-(--text-secondary)" />
                <div className="flex-1">
                  <p className="text-xs text-(--text-muted)">Имя</p>
                  {isEditing ? (
                    <input type="text" value={formData.username}
                      onChange={e => setFormData({ ...formData, username: e.target.value })}
                      className="w-full bg-transparent text-(--text-primary) outline-none" />
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
                    <input type="email" value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent text-(--text-primary) outline-none" />
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

            {!showChangePassword ? (
              <button onClick={() => { setShowChangePassword(true); setPasswordSuccess(false); setPasswordError(null); }}
                className="mt-4 flex items-center gap-2 text-sm text-(--text-secondary) hover:text-(--text-primary) transition-colors">
                <Lock size={16} /> Сменить пароль
              </button>
            ) : (
              <form onSubmit={handleChangePassword} className="mt-4 space-y-4 border-t border-(--border) pt-4">
                <h3 className="text-sm font-bold text-(--text-primary)">Смена пароля</h3>

                {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
                {passwordSuccess && <p className="text-sm text-green-500">Пароль успешно изменён</p>}

                <div className="relative">
                  <input type={showCurrent ? "text" : "password"} value={passwordData.currentPassword}
                    onChange={e => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    placeholder="Текущий пароль" required
                    className="w-full px-4 py-3 pr-10 rounded-xl bg-(--background) border border-(--border) text-(--text-primary) outline-none focus:border-(--accent)" />
                  <button type="button" onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-(--text-muted)">
                    {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <div className="relative">
                  <input type={showNew ? "text" : "password"} value={passwordData.newPassword}
                    onChange={e => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    placeholder="Новый пароль" required
                    className="w-full px-4 py-3 pr-10 rounded-xl bg-(--background) border border-(--border) text-(--text-primary) outline-none focus:border-(--accent)" />
                  <button type="button" onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-(--text-muted)">
                    {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <div className="relative">
                  <input type={showConfirm ? "text" : "password"} value={passwordData.confirmPassword}
                    onChange={e => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    placeholder="Подтвердите пароль" required
                    className="w-full px-4 py-3 pr-10 rounded-xl bg-(--background) border border-(--border) text-(--text-primary) outline-none focus:border-(--accent)" />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-(--text-muted)">
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <div className="flex gap-2">
                  <button type="submit" disabled={passwordSaving}
                    className="rounded-xl bg-(--accent) px-4 py-2 text-sm font-bold text-white hover:opacity-90 disabled:opacity-50">
                    {passwordSaving ? "Сохранение..." : "Изменить пароль"}
                  </button>
                  <button type="button" onClick={() => { setShowChangePassword(false); setPasswordError(null); setPasswordSuccess(false); }}
                    className="rounded-xl border border-(--border) px-4 py-2 text-sm text-(--text-secondary) hover:bg-(--background)">
                    Отмена
                  </button>
                </div>
              </form>
            )}
          </section>

          <section className="rounded-3xl border border-(--border) bg-(--card-bg) p-6">
            <h2 className="mb-6 text-xl font-bold text-(--text-primary)">История заказов</h2>
            {ordersLoading ? (
              <div className="text-center py-8 text-(--text-muted)">Загрузка...</div>
            ) : ordersError ? (
              <div className="text-center py-8">
                <p className="text-red-500">{ordersError}</p>
                <button onClick={() => { setOrdersLoading(true); setOrdersError(null); OrderService.getMyOrders().then(setOrders).catch(err => setOrdersError(err.message)).finally(() => setOrdersLoading(false)); }}
                  className="mt-4 text-sm text-(--accent) hover:underline">Повторить</button>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-8">
                <Package size={40} className="mx-auto mb-3 text-(--text-muted)" />
                <p className="text-(--text-muted)">У вас пока нет заказов</p>
                <Link href={PAGES.CATALOG} className="mt-4 inline-block text-sm text-(--accent) hover:underline">
                  Перейти в каталог
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map(order => {
                  const status = STATUS_LABELS[order.status as OrderStatusEnum] || STATUS_LABELS[OrderStatusEnum.Pending];
                  const itemCount = order.items.reduce((s, i) => s + i.quantity, 0);
                  return (
                    <div key={order.id} className="flex items-center justify-between rounded-xl border border-(--border) bg-(--card-bg) p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--text-secondary)/10">
                          <Package size={20} className="text-(--text-secondary)" />
                        </div>
                        <div>
                          <p className="font-bold text-(--text-primary)">{order.orderNumber || `Заказ #${order.id}`}</p>
                          <p className="text-sm text-(--text-muted)">
                            {new Date(order.createdAt).toLocaleDateString("ru-RU")} • {itemCount} товара(ов)
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-(--text-primary)">{order.totalAmount} MDL</p>
                        <p className={`text-sm ${status.color}`}>{status.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>

        <div className="space-y-8">
          <section className="rounded-3xl border border-(--border) bg-(--card-bg) p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-(--text-primary)">Избранное</h2>
              <Link href={PAGES.FAVORITES} className="text-sm text-(--text-secondary) hover:text-(--text-primary)">
                Смотреть все →
              </Link>
            </div>
            {favoriteProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {favoriteProducts.slice(0, 4).map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-center text-(--text-muted) py-8">Нет избранных товаров</p>
            )}
          </section>

          <section className="rounded-3xl border border-(--border) bg-(--card-bg) p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-(--text-primary)">Мои лайки</h2>
              <Link href={PAGES.LIKES} className="text-sm text-(--text-secondary) hover:text-(--text-primary)">
                Смотреть все →
              </Link>
            </div>
            {likedProds.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {likedProds.slice(0, 4).map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-center text-(--text-muted) py-8">Нет лайкнутых товаров</p>
            )}
          </section>

          <button onClick={handleLogout}
            className="w-full rounded-xl border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-500 transition-colors hover:bg-red-500/20">
            Выйти из профиля
          </button>
        </div>
      </div>
    </main>
    </ProtectedRoute>
  );
}
