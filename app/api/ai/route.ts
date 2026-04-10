export const runtime = "nodejs";

export async function POST() {
  return Response.json(
    {
      message: "AI endpoint disabled for demo deployment.",
    },
    { status: 501 }
  );
}
