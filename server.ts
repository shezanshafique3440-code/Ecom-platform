'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

interface Suggestion {
  id: string;
  title: string;
  slug: string;
  basePrice: string;
}

export function Header() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      return;
    }
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products/autocomplete?q=${encodeURIComponent(query)}`,
        );
        const data = await res.json();
        setSuggestions(data.items ?? []);
        setOpen(true);
      } catch {
        setSuggestions([]);
      }
    }, 250);
  }, [query]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur dark:border-white/10 dark:bg-ink/90">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 py-3 sm:px-6 lg:px-8">
        <a href="/" className="font-display text-2xl font-semibold tracking-tight text-plum-700 dark:text-marigold-300">
          Haat
        </a>

        <div className="relative flex-1 max-w-xl">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => suggestions.length && setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            placeholder="Search for anything…"
            aria-label="Search products"
            className="w-full rounded-full border border-line bg-white px-4 py-2 text-sm text-ink placeholder:text-ink/40 focus:border-plum-300 dark:border-white/10 dark:bg-white/5 dark:text-white"
          />
          {open && suggestions.length > 0 && (
            <ul
              role="listbox"
              className="absolute mt-2 w-full overflow-hidden rounded-xl border border-line bg-white shadow-lg dark:border-white/10 dark:bg-[#241B31]"
            >
              {suggestions.map((s) => (
                <li key={s.id}>
                  <a
                    href={`/products/${s.slug}`}
                    className="flex items-center justify-between px-4 py-2 text-sm hover:bg-marigold-100/60 dark:hover:bg-white/5"
                  >
                    <span>{s.title}</span>
                    <span className="font-mono text-xs text-ink/60 dark:text-white/50">${s.basePrice}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav className="hidden items-center gap-5 text-sm font-medium sm:flex">
          <a href="/wishlist" aria-label="Wishlist" className="hover:text-plum-500">Wishlist</a>
          <a href="/cart" aria-label="Cart" className="hover:text-plum-500">Cart</a>
          <a href="/account" aria-label="Account" className="hover:text-plum-500">Account</a>
          <a
            href="/vendor/apply"
            className="rounded-full bg-plum-500 px-4 py-2 text-white transition hover:bg-plum-700"
          >
            Sell on Haat
          </a>
        </nav>

        {mounted && (
          <button
            aria-label="Toggle dark mode"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="rounded-full border border-line p-2 text-xs dark:border-white/10"
          >
            {resolvedTheme === 'dark' ? '☀️' : '🌙'}
          </button>
        )}
      </div>
    </header>
  );
}
