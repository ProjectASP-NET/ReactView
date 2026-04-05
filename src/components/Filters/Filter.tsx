"use client";
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from "next/navigation";

export function Filter() {
  const t = useTranslations('Filter');
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get("filter") || "all";

  const FILTERS = [
    { value: "all", label: t('all') },
    { value: "liquid", label: t('liquid') },
    { value: "vape", label: t('vape') },
    { value: "consumables", label: t('consumables') },
  ];

  const handleFilterChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("filter");
    } else {
      params.set("filter", value);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map((filter) => (
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
  );
}
