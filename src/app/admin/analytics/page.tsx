"use client";

import { useEffect, useState } from "react";

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

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
          Аналитика
        </h1>
        <p className="text-(--text-secondary) mt-2">
          Статистика и отчеты
        </p>
      </div>

      <div className="bg-(--card-bg) border border-(--border) rounded-2xl p-8 text-center">
        <p className="text-(--text-secondary) text-lg">
          Модуль аналитики в разработке...
        </p>
        <p className="text-(--text-secondary) text-sm mt-2">
          Здесь будут графики продаж, популярные товары и другая статистика
        </p>
      </div>
    </div>
  );
}
