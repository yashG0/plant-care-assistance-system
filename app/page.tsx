import Link from "next/link";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const showcase = [
  {
    title: "Leaf Analysis",
    subtitle: "Identify stress patterns early",
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Indoor Optimization",
    subtitle: "Light and watering balance",
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Growth Monitoring",
    subtitle: "Track progress over time",
    image:
      "https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&w=900&q=80",
  },
];

const featureCards = [
  {
    title: "Conversational Guidance",
    description: "Ask natural questions and receive step-by-step plant care suggestions.",
  },
  {
    title: "Personalized Recommendations",
    description: "Support adapts to user profile, location, and plant care experience level.",
  },
  {
    title: "Structured Chat Experience",
    description: "Clear message bubbles, quick prompts, and readable response flow.",
  },
  {
    title: "Secure User Access",
    description: "Dedicated sign-in and account creation screens ready for auth integration.",
  },
];

const workflow = [
  {
    step: "01",
    title: "Create Profile",
    detail: "Enter name, email, and optional care preferences.",
  },
  {
    step: "02",
    title: "Start Conversation",
    detail: "Describe plant issues such as yellow leaves or overwatering concerns.",
  },
  {
    step: "03",
    title: "Apply Recommendations",
    detail: "Follow practical care steps for lighting, soil, watering, and maintenance.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-5 md:px-8 md:py-8">
      <header className="fade-up glass flex flex-wrap items-center justify-between gap-3 rounded-2xl px-4 py-3 md:px-6">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
            Intelligent Care Platform
          </p>
          <p className="text-lg font-bold md:text-xl">Plant Care Assistant</p>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/chat"
            className="rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--primary-strong)]"
          >
            Launch Chat
          </Link>
        </div>
      </header>

      <section className="mt-7 grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
        <div className="fade-up-delay">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--chip)] px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
            AI-Driven Plant Support
          </span>
          <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
            Smarter plant care,
            <span className="block text-[var(--primary)]">designed for consistency and clarity.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base text-[var(--muted)] md:text-lg">
            This interface presents a professional user journey for plant care guidance,
            from account creation to conversational assistance and actionable advice.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/auth/register"
              className="rounded-xl bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--primary-strong)]"
            >
              Create Account
            </Link>
            <Link
              href="/auth/login"
              className="rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] px-6 py-3 text-sm font-semibold transition hover:scale-[1.02]"
            >
              Sign In
            </Link>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="glass rounded-2xl p-4">
              <p className="text-xl font-black md:text-2xl">Profile-Aware</p>
              <p className="mt-1 text-xs text-[var(--muted)] md:text-sm">User context support</p>
            </div>
            <div className="glass rounded-2xl p-4">
              <p className="text-xl font-black md:text-2xl">Responsive</p>
              <p className="mt-1 text-xs text-[var(--muted)] md:text-sm">Mobile to desktop optimized</p>
            </div>
            <div className="glass rounded-2xl p-4">
              <p className="text-xl font-black md:text-2xl">Theme-Ready</p>
              <p className="mt-1 text-xs text-[var(--muted)] md:text-sm">Persistent dark/light mode</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="pulse-soft absolute -left-7 -top-6 h-24 w-24 rounded-full bg-[var(--secondary)]/25 blur-2xl" />
          <div className="float absolute -right-6 top-6 h-20 w-20 rounded-full bg-[var(--primary)]/25 blur-2xl" />
          <div className="glass relative overflow-hidden rounded-3xl p-3 md:p-4">
            <img
              src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1200&q=80"
              alt="Healthy seedlings"
              className="h-52 w-full rounded-2xl object-cover sm:h-64 md:h-[300px]"
            />
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {showcase.map((item) => (
                <article key={item.title} className="rounded-2xl bg-[var(--surface-strong)] p-2.5">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-24 w-full rounded-xl object-cover"
                  />
                  <h3 className="px-1 pt-2 text-sm font-semibold">{item.title}</h3>
                  <p className="px-1 pb-1 text-xs text-[var(--muted)]">{item.subtitle}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {featureCards.map((card) => (
          <article key={card.title} className="glass rounded-2xl p-4">
            <h2 className="text-base font-bold">{card.title}</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">{card.description}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 glass rounded-3xl p-4 md:p-6">
        <h2 className="text-xl font-black md:text-2xl">How It Works</h2>
        <p className="mt-1 text-sm text-[var(--muted)] md:text-base">
          Clean onboarding and conversation flow for presenting the complete user journey.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {workflow.map((item) => (
            <article key={item.step} className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-4">
              <p className="text-xs font-bold tracking-[0.18em] text-[var(--primary)]">{item.step}</p>
              <h3 className="mt-1 text-base font-bold">{item.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
