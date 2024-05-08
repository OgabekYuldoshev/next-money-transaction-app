import { authMiddleware } from "@kinde-oss/kinde-auth-nextjs/middleware";

export const config = {
  matcher: ["/dashboard/:path*", "/callback"],
};

export default authMiddleware;
