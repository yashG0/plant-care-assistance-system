"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
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

export function ChatShell() {
  const router = useRouter();
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
    localStorage.removeItem("demoAuthUser");
    router.push("/auth/login");
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-6 md:px-8 md:py-8">
      <header className="surface flex flex-wrap items-center justify-between gap-3 rounded-2xl px-4 py-3 md:px-5">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-muted">Plant Care Chat</p>
          <h1 className="text-2xl">AI Assistant Workspace</h1>
          <p className="text-sm text-muted">Demo conversation interface</p>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/"
            className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-semibold"
          >
            Home
          </Link>
          <button
            onClick={signOut}
            className="rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white"
          >
            Sign Out
          </button>
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

          <p className="mt-4 text-xs text-muted">
            Note: this is a sample chat with preloaded responses for demonstration.
          </p>
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
              placeholder="Ask about watering, soil, sunlight, or pests..."
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
