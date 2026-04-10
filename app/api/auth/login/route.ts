import bcrypt from "bcryptjs";
import { readDemoUsers, sanitizeDemoUser } from "@/lib/demo-auth-store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email ?? "").trim().toLowerCase();
    const password = String(body.password ?? "");

    if (!email || !password) {
      return Response.json({ message: "Email and password are required." }, { status: 400 });
    }

    const users = await readDemoUsers();
    const user = users.find((candidate) => candidate.email === email);

    if (!user) {
      return Response.json({ message: "Invalid email or password." }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);

    if (!valid) {
      return Response.json({ message: "Invalid email or password." }, { status: 401 });
    }

    return Response.json({ user: sanitizeDemoUser(user) });
  } catch {
    return Response.json({ message: "Unable to sign in." }, { status: 500 });
  }
}
