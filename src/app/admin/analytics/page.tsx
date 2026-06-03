"use client";

import { useEffect, useState } from "react";
import { AdminStatsService } from "@/services/admin/stats.service";
import { AdminStatsDTO } from "@/types/admin.types";

export default function AnalyticsPage() {
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

  const maxCount = stats ? Math.max(...stats.ordersByStatus.map((s) => s.count), 1) : 1;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-(--text-primary)">Аналитика</h1>
        <p className="text-(--text-secondary) mt-2">Статистика и отчеты</p>
      </div>

      {stats && (
        <div className="space-y-6">
          <div className="bg-(--card-bg) border border-(--border) rounded-2xl p-6">
            <h2 className="text-xl font-bold text-(--text-primary) mb-4">Заказы по статусам</h2>
            <div className="space-y-3">
              {stats.ordersByStatus.map((item) => (
                <div key={item.status} className="flex items-center gap-4">
                  <span className="w-24 text-sm text-(--text-secondary)">{item.status}</span>
                  <div className="flex-1 h-8 bg-(--background) rounded-lg overflow-hidden">
                    <div
                      className="h-full bg-(--accent) rounded-lg transition-all duration-500"
                      style={{ width: `${(item.count / maxCount) * 100}%` }}
                    />
                  </div>
                  <span className="w-16 text-right text-sm font-medium text-(--text-primary)">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-(--card-bg) border border-(--border) rounded-2xl p-6">
              <h2 className="text-xl font-bold text-(--text-primary) mb-4">Популярные товары</h2>
              {stats.popularProducts.length > 0 ? (
                <div className="space-y-3">
                  {stats.popularProducts.map((product, idx) => (
                    <div key={product.productId} className="flex items-center justify-between p-3 rounded-xl bg-(--background)">
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

            <div className="bg-(--card-bg) border border-(--border) rounded-2xl p-6">
              <h2 className="text-xl font-bold text-(--text-primary) mb-4">Общая статистика</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-(--background) text-center">
                  <p className="text-3xl font-bold text-(--text-primary)">{stats.totalUsers}</p>
                  <p className="text-sm text-(--text-secondary) mt-1">Пользователей</p>
                </div>
                <div className="p-4 rounded-xl bg-(--background) text-center">
                  <p className="text-3xl font-bold text-(--text-primary)">{stats.totalProducts}</p>
                  <p className="text-sm text-(--text-secondary) mt-1">Товаров</p>
                </div>
                <div className="p-4 rounded-xl bg-(--background) text-center">
                  <p className="text-3xl font-bold text-(--text-primary)">{stats.totalOrders}</p>
                  <p className="text-sm text-(--text-secondary) mt-1">Заказов всего</p>
                </div>
                <div className="p-4 rounded-xl bg-(--background) text-center">
                  <p className="text-3xl font-bold text-(--text-primary)">{stats.revenue.toLocaleString()} MDL</p>
                  <p className="text-sm text-(--text-secondary) mt-1">Выручка</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
