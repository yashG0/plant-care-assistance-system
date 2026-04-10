"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextTheme: Theme = saved ?? (prefersDark ? "dark" : "light");
    setTheme(nextTheme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={toggle}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-strong)] text-lg text-[var(--text)] transition hover:scale-[1.02]"
      aria-label="Toggle theme"
      title="Toggle theme"
      type="button"
    >
      <span aria-hidden>{theme === "light" ? "🌙" : "☀️"}</span>
    </button>
  );
}
