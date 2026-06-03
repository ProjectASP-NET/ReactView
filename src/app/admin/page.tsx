"use client";

import { useEffect, useState } from "react";
import { AdminStatsService } from "@/services/admin/stats.service";
import { AdminStatsDTO, OrderStatusEnum } from "@/types/admin.types";
import { PAGES } from "@/config/pages.config";
import { ShoppingCart, Package, Users, DollarSign, TrendingUp } from "lucide-react";
import Link from "next/link";

const statusLabels: Record<string, string> = {
  Pending: "Ожидает",
  Confirmed: "Подтверждён",
  Processing: "В обработке",
  Shipped: "Отправлен",
  Delivered: "Доставлен",
  Cancelled: "Отменён",
  Refunded: "Возврат",
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStatsDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await AdminStatsService.getStats();
      setStats(data);
    } catch (error) {
      console.error("Failed to load stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
          <p className="mt-4 text-(--text-secondary)">Загрузка...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Пользователи",
      value: stats?.totalUsers ?? 0,
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Товары",
      value: stats?.totalProducts ?? 0,
      icon: Package,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Заказы",
      value: stats?.totalOrders ?? 0,
      icon: ShoppingCart,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Выручка",
      value: `${(stats?.revenue ?? 0).toLocaleString()} MDL`,
      icon: TrendingUp,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-(--text-primary)">Dashboard</h1>
        <p className="text-(--text-secondary) mt-2">Обзор основных метрик</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="bg-(--card-bg) border border-(--border) rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${card.bgColor}`}>
                  <Icon size={24} className={card.color} />
                </div>
              </div>
              <h3 className="text-(--text-secondary) text-sm font-medium mb-1">
                {card.title}
              </h3>
              <p className="text-3xl font-bold text-(--text-primary)">
                {card.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-(--card-bg) border border-(--border) rounded-2xl p-6">
          <h2 className="text-xl font-bold text-(--text-primary) mb-4">Последние заказы</h2>
          {stats?.recentOrders && stats.recentOrders.length > 0 ? (
            <div className="space-y-3">
              {stats.recentOrders.map((order) => (
                <Link
                  key={order.id}
                  href={PAGES.getAdminOrder(order.id)}
                  className="flex items-center justify-between p-3 rounded-xl bg-(--background) hover:opacity-80 transition-opacity"
                >
                  <div>
                    <p className="text-sm font-medium text-(--text-primary)">{order.orderNumber}</p>
                    <p className="text-xs text-(--text-secondary)">
                      {new Date(order.createdAt).toLocaleDateString()} — {order.totalAmount.toLocaleString()} MDL
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === OrderStatusEnum.Delivered ? "bg-green-100 text-green-700" :
                    order.status === OrderStatusEnum.Cancelled || order.status === OrderStatusEnum.Refunded ? "bg-red-100 text-red-700" :
                    "bg-yellow-100 text-yellow-700"
                  }`}>
                    {statusLabels[OrderStatusEnum[order.status]] || OrderStatusEnum[order.status]}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-(--text-secondary)">Нет заказов</p>
          )}
        </div>

        <div className="bg-(--card-bg) border border-(--border) rounded-2xl p-6">
          <h2 className="text-xl font-bold text-(--text-primary) mb-4">Популярные товары</h2>
          {stats?.popularProducts && stats.popularProducts.length > 0 ? (
            <div className="space-y-3">
              {stats.popularProducts.map((product, idx) => (
                <div
                  key={product.productId}
                  className="flex items-center justify-between p-3 rounded-xl bg-(--background)"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-(--text-secondary)">#{idx + 1}</span>
                    <p className="text-sm font-medium text-(--text-primary)">{product.productName}</p>
                  </div>
                  <p className="text-xs text-(--text-secondary)">
                    {product.totalSold} шт. — {product.revenue.toLocaleString()} MDL
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-(--text-secondary)">Нет данных</p>
          )}
        </div>
      </div>

      {stats?.ordersByStatus && stats.ordersByStatus.length > 0 && (
        <div className="mt-8 bg-(--card-bg) border border-(--border) rounded-2xl p-6">
          <h2 className="text-xl font-bold text-(--text-primary) mb-4">Заказы по статусам</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.ordersByStatus.map((item) => (
              <div key={item.status} className="p-4 rounded-xl bg-(--background) text-center">
                <p className="text-2xl font-bold text-(--text-primary)">{item.count}</p>
                <p className="text-xs text-(--text-secondary) mt-1">
                  {statusLabels[item.status] || item.status}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
