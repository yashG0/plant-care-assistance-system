"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type AuthMode = "login" | "register";

type AuthCardProps = {
  mode: AuthMode;
};

type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  location?: string;
  experienceLevel?: string;
  avatarUrl?: string;
  createdAt: string;
};

export function AuthCard({ mode }: AuthCardProps) {
  const router = useRouter();

  const isLogin = mode === "login";
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("beginner");
  const [avatarUrl, setAvatarUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const payload = isLogin
        ? { email, password }
        : {
            fullName,
            email,
            password,
            location,
            experienceLevel,
            avatarUrl,
          };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message ?? "Unable to continue. Please try again.");
        return;
      }

      const user = data.user as AuthUser;
      sessionStorage.setItem("demoAuthUser", JSON.stringify(user));
      sessionStorage.removeItem("demoGuest");
      localStorage.removeItem("demoAuthUser");
      window.dispatchEvent(new Event("demo-auth"));
      setSuccess(isLogin ? "Sign in successful." : "Account created successfully.");

      setTimeout(() => {
        router.push("/chat");
      }, 400);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="surface w-full max-w-lg rounded-2xl p-5 md:p-6">
      <p className="text-xs uppercase tracking-[0.16em] text-muted">Plant Care Assistant</p>
      <h1 className="mt-2 text-3xl">{isLogin ? "Sign In" : "Create Account"}</h1>
      <p className="mt-1 text-sm text-muted">
        {isLogin
          ? "Sign in to continue your plant care conversations."
          : "Create your account with profile details for personalized guidance."}
      </p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-3">
        {!isLogin && (
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Full Name *</span>
            <input
              required
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Your full name"
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-2.5 outline-none transition focus:border-[var(--primary)]"
            />
          </label>
        )}

        <label className="block">
          <span className="mb-1 block text-sm font-medium">Email *</span>
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-2.5 outline-none transition focus:border-[var(--primary)]"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-medium">Password *</span>
          <input
            required
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Minimum 6 characters"
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-2.5 outline-none transition focus:border-[var(--primary)]"
          />
        </label>

        {!isLogin && (
          <>
            <label className="block">
              <span className="mb-1 block text-sm font-medium">Location</span>
              <input
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="City / Region"
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-2.5 outline-none transition focus:border-[var(--primary)]"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium">Experience Level</span>
              <select
                value={experienceLevel}
                onChange={(event) => setExperienceLevel(event.target.value)}
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-2.5 outline-none transition focus:border-[var(--primary)]"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium">Avatar URL</span>
              <input
                type="url"
                value={avatarUrl}
                onChange={(event) => setAvatarUrl(event.target.value)}
                placeholder="https://example.com/avatar.jpg"
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-2.5 outline-none transition focus:border-[var(--primary)]"
              />
            </label>
          </>
        )}

        {error ? <p className="rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-500">{error}</p> : null}
        {success ? <p className="rounded-xl bg-green-500/10 px-3 py-2 text-sm text-green-600">{success}</p> : null}

        <button
          disabled={loading}
          className="w-full rounded-xl bg-[var(--primary)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--primary-strong)] disabled:opacity-60"
        >
          {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
        </button>
      </form>

      <p className="mt-4 text-sm text-muted">
        {isLogin ? "Need an account? " : "Already registered? "}
        <Link
          href={isLogin ? "/auth/register" : "/auth/login"}
          className="font-semibold text-[var(--primary)] hover:underline"
        >
          {isLogin ? "Create one" : "Sign in"}
        </Link>
      </p>
    </div>
  );
}
