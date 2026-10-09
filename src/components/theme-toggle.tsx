'use client';

import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

/** Dark-first: dark unless the visitor has chosen light. The class is set pre-paint in layout. */
export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {}
    setIsDark(next);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="group relative grid size-10 place-items-center rounded-full text-[var(--ink-2)] transition-colors hover:bg-[var(--line)] hover:text-[var(--ink)]"
    >
      {isDark ? (
        <Sun className="size-[18px] transition-transform duration-500 group-hover:rotate-45" />
      ) : (
        <Moon className="size-[18px] transition-transform duration-500 group-hover:-rotate-12" />
      )}
    </button>
  );
}
