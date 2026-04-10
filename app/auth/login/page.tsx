import Link from "next/link";
import { AuthCard } from "@/components/auth/AuthCard";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 py-6 md:px-8 md:py-10">
      <header className="mb-8 flex items-center justify-between">
        <Link href="/" className="text-sm font-semibold text-muted hover:underline">
          Back to Home
        </Link>
        <ThemeToggle />
      </header>
      <div className="flex flex-1 items-center justify-center">
        <AuthCard mode="login" />
      </div>
    </main>
  );
}
