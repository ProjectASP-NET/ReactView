"use client";

import { useEffect, useState } from "react";
import { Search, Plus } from "lucide-react";
import Link from "next/link";

export default function ProductsPage() {
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
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-(--text-primary)">
            Товары
          </h1>
          <p className="text-(--text-secondary) mt-2">
            Управление товарами магазина
          </p>
        </div>
        <Link
          href="/admin/products/create"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-(--accent) text-white font-semibold hover:opacity-90 transition-opacity"
        >
          <Plus size={20} />
          Добавить товар
        </Link>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-secondary)" size={20} />
          <input
            type="text"
            placeholder="Поиск товаров..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-(--card-bg) border border-(--border) text-(--text-primary) placeholder:text-(--text-secondary)/50 focus:outline-none focus:border-(--accent)"
          />
        </div>
      </div>

      <div className="bg-(--card-bg) border border-(--border) rounded-2xl p-8 text-center">
        <p className="text-(--text-secondary) text-lg">
          Модуль управления товарами в разработке...
        </p>
        <p className="text-(--text-secondary) text-sm mt-2">
          Здесь будет список всех товаров с возможностью редактирования и удаления
        </p>
      </div>
    </div>
  );
}
