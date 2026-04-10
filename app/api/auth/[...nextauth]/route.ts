export const runtime = "nodejs";

export async function GET() {
  return Response.json(
    { message: "Auth endpoint disabled for demo deployment." },
    { status: 501 }
  );
}

export async function POST() {
  return Response.json(
    { message: "Auth endpoint disabled for demo deployment." },
    { status: 501 }
  );
}
