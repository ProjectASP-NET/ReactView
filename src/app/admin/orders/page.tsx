"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";

export default function OrdersPage() {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

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
          Заказы
        </h1>
        <p className="text-(--text-secondary) mt-2">
          Управление заказами клиентов
        </p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-secondary)" size={20} />
          <input
            type="text"
            placeholder="Поиск заказов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-(--card-bg) border border-(--border) text-(--text-primary) placeholder:text-(--text-secondary)/50 focus:outline-none focus:border-(--accent)"
          />
        </div>
      </div>

      <div className="bg-(--card-bg) border border-(--border) rounded-2xl p-8 text-center">
        <p className="text-(--text-secondary) text-lg">
          Модуль управления заказами в разработке...
        </p>
        <p className="text-(--text-secondary) text-sm mt-2">
          Здесь будет список всех заказов с возможностью изменения статуса
        </p>
      </div>
    </div>
  );
}
