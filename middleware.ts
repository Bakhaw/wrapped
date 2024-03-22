import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;
  const c = cookies();

  if (pathname.includes("api/auth")) {
    return NextResponse.next();
  }

  if (
    !c.get("next-auth.session-token")?.value?.trim() &&
    pathname !== "/sign-in"
  ) {
    return NextResponse.redirect(`${origin}/sign-in`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!sign-up|api|_next/static|_next/image|favicon.ico).*)"],
};
