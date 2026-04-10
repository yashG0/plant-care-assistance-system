"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const mockReplies = [
  "Your plant likely needs brighter indirect light. Try moving it near an east-facing window.",
  "Water only when the top inch of soil is dry and ensure the pot has drainage holes.",
  "Trim damaged leaves and feed a diluted liquid fertilizer every 2-3 weeks in growth season.",
  "Brown tips can be caused by low humidity. Mist lightly or use a pebble tray.",
];

const quickPrompts = [
  "Yellow leaves on money plant",
  "How often to water aloe vera?",
  "My snake plant has brown tips",
  "Best soil mix for monstera",
];

export function ChatShell() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content:
        "Hello. I am your Plant Care Assistant demo. Ask me anything about watering, sunlight, pests, or growth.",
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

    await new Promise((resolve) => setTimeout(resolve, 700));
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

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-5 md:px-8 md:py-7">
      <header className="glass fade-up flex items-center justify-between rounded-2xl px-4 py-3 md:px-5">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Interactive Demo</p>
          <h1 className="text-lg font-bold md:text-2xl">Plant Care Conversation</h1>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/"
            className="rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-2 text-sm font-semibold hover:scale-[1.02]"
          >
            Home
          </Link>
        </div>
      </header>

      <section className="mt-5 grid flex-1 gap-4 lg:grid-cols-[300px_1fr]">
        <aside className="glass flex flex-col rounded-2xl p-4">
          <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--muted)]">Quick Prompts</h2>
          <div className="mt-3 space-y-2">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => submitMessage(prompt)}
                type="button"
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--chip)] px-3 py-2 text-left text-sm transition hover:border-[var(--primary)]"
              >
                {prompt}
              </button>
            ))}
          </div>

          <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-2">
            <img
              src="https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&w=900&q=80"
              alt="Plant leaf closeup"
              className="h-40 w-full rounded-xl object-cover"
            />
            <p className="px-2 pb-2 pt-3 text-xs text-[var(--muted)]">
              Presentation mode: responses are mocked so you can demo without API keys.
            </p>
          </div>
        </aside>

        <div className="glass flex min-h-[70vh] flex-col rounded-2xl p-3 md:p-4">
          <div className="flex-1 space-y-3 overflow-y-auto rounded-xl bg-[var(--surface-strong)] p-3 md:p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm md:text-base ${
                  message.role === "user"
                    ? "ml-auto bg-[var(--primary)] text-white"
                    : "bg-[var(--chip)] text-[var(--text)]"
                }`}
              >
                {message.content}
              </div>
            ))}

            {loading && (
              <div className="max-w-[88%] rounded-2xl bg-[var(--chip)] px-4 py-3 text-sm text-[var(--muted)]">
                Thinking...
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about watering, sunlight, pests, fertilizer..."
              className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 outline-none transition focus:border-[var(--primary)]"
            />
            <button
              disabled={loading}
              className="rounded-xl bg-[var(--primary)] px-5 py-3 font-semibold text-white transition hover:bg-[var(--primary-strong)] disabled:opacity-60"
            >
              Send
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
