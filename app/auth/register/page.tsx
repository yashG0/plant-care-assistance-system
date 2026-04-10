import Link from "next/link";
import { AuthCard } from "@/components/auth/AuthCard";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function RegisterPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-6 md:px-10">
      <header className="mb-8 flex items-center justify-between">
        <Link href="/" className="text-sm font-semibold text-[var(--muted)] hover:underline">
          Back Home
        </Link>
        <ThemeToggle />
      </header>
      <div className="fade-up flex flex-1 items-center justify-center">
        <AuthCard mode="register" />
      </div>
    </main>
  );
}
