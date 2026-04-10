import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const highlights = [
  "Personalized guidance by profile",
  "Clean conversational assistant",
  "Structured next steps for care",
];

const modules = [
  {
    title: "Plant Health",
    text: "Diagnose stress patterns and improve recovery.",
  },
  {
    title: "Watering Plans",
    text: "Balanced schedules based on plant type and season.",
  },
  {
    title: "Lighting Setup",
    text: "Optimize indoor light placement for growth.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8 md:py-10">
      <header className="surface flex flex-wrap items-center justify-between gap-3 rounded-2xl px-4 py-3 md:px-6">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Plant Care Assistant</p>
          <p className="text-base font-semibold md:text-lg">AI-Powered Plant Support</p>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/chat"
            className="rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--primary-strong)]"
          >
            Open Chat
          </Link>
        </div>
      </header>

      <section className="mt-8 grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <h1 className="text-4xl leading-tight md:text-6xl">Grow healthier plants with confident daily care.</h1>
          <p className="mt-4 max-w-xl text-base text-muted md:text-lg">
            A clean and modern web interface for plant care guidance, designed for clear
            communication, better decisions, and a professional presentation experience.
          </p>

          <ul className="mt-6 space-y-2">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm md:text-base">
                <span className="inline-block h-2 w-2 rounded-full bg-[var(--primary)]" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/auth/register"
              className="rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--primary-strong)]"
            >
              Create Account
            </Link>
            <Link
              href="/auth/login"
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold transition hover:bg-[var(--surface-soft)]"
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="surface rounded-3xl p-3">
          <div className="surface-soft overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1400&q=80"
              alt="Young plant seedlings"
              className="h-[240px] w-full object-cover sm:h-[280px] md:h-[320px]"
            />
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="surface-soft rounded-2xl p-3">
              <p className="text-sm font-semibold">Leaf Health</p>
              <p className="mt-1 text-xs text-muted">Identify stress and prevent damage.</p>
            </div>
            <div className="surface-soft rounded-2xl p-3">
              <p className="text-sm font-semibold">Watering Guidance</p>
              <p className="mt-1 text-xs text-muted">Adapt schedules for indoor conditions.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {modules.map((feature) => (
          <article key={feature.title} className="surface-soft rounded-2xl p-4">
            <h2 className="text-xl">{feature.title}</h2>
            <p className="mt-2 text-sm text-muted">{feature.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
