"use client";

import { Search } from "lucide-react";

export function SearchBar() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center gap-3 h-11 md:h-12 px-4 rounded-full border border-[rgba(23,251,248,0.4)] bg-[#050608] text-[var(--color-brand-200)]">
        <Search className="w-4 h-4" />
        <input
          type="search"
          placeholder="Search..."
          className="flex-1 bg-transparent outline-none border-none text-sm md:text-base placeholder:text-[var(--color-brand-400)] uppercase"
        />
      </div>
    </div>
  );
}
