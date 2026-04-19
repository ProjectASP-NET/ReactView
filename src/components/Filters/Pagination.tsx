"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface PaginationProps {
  totalItems: number;
  itemsPerPage?: number;
}

export function Pagination({ totalItems, itemsPerPage = 20 }: PaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const pageParam = searchParams.get("page");
  const currentPage = pageParam ? parseInt(pageParam) : 1;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPageParams = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handlePageChange = (page: number) => {
    router.push(getPageParams(page), { scroll: false });
  };

  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getVisiblePages = () => {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <div className="text-sm text-(--text-secondary)">
        Показано {startItem}–{endItem} из {totalItems} товаров
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-xl bg-(--card-bg) text-(--text) disabled:opacity-40 disabled:cursor-not-allowed hover:bg-(--primary) transition-colors"
        >
          ← Предыдущая
        </button>

        <div className="flex items-center gap-1">
          {getVisiblePages().map((page, idx) => (
            page === "..." ? (
              <span key={idx} className="px-3 py-2 text-(--text-muted)">...</span>
            ) : (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`min-w-10 px-3 py-2 rounded-xl transition-colors ${
                  page === currentPage
                    ? "bg-(--primary) text-white"
                    : "bg-(--card-bg) text-(--text) hover:bg-(--primary)"
                }`}
              >
                {page}
              </button>
            )
          ))}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-xl bg-(--card-bg) text-(--text) disabled:opacity-40 disabled:cursor-not-allowed hover:bg-(--primary) transition-colors"
        >
          Следующая →
        </button>
      </div>
    </div>
  );
}