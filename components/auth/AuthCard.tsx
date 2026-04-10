"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type AuthMode = "login" | "register";

type AuthCardProps = {
  mode: AuthMode;
};

export function AuthCard({ mode }: AuthCardProps) {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("beginner");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const isLogin = mode === "login";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    router.push("/chat");
  };

  return (
    <div className="glass w-full max-w-4xl overflow-hidden rounded-3xl">
      <div className="grid md:grid-cols-2">
        <div className="relative hidden md:block">
          <img
            src={
              isLogin
                ? "https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&w=900&q=80"
                : "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80"
            }
            alt="Plant visual"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15" />
          <p className="absolute bottom-6 left-6 right-6 text-sm font-medium text-white/95">
            {isLogin
              ? "Welcome back. Continue your plant care journey with style."
              : "Create your profile and start receiving smart plant tips."}
          </p>
        </div>

        <div className="bg-[var(--surface-strong)] p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Plant Assistant</p>
          <h1 className="mt-2 text-3xl font-black">{isLogin ? "Sign In" : "Create Account"}</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            {isLogin ? "Access your workspace securely" : "Create your account to get started"}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {!isLogin && (
              <label className="block">
                <span className="mb-1 block text-sm font-semibold">Full Name</span>
                <input
                  required
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-[var(--border)] bg-transparent px-3 py-2.5 outline-none transition focus:border-[var(--primary)]"
                />
              </label>
            )}

            <label className="block">
              <span className="mb-1 block text-sm font-semibold">Email</span>
              <input
                required
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-[var(--border)] bg-transparent px-3 py-2.5 outline-none transition focus:border-[var(--primary)]"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-semibold">Password</span>
              <input
                required
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password"
                className="w-full rounded-xl border border-[var(--border)] bg-transparent px-3 py-2.5 outline-none transition focus:border-[var(--primary)]"
              />
            </label>

            {!isLogin && (
              <>
                <label className="block">
                  <span className="mb-1 block text-sm font-semibold">Location</span>
                  <input
                    type="text"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    placeholder="City / Region"
                    className="w-full rounded-xl border border-[var(--border)] bg-transparent px-3 py-2.5 outline-none transition focus:border-[var(--primary)]"
                  />
                </label>

                <label className="block">
                  <span className="mb-1 block text-sm font-semibold">Experience Level</span>
                  <select
                    value={experienceLevel}
                    onChange={(event) => setExperienceLevel(event.target.value)}
                    className="w-full rounded-xl border border-[var(--border)] bg-transparent px-3 py-2.5 outline-none transition focus:border-[var(--primary)]"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-1 block text-sm font-semibold">Avatar URL</span>
                  <input
                    type="url"
                    value={avatarUrl}
                    onChange={(event) => setAvatarUrl(event.target.value)}
                    placeholder="https://example.com/avatar.jpg"
                    className="w-full rounded-xl border border-[var(--border)] bg-transparent px-3 py-2.5 outline-none transition focus:border-[var(--primary)]"
                  />
                </label>
              </>
            )}

            <button
              disabled={loading}
              className="w-full rounded-xl bg-[var(--primary)] px-4 py-3 font-semibold text-white transition hover:bg-[var(--primary-strong)] disabled:opacity-60"
            >
              {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <p className="mt-5 text-sm text-[var(--muted)]">
            {isLogin ? "New user? " : "Already registered? "}
            <Link
              href={isLogin ? "/auth/register" : "/auth/login"}
              className="font-semibold text-[var(--primary)] hover:underline"
            >
              {isLogin ? "Register" : "Sign In"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
