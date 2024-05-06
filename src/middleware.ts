import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextRequest } from "next/server";

export const config = {
  matcher: ["/dashboard/:path*", "/callback"],
};

export default function middleware(req: NextRequest) {
  return withAuth(req);
}
