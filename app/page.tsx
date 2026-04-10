import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const showcase = [
  {
    title: "Leaf Health",
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Indoor Care",
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Growth Tracking",
    image:
      "https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&w=900&q=80",
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-6 md:px-10 md:py-8">
      <header className="fade-up glass flex items-center justify-between rounded-2xl px-4 py-3 md:px-6">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
            Presentation Demo
          </p>
          <p className="text-lg font-bold md:text-xl">Plant Care Assistant</p>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/chat"
            className="rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--primary-strong)]"
          >
            Launch Chat
          </Link>
        </div>
      </header>

      <section className="mt-8 grid gap-7 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="fade-up-delay">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--chip)] px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
            AI Plant Companion
          </span>
          <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
            Beautiful plant care guidance,
            <span className="block text-[var(--primary)]">designed for your demo day.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base text-[var(--muted)] md:text-lg">
            A polished frontend experience with chat-style assistance, animated visuals,
            clean auth screens, and dark/light themes. No API key needed for the demo.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/auth/register"
              className="rounded-xl bg-[var(--primary)] px-6 py-3 font-semibold text-white transition hover:bg-[var(--primary-strong)]"
            >
              Create Account
            </Link>
            <Link
              href="/auth/login"
              className="rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] px-6 py-3 font-semibold transition hover:scale-[1.02]"
            >
              Sign In
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="glass rounded-2xl p-4">
              <p className="text-3xl font-black">12+</p>
              <p className="text-sm text-[var(--muted)]">Plant care categories</p>
            </div>
            <div className="glass rounded-2xl p-4">
              <p className="text-3xl font-black">24/7</p>
              <p className="text-sm text-[var(--muted)]">Interactive helper UI</p>
            </div>
            <div className="glass rounded-2xl p-4">
              <p className="text-3xl font-black">100%</p>
              <p className="text-sm text-[var(--muted)]">Frontend ready showcase</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="pulse-soft absolute -left-10 -top-8 h-32 w-32 rounded-full bg-[var(--secondary)]/20 blur-2xl" />
          <div className="float absolute -right-6 top-8 h-28 w-28 rounded-full bg-[var(--primary)]/30 blur-2xl" />
          <div className="glass relative overflow-hidden rounded-3xl p-4">
            <img
              src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1200&q=80"
              alt="A healthy green plant"
              className="h-[300px] w-full rounded-2xl object-cover"
            />
            <div className="mt-4 grid grid-cols-2 gap-3">
              {showcase.map((item) => (
                <div key={item.title} className="rounded-2xl bg-[var(--surface-strong)] p-2">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-24 w-full rounded-xl object-cover"
                  />
                  <p className="px-1 pb-1 pt-2 text-xs font-semibold tracking-wide text-[var(--muted)]">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
