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
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-lg text-[var(--text)] transition hover:scale-[1.02]"
      aria-label="Toggle theme"
      title="Toggle theme"
      type="button"
    >
      <span aria-hidden className="theme-icon theme-icon-moon">
        <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
          <path
            d="M21 14.5A8.5 8.5 0 0 1 9.5 3a7.5 7.5 0 1 0 11.5 11.5Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span aria-hidden className="theme-icon theme-icon-sun">
        <svg viewBox="0 0 24 24" role="presentation" aria-hidden="true">
          <circle cx="12" cy="12" r="4.5" fill="currentColor" />
          <path
            d="M12 2.5v3.1M12 18.4v3.1M4.7 4.7l2.2 2.2M17.1 17.1l2.2 2.2M2.5 12h3.1M18.4 12h3.1M4.7 19.3l2.2-2.2M17.1 6.9l2.2-2.2"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </button>
  );
}
