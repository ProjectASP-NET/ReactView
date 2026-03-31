"use client";

import { useState } from "react";
import { useCompare } from "@/context/CompareContext";
import { MOCK_PRODUCTS } from "@/types/Products";
import { Product } from "@/types/Mockdata";
import { X, Search, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PAGES } from "@/config/pages.config";

const TYPE_FILTERS = [
  { value: "all", label: "Все" },
  { value: "liquid", label: "Жидкости" },
  { value: "vape", label: "Девайсы" },
  { value: "consumables", label: "Расходники" },
];

interface FieldConfig {
  key: string;
  label: string;
  suffix?: string;
  format: (v: unknown) => string;
}

const COMMON_FIELDS: FieldConfig[] = [
  { key: "price", label: "Цена", suffix: "MDL", format: (v) => String(v) },
  { key: "brand", label: "Бренд", format: (v) => String(v) || "—" },
  { key: "InStock", label: "Наличие", format: (v) => v ? "В наличии" : "Нет" },
];

const LIQUID_FIELDS: FieldConfig[] = [
  { key: "volume", label: "Объём", suffix: "мл", format: (v) => String(v) },
  { key: "nicotine", label: "Никотин", suffix: "мг", format: (v) => String(v) },
  { key: "Icelevel", label: "Крепость", suffix: "%", format: (v) => String(v) },
  { key: "flavor", label: "Вкусы", format: (v) => Array.isArray(v) ? v.join(", ") : "—" },
];

const VAPE_FIELDS: FieldConfig[] = [
  { key: "batteryCapacity", label: "Ёмкость батареи", suffix: "mAh", format: (v) => String(v) },
  { key: "maxPower", label: "Макс. мощность", suffix: "Вт", format: (v) => String(v) },
  { key: "TankCapacity", label: "Объём бака", suffix: "мл", format: (v) => String(v) },
  { key: "CoilResistence", label: "Сопротивление", suffix: "Ω", format: (v) => String(v) },
  { key: "color", label: "Цвет", format: (v) => String(v) || "—" },
];

export default function MatcherPage() {
  const { items, removeFromCompare, clearCompare, toggleCompare } = useCompare();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [expandedSections, setExpandedSections] = useState({
    common: true,
    specific: true,
  });

  const currentType = items[0]?.type ?? null;

  const availableProducts = MOCK_PRODUCTS.filter((product) => {
    if (currentType && product.type !== currentType) return false;
    if (typeFilter !== "all" && product.type !== typeFilter) return false;
    if (!items.some((item) => item.id === product.id)) {
      return product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             product.brand?.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return false;
  });

  const toggleSection = (section: "common" | "specific") => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const getFieldValue = (product: Product, key: string): unknown => {
    return (product as unknown as Record<string, unknown>)[key];
  };

  const renderRow = (field: FieldConfig, fieldKey: string) => {
    const values = items.map((item) => field.format(getFieldValue(item, fieldKey)));
    const uniqueValues = new Set(values);
    const hasDifference = uniqueValues.size > 1;

    return (
      <tr key={fieldKey} className="border-b border-(--border)">
        <td className="py-3 pr-4 text-sm font-medium text-(--text-secondary)">
          {field.label}
        </td>
        {items.map((item, idx) => (
          <td
            key={item.id}
            className={`py-3 px-4 text-center text-sm ${
              hasDifference ? "bg-amber-500/10 font-medium" : ""
            }`}
          >
            {values[idx]}{field.suffix ? ` ${field.suffix}` : ""}
          </td>
        ))}
        {Array.from({ length: 4 - items.length }).map((_, idx) => (
          <td key={`empty-${idx}`} className="py-3 px-4" />
        ))}
      </tr>
    );
  };

  const renderSpecificRows = () => {
    if (currentType === "liquid") {
      return LIQUID_FIELDS.map((field) => renderRow(field, field.key));
    }
    if (currentType === "vape") {
      return VAPE_FIELDS.map((field) => renderRow(field, field.key));
    }
    return null;
  };

  const getSpecificFieldsLabel = () => {
    if (currentType === "liquid") return "Характеристики жидкости";
    if (currentType === "vape") return "Характеристики девайса";
    return "Характеристики";
  };

  return (
    <main className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="mb-12 flex flex-col gap-6 border-b border-(--border) pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            СРАВНЕНИЕ <span className="text-(--text-muted)">ТОВАРОВ</span>
          </h1>
          <p className="mt-4 text-lg text-(--text-secondary)">
            Выберите до 4 товаров одного типа для сравнения
          </p>
        </div>
        {items.length > 0 && (
          <button
            onClick={clearCompare}
            className="flex items-center gap-2 rounded-xl border border-red-500/50 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-500/20"
          >
            <Trash2 size={16} />
            Очистить всё
          </button>
        )}
      </div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-(--text-muted)"
          />
          <input
            type="text"
            placeholder="Поиск по названию или бренду..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-12 w-full rounded-xl border border-(--border) bg-(--card-bg) pl-11 pr-4 text-sm outline-none transition-colors focus:border-(--text-secondary)"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {TYPE_FILTERS.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setTypeFilter(filter.value)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                typeFilter === filter.value
                  ? "bg-(--text-primary) text-(--background)"
                  : "bg-(--card-bg) text-(--text-secondary) border border-(--border) hover:border-(--text-secondary)"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {items.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 text-lg font-bold text-(--text-secondary)">
            Выбранные товары ({items.length}/4)
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {items.map((product) => (
              <div
                key={product.id}
                className="relative shrink-0 w-48 rounded-2xl border border-(--border) bg-(--card-bg) p-4"
              >
                <button
                  onClick={() => removeFromCompare(product.id)}
                  className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition-transform hover:scale-110"
                >
                  <X size={14} />
                </button>
                <div className="relative mb-3 aspect-square w-full overflow-hidden rounded-xl bg-black/50">
                  <Image
                    src={product.img}
                    alt={product.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <p className="text-xs text-(--text-muted)">{product.brand}</p>
                <h3 className="text-sm font-bold line-clamp-1">{product.name}</h3>
                <p className="mt-1 text-lg font-black">
                  {product.price}{" "}
                  <span className="text-xs font-light text-(--text-muted)">MDL</span>
                </p>
              </div>
            ))}
            {Array.from({ length: 4 - items.length }).map((_, idx) => (
              <div
                key={`empty-${idx}`}
                className="shrink-0 w-48 rounded-2xl border border-dashed border-(--border) bg-(--card-bg)/50 p-4 flex items-center justify-center"
              >
                <p className="text-sm text-(--text-muted)">Пусто</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {availableProducts.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 text-lg font-bold text-(--text-secondary)">
            Добавить товары
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {availableProducts.slice(0, 12).map((product) => (
              <button
                key={product.id}
                onClick={() => toggleCompare(product)}
                className="group relative flex flex-col rounded-xl border border-(--border) bg-(--card-bg) p-3 transition-all hover:border-(--text-secondary)"
              >
                <div className="relative mb-2 aspect-square w-full overflow-hidden rounded-lg bg-black/50">
                  <Image
                    src={product.img}
                    alt={product.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <p className="text-[10px] text-(--text-muted) line-clamp-1">
                  {product.brand}
                </p>
                <h3 className="text-xs font-bold line-clamp-1">{product.name}</h3>
                <p className="text-sm font-black">
                  {product.price}{" "}
                  <span className="text-[10px] font-light text-(--text-muted)">
                    MDL
                  </span>
                </p>
              </button>
            ))}
          </div>
        </section>
      )}

      {items.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 rounded-3xl border border-dashed border-(--border)">
          <p className="text-xl font-bold text-(--text-secondary)">
            Выберите товары для сравнения
          </p>
          <p className="mt-2 text-sm text-(--text-muted)">
            Добавьте товары из каталога или поиска выше
          </p>
          <Link
            href={PAGES.CATALOG}
            className="mt-6 rounded-xl bg-(--text-primary) px-6 py-3 text-sm font-bold text-(--background) transition-colors hover:bg-(--text-secondary)"
          >
            Перейти в каталог
          </Link>
        </div>
      )}

      {items.length >= 2 && (
        <section>
          <h2 className="mb-6 text-xl font-bold text-(--text-secondary)">
            Сравнение характеристик
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-(--border)">
            <table className="w-full">
              <thead>
                <tr className="border-b border-(--border) bg-(--card-bg)">
                  <th className="py-4 pr-4 text-left text-sm font-bold text-(--text-muted) w-40">
                    Характеристика
                  </th>
                  {items.map((item) => (
                    <th
                      key={item.id}
                      className="py-4 px-4 text-center text-sm font-bold"
                    >
                      <Link
                        href={PAGES.getProduct(item.id)}
                        className="hover:text-(--text-secondary)"
                      >
                        {item.name}
                      </Link>
                    </th>
                  ))}
                  {Array.from({ length: 4 - items.length }).map((_, idx) => (
                    <th key={`empty-${idx}`} className="py-4 px-4" />
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={5} className="py-2" />
                </tr>
                <tr className="border-b border-(--border)">
                  <td colSpan={5} className="py-2 px-4">
                    <button
                      onClick={() => toggleSection("common")}
                      className="flex items-center gap-2 text-sm font-bold text-(--text-primary)"
                    >
                      {expandedSections.common ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                      Основное
                    </button>
                  </td>
                </tr>
                {expandedSections.common &&
                  COMMON_FIELDS.map((field) => renderRow(field, field.key))}

                {currentType !== "consumables" && (
                  <>
                    <tr>
                      <td colSpan={5} className="py-2" />
                    </tr>
                    <tr className="border-b border-(--border)">
                      <td colSpan={5} className="py-2 px-4">
                        <button
                          onClick={() => toggleSection("specific")}
                          className="flex items-center gap-2 text-sm font-bold text-(--text-primary)"
                        >
                          {expandedSections.specific ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          )}
                          {getSpecificFieldsLabel()}
                        </button>
                      </td>
                    </tr>
                    {expandedSections.specific && renderSpecificRows()}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </main>
  );
}
