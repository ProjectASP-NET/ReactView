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
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-white/60">
      <span>СОРТИРОВКА:</span>
      <select 
        value={currentSort}
        onChange={handleSortChange}
        className=" appearance-none bg-transparent text-white outline-none cursor-pointer focus:outline-none"
      >
        <option value="new" className="bg-[#0a0a0a] text-white">Сначала новые</option>    
       <option value="old" className="bg-[#0a0a0a] text-white">Сначала старые</option>
        <option value="cheap" className="bg-[#0a0a0a] text-white">Сначала дешевые</option>
        <option value="expensive" className="bg-[#0a0a0a] text-white">Сначала дорогие</option>
   
      </select>
    </div>
  );
}