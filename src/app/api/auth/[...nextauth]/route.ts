import { handlers } from "@/lib/auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const callback = req.nextUrl.searchParams.get("callbackUrl");
  const from = callback
    ? new URL(callback, req.nextUrl.origin).searchParams.get("from")
    : null;

  const response = await handlers.GET(req);

  if (from) {
    response.headers.set("Set-Cookie", `auth_from=${from}; Path=/; Max-Age=60`);
  }

  return response;
}

export async function POST(req: NextRequest) {
  const callback = req.nextUrl.searchParams.get("callbackUrl");
  const from = callback
    ? new URL(callback, req.nextUrl.origin).searchParams.get("from")
    : null;

  const response = await handlers.POST(req);

  if (from) {
    response.headers.set("Set-Cookie", `auth_from=${from}; Path=/; Max-Age=60`);
  }

  return response;
}
