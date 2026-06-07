"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CategoryService } from "@/services/category.service";
import { CategoryDTO } from "@/types/product.types";

const TYPE_FILTERS = [
  { value: "all", label: "Все" },
  { value: "liquid", label: "Жидкости" },
  { value: "vape", label: "Девайсы" },
  { value: "consumables", label: "Расходники" },
];

export function Filter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get("filter") || "all";
  const currentCategoryId = searchParams.get("categoryId") || "";
  const [categories, setCategories] = useState<CategoryDTO[]>([]);

  useEffect(() => {
    CategoryService.getAll()
      .then(setCategories)
      .catch(() => {});
  }, []);

  const handleFilterChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("filter");
    } else {
      params.set("filter", value);
    }
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!value) {
      params.delete("categoryId");
    } else {
      params.set("categoryId", value);
    }
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {TYPE_FILTERS.map((filter) => (
          <button
            key={filter.value}
            onClick={() => handleFilterChange(filter.value)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              currentFilter === filter.value
                ? "bg-(--text-primary) text-(--background)"
                : "bg-(--card-bg) text-(--text-secondary) border border-(--border) hover:border-(--text-secondary)"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-(--text-muted) mr-1">Категории:</span>
          <button
            onClick={() => handleCategoryChange("")}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
              !currentCategoryId
                ? "bg-(--text-primary) text-(--background)"
                : "bg-(--card-bg) text-(--text-secondary) border border-(--border) hover:border-(--text-secondary)"
            }`}
          >
            Все
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id.toString())}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                currentCategoryId === cat.id.toString()
                  ? "bg-(--text-primary) text-(--background)"
                  : "bg-(--card-bg) text-(--text-secondary) border border-(--border) hover:border-(--text-secondary)"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
