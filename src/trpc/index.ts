import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { TRPCError } from "@trpc/server";
import speakeasy from "speakeasy";
import { db } from "@/utils/db";
import { privateProcedure, publicProcedure, router } from "./trpc";

export const appRouter = router({
  healthCheck: publicProcedure.query(() => {
    return {
      success: true,
    };
  }),
  authCallback: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user?.id || !user.email) throw new TRPCError({ code: "UNAUTHORIZED" });

    const dbUser = await db.user.findFirst({
      where: {
        id: user.id,
      },
    });
    if (!dbUser) {
      // create user in db
      await db.user.create({
        data: {
          id: user.id,
          email: user.email,
        },
      });
    }

    return { success: true };
  }),
  generateOtp: privateProcedure.query(async ({ ctx: { userId, user } }) => {
    const prefix = "otpauth://totp/SecretKey?secret=";
    if (user.otpToken) {
      return { url: prefix + user.otpToken };
    }

    const generatedToken = speakeasy.generateSecret({ length: 20 });

    const updatedUser = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        otpToken: generatedToken.base32,
      },
    });

    return { url: prefix + updatedUser.otpToken };
  }),
});

export type AppRouter = typeof appRouter;
