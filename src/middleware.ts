import { authMiddleware } from "@kinde-oss/kinde-auth-nextjs/middleware";

export default authMiddleware;

export const config = {
  matcher: ["/dashboard/:path*", "/auth-callback"],
};
