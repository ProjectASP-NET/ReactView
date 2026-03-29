"use client";
import { useRouter, useSearchParams } from "next/navigation";
export function Sort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "new";
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", newSort);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-3 rounded-xl border border-[--border] bg-[--card-bg] px-4 py-2 text-sm font-bold text-[--text-secondary]">
      <span>СОРТИРОВКА:</span>
      <select 
        value={currentSort}
        onChange={handleSortChange}
        className="appearance-none bg-transparent text-[--text-primary] outline-none cursor-pointer focus:outline-none"
      >
        <option value="new" className="bg-[--section-bg] text-[--text-primary]">Сначала новые</option>    
       <option value="old" className="bg-[--section-bg] text-[--text-primary]">Сначала старые</option>
        <option value="cheap" className="bg-[--section-bg] text-[--text-primary]">Сначала дешевые</option>
        <option value="expensive" className="bg-[--section-bg] text-[--text-primary]">Сначала дорогие</option>
   
      </select>
    </div>
  );
}
