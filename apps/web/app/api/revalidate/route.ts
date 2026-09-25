import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const secret = process.env.PAYLOAD_REVALIDATE_SECRET;
  if (!secret) {
    return Response.json({ message: "Revalidation is not configured." }, { status: 503 });
  }

  if (!isAuthorized(request, secret)) {
    return Response.json({ message: "Unauthorized." }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ message: "Invalid webhook payload." }, { status: 400 });
  }

  if (!isPayloadWebhook(payload)) {
    return Response.json({ message: "Invalid webhook payload." }, { status: 400 });
  }

  revalidateTag("cms", "max");
  return Response.json({ revalidated: true });
}

function isAuthorized(request: Request, secret: string) {
  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ")) return false;

  const provided = Buffer.from(authorization.slice("Bearer ".length));
  const expected = Buffer.from(secret);
  return provided.length === expected.length && timingSafeEqual(provided, expected);
}

function isPayloadWebhook(value: unknown): value is { source: "payload" } {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  return (value as { source?: unknown }).source === "payload";
}
