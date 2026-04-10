"use client";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const toggle = () => {
    const current =
      (document.documentElement.getAttribute("data-theme") as Theme | null) ?? "light";
    const next: Theme = current === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  return (
    <button
      onClick={toggle}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-strong)] text-lg text-[var(--text)] transition hover:scale-[1.02]"
      aria-label="Toggle theme"
      title="Toggle theme"
      type="button"
    >
      <span aria-hidden className="theme-icon theme-icon-moon">
        🌙
      </span>
      <span aria-hidden className="theme-icon theme-icon-sun">
        ☀️
      </span>
    </button>
  );
}
