"use client";

import Link from "next/link";
import { FormEvent, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type DemoAuthUser = {
  id: string;
  fullName: string;
  email: string;
};

const mockReplies = [
  "Your plant likely needs brighter indirect light. Move it near a window with filtered sunlight.",
  "Water when the top inch of soil becomes dry. Avoid fixed daily watering schedules.",
  "Trim damaged leaves and improve airflow around the pot to reduce stress and fungal risk.",
  "Use a balanced liquid fertilizer every 2-3 weeks during active growth for better results.",
];

const quickPrompts = [
  "Yellow leaves on money plant",
  "How often should I water aloe vera?",
  "Why are my snake plant tips turning brown?",
  "What is the best soil mix for monstera?",
];

function useDemoUser() {
  const rawUser = useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") return () => {};
      const onChange = () => callback();
      window.addEventListener("storage", onChange);
      window.addEventListener("demo-auth", onChange);
      return () => {
        window.removeEventListener("storage", onChange);
        window.removeEventListener("demo-auth", onChange);
      };
    },
    () => {
      if (typeof window === "undefined") return "";
      return sessionStorage.getItem("demoAuthUser") ?? "";
    },
    () => ""
  );

  if (!rawUser) return null;

  try {
    return JSON.parse(rawUser) as DemoAuthUser;
  } catch {
    return null;
  }
}

function useDemoGuest() {
  const rawGuest = useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") return () => {};
      const onChange = () => callback();
      window.addEventListener("storage", onChange);
      window.addEventListener("demo-auth", onChange);
      return () => {
        window.removeEventListener("storage", onChange);
        window.removeEventListener("demo-auth", onChange);
      };
    },
    () => {
      if (typeof window === "undefined") return "";
      return sessionStorage.getItem("demoGuest") ?? "";
    },
    () => ""
  );

  return rawGuest === "true";
}

export function ChatShell() {
  const router = useRouter();
  const user = useDemoUser();
  const isGuest = useDemoGuest();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content:
        "Hello. I am your Plant Care Assistant. Ask about watering, light, pests, or plant recovery steps.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [replyCursor, setReplyCursor] = useState(0);

  const submitMessage = async (text: string) => {
    const value = text.trim();
    if (value.length === 0 || loading) return;

    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", content: value },
    ]);
    setInput("");
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 650));
    const reply = mockReplies[replyCursor % mockReplies.length];

    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "assistant", content: reply },
    ]);
    setReplyCursor((prev) => prev + 1);
    setLoading(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submitMessage(input);
  };

  const signOut = () => {
    sessionStorage.removeItem("demoAuthUser");
    localStorage.removeItem("demoAuthUser");
    window.dispatchEvent(new Event("demo-auth"));
    router.push("/auth/login");
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-6 md:px-8 md:py-8">
      <header className="surface flex flex-wrap items-center justify-between gap-3 rounded-2xl px-4 py-3 md:px-5">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-muted">Plant Care Chat</p>
          <h1 className="text-2xl">AI Assistant Workspace</h1>
          {user ? (
            <p className="text-sm text-muted">Welcome back, {user.fullName}.</p>
          ) : isGuest ? (
            <p className="text-sm text-muted">Guest mode active.</p>
          ) : (
            <p className="text-sm text-muted">Sign in to personalize your experience.</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/"
            className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-semibold"
          >
            Home
          </Link>
          {user ? (
            <button
              onClick={signOut}
              className="rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white"
            >
              Sign Out
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  sessionStorage.setItem("demoGuest", "true");
                  window.dispatchEvent(new Event("demo-auth"));
                }}
                className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs font-semibold text-muted"
              >
                Continue as Guest
              </button>
              <Link
                href="/auth/login"
                className="rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </header>

      <section className="mt-5 grid flex-1 gap-4 lg:grid-cols-[270px_1fr]">
        <aside className="surface-soft rounded-2xl p-4">
          <h2 className="text-base">Quick Prompts</h2>
          <div className="mt-3 space-y-2">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => submitMessage(prompt)}
                type="button"
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-left text-sm transition hover:border-[var(--primary)]"
              >
                {prompt}
              </button>
            ))}
          </div>

          {user ? (
            <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">Profile</p>
              <p className="mt-1 text-sm font-semibold">{user.fullName}</p>
              <p className="text-xs text-muted">{user.email}</p>
            </div>
          ) : (
            <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">
                {isGuest ? "Guest Mode Active" : "Guest Mode"}
              </p>
              <p className="mt-1 text-sm text-muted">
                {isGuest
                  ? "You are browsing as guest. Sign in to save history."
                  : "Sign in to unlock saved chat history and personalized guidance."}
              </p>
            </div>
          )}
        </aside>

        <div className="surface flex min-h-[70vh] flex-col rounded-2xl p-3 md:p-4">
          <div className="flex-1 space-y-3 overflow-y-auto rounded-xl bg-[var(--surface-soft)] p-3 md:p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm md:text-base ${
                  message.role === "user"
                    ? "ml-auto bg-[var(--primary)] text-white"
                    : "bg-[var(--surface)] text-[var(--text)]"
                }`}
              >
                {message.content}
              </div>
            ))}

            {loading ? (
              <div className="max-w-[88%] rounded-2xl bg-[var(--surface)] px-4 py-3 text-sm text-muted">
                Thinking...
              </div>
            ) : null}
          </div>

          <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={
                user
                  ? "Ask about watering, soil, sunlight, or pests..."
                  : isGuest
                  ? "Continue as guest. Ask your plant question..."
                  : "Sign in to personalize your plant care guidance..."
              }
              className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 outline-none transition focus:border-[var(--primary)]"
            />
            <button
              disabled={loading}
              className="rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--primary-strong)] disabled:opacity-60"
            >
              Send
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
