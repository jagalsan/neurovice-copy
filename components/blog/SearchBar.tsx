"use client";

import { Search } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [searchValue, setSearchValue] = useState(searchParams.get("search") ?? "");
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip the effect on first render to avoid unnecessary URL update
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      const currentSearch = searchParams.get("search") ?? "";
      const newSearch = searchValue.trim();
      
      // Only update URL if the search value actually changed
      if (currentSearch !== newSearch) {
        if (newSearch) {
          params.set("search", newSearch);
          params.delete("page"); // Reset to first page on new search
        } else {
          params.delete("search");
          params.delete("page");
        }
        
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      }
    }, 800); // Increased debounce to 800ms for better UX

    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  const isSearching = searchValue !== (searchParams.get("search") ?? "");

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center gap-3 h-11 md:h-12 px-4 rounded-full border border-[rgba(23,251,248,0.4)] bg-[#050608] text-[var(--color-brand-200)]">
        <Search className={`w-4 h-4 ${isSearching ? 'animate-pulse text-[var(--color-brand-500)]' : ''}`} />
        <input
          type="search"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="flex-1 bg-transparent outline-none border-none text-sm md:text-base placeholder:text-[var(--color-brand-400)] uppercase"
        />
      </div>
    </div>
  );
}
