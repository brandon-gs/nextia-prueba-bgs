// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PRIVATE_ROUTES: Record<string, boolean> = {
  "/invitation": true,
};

const PUBLIC_ROUTES: Record<string, boolean> = {
  "/": true,
  "/register": true,
  "/forgot-password": true,
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicRoute = PUBLIC_ROUTES[pathname];
  const isPrivateRoute = PRIVATE_ROUTES[pathname];

  if (!isPublicRoute && !isPrivateRoute) {
    return NextResponse.next();
  }

  const jwtToken = request.cookies.get("access_token");

  if (jwtToken === undefined) {
    return isPublicRoute
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/", request.url));
  }

  return isPublicRoute
    ? NextResponse.redirect(new URL("/invitation", request.url))
    : NextResponse.next();
}
