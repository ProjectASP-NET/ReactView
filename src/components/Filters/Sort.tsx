"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { Listbox, Transition } from "@headlessui/react";

const SORT_OPTIONS = [
  { value: "new", label: "Сначала новые" },
  { value: "old", label: "Сначала старые" },
  { value: "cheap", label: "Сначала дешевые" },
  { value: "expensive", label: "Сначала дорогие" },
  { value: "mliked", label: "Сначала популярные" },
  { value: "lliked", label: "Сначала непопулярные" },
];

export function Sort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "new";

  const currentOption = SORT_OPTIONS.find((opt) => opt.value === currentSort) || SORT_OPTIONS[0];

  const handleSortChange = (option: { value: string; label: string }) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", option.value);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-3 rounded-full border border-(--border) bg-[rgba(255,255,255,0.05)] px-4 py-2 text-sm font-bold text-[rgba(255,255,255,0.6)]">
      <span className="text-xs font-medium uppercase tracking-widest text-[rgba(255,255,255,0.4)]">СОРТИРОВКА:</span>
      <Listbox value={currentOption} onChange={handleSortChange}>
        <div className="relative">
          <Listbox.Button className="relative flex items-center gap-2 cursor-pointer rounded-lg py-1 pl-2 pr-8 text-left text-sm font-bold text-[rgba(255,255,255,0.9)] outline-none">
            <span>{currentOption.label}</span>
            <ChevronDown size={14} className="text-[rgba(255,255,255,0.6)]" />
          </Listbox.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-2 w-48 overflow-auto rounded-xl border border-(--border) bg-[rgba(20,20,20,0.95)] py-1 shadow-xl backdrop-blur-md">
              {SORT_OPTIONS.map((option) => (
                <Listbox.Option
                  key={option.value}
                  value={option}
                  className={({ active }: { active: boolean }) =>
                    `relative cursor-pointer select-none py-2.5 pl-3 pr-8 text-sm font-medium ${
                      active
                        ? "bg-[rgba(255,255,255,0.1)] text-white"
                        : "text-[rgba(255,255,255,0.7)]"
                    }`
                  }
                >
                  {({ selected }: { selected: boolean }) => (
                    <>
                      <span className={`block ${selected ? "text-white" : ""}`}>
                        {option.label}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 text-white">
                          ✓
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}