"use client";

import { useEffect, useState } from "react";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { Link } from 'next-view-transitions';
import { AdminProductService } from "@/services/admin/product.service";
import { ProductUnion, isLiquid, isVape } from "@/types/product.types";
import { PAGES } from "@/config/pages.config";
import { Dropdown } from "@/components/UI/Dropdown";

type ProductType = "all" | "Liquid" | "Vape" | "Consumable";

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductUnion[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<ProductType>("all");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await AdminProductService.getAll();
      setProducts(data);
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Вы уверены, что хотите удалить этот товар?")) return;
    try {
      await AdminProductService.delete(id);
      setProducts(products.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("Ошибка при удалении товара");
    }
  };

  const getProductType = (product: ProductUnion): ProductType => {
    if (isLiquid(product)) return "Liquid";
    if (isVape(product)) return "Vape";
    return "Consumable";
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || getProductType(product) === typeFilter;
    return matchesSearch && matchesType;
  });

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
          <h1 className="text-4xl font-black text-(--text-primary)">Товары</h1>
          <p className="text-(--text-secondary) mt-2">Управление товарами магазина</p>
        </div>
        <Link
          href={PAGES.ADMIN_PRODUCTS_CREATE}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-(--accent) text-white font-semibold hover:opacity-90 transition-opacity"
        >
          <Plus size={20} />
          Добавить товар
        </Link>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-secondary)" size={20} />
          <input
            type="text"
            placeholder="Поиск товаров..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-(--card-bg) border border-(--border) text-(--text-primary) placeholder:text-(--text-secondary)/50 focus:outline-none focus:border-(--accent)"
          />
        </div>
        <Dropdown
          options={[
            { value: "all", label: "Все типы" },
            { value: "Liquid", label: "Liquid" },
            { value: "Vape", label: "Vape" },
            { value: "Consumable", label: "Consumable" },
          ]}
          value={typeFilter}
          onChange={(v) => setTypeFilter(v as ProductType)}
          className="w-40"
        />
      </div>

      <div className="bg-(--card-bg) border border-(--border) rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-(--border)">
              <th className="text-left p-4 text-sm font-medium text-(--text-secondary)">ID</th>
              <th className="text-left p-4 text-sm font-medium text-(--text-secondary)">Название</th>
              <th className="text-left p-4 text-sm font-medium text-(--text-secondary)">Тип</th>
              <th className="text-left p-4 text-sm font-medium text-(--text-secondary)">Цена</th>
              <th className="text-left p-4 text-sm font-medium text-(--text-secondary)">В наличии</th>
              <th className="text-left p-4 text-sm font-medium text-(--text-secondary)">Лайки</th>
              <th className="text-right p-4 text-sm font-medium text-(--text-secondary)">Действия</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-(--text-secondary)">
                  Товары не найдены
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-(--border) hover:bg-(--background)/50">
                  <td className="p-4 text-sm text-(--text-primary)">{product.id}</td>
                  <td className="p-4 text-sm font-medium text-(--text-primary)">{product.name}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      isLiquid(product) ? "bg-blue-100 text-blue-700" :
                      isVape(product) ? "bg-purple-100 text-purple-700" :
                      "bg-green-100 text-green-700"
                    }`}>
                      {getProductType(product)}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-(--text-primary)">{product.price.toLocaleString()} MDL</td>
                  <td className="p-4 text-sm text-(--text-primary)">{product.stockQuantity}</td>
                  <td className="p-4 text-sm text-(--text-primary)">{product.likeCount}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${product.id}/edit?type=${getProductType(product)}`}
                        className="p-2 rounded-lg hover:bg-(--background) text-(--text-secondary) hover:text-(--accent) transition-colors"
                      >
                        <Edit size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 rounded-lg hover:bg-(--background) text-(--text-secondary) hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
