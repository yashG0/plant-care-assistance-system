import { promises as fs } from "fs";
import path from "path";

export type DemoUser = {
  id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  location?: string;
  experienceLevel?: "beginner" | "intermediate" | "advanced";
  avatarUrl?: string;
  createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "demo-users.json");

async function ensureFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(USERS_FILE);
  } catch {
    await fs.writeFile(USERS_FILE, "[]", "utf8");
  }
}

export async function readDemoUsers(): Promise<DemoUser[]> {
  await ensureFile();
  const raw = await fs.readFile(USERS_FILE, "utf8");

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as DemoUser[]) : [];
  } catch {
    return [];
  }
}

export async function writeDemoUsers(users: DemoUser[]): Promise<void> {
  await ensureFile();
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), "utf8");
}

export function sanitizeDemoUser(user: DemoUser) {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    location: user.location ?? "",
    experienceLevel: user.experienceLevel ?? "beginner",
    avatarUrl: user.avatarUrl ?? "",
    createdAt: user.createdAt,
  };
}
