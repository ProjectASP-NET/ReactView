"use client";

import { useEffect, useState } from "react";
import { Users, Package, ShoppingCart, TrendingUp } from "lucide-react";

interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  revenue: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setStats({
      totalUsers: 156,
      totalProducts: 89,
      totalOrders: 342,
      revenue: 45230,
    });
    setLoading(false);
  }, []);

  const statCards = [
    {
      title: "Пользователи",
      value: stats.totalUsers,
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Товары",
      value: stats.totalProducts,
      icon: Package,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Заказы",
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Выручка",
      value: `${stats.revenue} MDL`,
      icon: TrendingUp,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ];

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

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-(--text-primary)">
          Dashboard
        </h1>
        <p className="text-(--text-secondary) mt-2">
          Обзор основных метрик
        </p>
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
          <h2 className="text-xl font-bold text-(--text-primary) mb-4">
            Последние заказы
          </h2>
          <p className="text-(--text-secondary)">
            Функционал в разработке...
          </p>
        </div>

        <div className="bg-(--card-bg) border border-(--border) rounded-2xl p-6">
          <h2 className="text-xl font-bold text-(--text-primary) mb-4">
            Популярные товары
          </h2>
          <p className="text-(--text-secondary)">
            Функционал в разработке...
          </p>
        </div>
      </div>
    </div>
  );
}
