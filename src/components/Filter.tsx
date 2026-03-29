"use client";
import { useRouter, useSearchParams } from "next/navigation";

const FILTERS = [
  { value: "all", label: "Все" },
  { value: "liquid", label: "Жидкости" },
  { value: "vape", label: "Девайсы" },
  { value: "consumables", label: "Расходники" },
];

export function Filter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get("filter") || "all";

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
              ? "bg-[var(--text-primary)] text-[var(--background)]"
              : "bg-[var(--card-bg)] text-[var(--text-secondary)] border border-[var(--border)] hover:border-[var(--text-secondary)]"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
