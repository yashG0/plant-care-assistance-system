import bcrypt from "bcryptjs";
import { readDemoUsers, sanitizeDemoUser, writeDemoUsers } from "@/lib/demo-auth-store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const fullName = String(body.fullName ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const password = String(body.password ?? "");
    const location = String(body.location ?? "").trim();
    const experienceLevel = String(body.experienceLevel ?? "beginner") as
      | "beginner"
      | "intermediate"
      | "advanced";
    const avatarUrl = String(body.avatarUrl ?? "").trim();

    if (!fullName || !email || !password) {
      return Response.json(
        { message: "Full name, email, and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return Response.json(
        { message: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    const users = await readDemoUsers();
    const exists = users.some((user) => user.email === email);

    if (exists) {
      return Response.json({ message: "Email already registered." }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = {
      id: crypto.randomUUID(),
      fullName,
      email,
      passwordHash,
      location,
      experienceLevel,
      avatarUrl,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    await writeDemoUsers(users);

    return Response.json({ user: sanitizeDemoUser(newUser) }, { status: 201 });
  } catch {
    return Response.json({ message: "Unable to create account." }, { status: 500 });
  }
}
