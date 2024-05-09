/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { TRPCError } from "@trpc/server";
import speakeasy from "speakeasy";
import { z } from "zod";
import { db } from "../utils/db";
import { generateCreditCardNumber } from "../utils/utils";
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
          account: {
            create: {
              number: generateCreditCardNumber(),
            },
          },
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
  verifyOtp: privateProcedure
    .input(
      z.object({
        otp: z.string(),
      }),
    )
    .mutation(async ({ ctx: { user, userId }, input: { otp } }) => {
      if (!user.otpToken) throw new TRPCError({ code: "BAD_REQUEST" });

      const isVerified = speakeasy.totp.verify({
        secret: user.otpToken,
        encoding: "base32",
        token: otp,
      });

      await db.user.update({
        where: {
          id: userId,
        },
        data: {
          isVerified,
        },
      });

      return { isVerified };
    }),
  getAccountInfo: privateProcedure.query(async ({ ctx: { user } }) => {
    const account = await db.account.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (!account) throw new TRPCError({ code: "NOT_FOUND" });

    return account;
  }),
  getUserInfo: privateProcedure.query(async ({ ctx: { user } }) => {
    const dbUser = await db.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        id: true,
        email: true,
        isVerified: true,
      },
    });

    if (!dbUser) throw new TRPCError({ code: "NOT_FOUND" });

    return dbUser;
  }),
  getCardInfo: privateProcedure
    .input(
      z.object({
        number: z.string().max(16).min(16),
      }),
    )
    .mutation(async ({ input: { number } }) => {
      const accountInfo = await db.account.findUnique({
        where: {
          number,
        },
        select: {
          user: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      });

      if (!accountInfo) throw new TRPCError({ code: "NOT_FOUND" });

      return accountInfo;
    }),

  makeTransaction: privateProcedure
    .input(
      z.object({
        number: z.string(),
        otp: z.number(),
        balance: z.number(),
      }),
    )
    .mutation(async ({ ctx: { userId, user }, input }) => {
      const isVerified = speakeasy.totp.verify({
        secret: user.otpToken!,
        encoding: "base32",
        token: String(input.otp),
      });

      if (!isVerified)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid OTP password",
        });

      await db.$transaction(async (tx) => {
        const sender = await tx.account.update({
          where: {
            userId,
          },
          data: {
            balance: {
              decrement: input.balance,
            },
          },
        });
        if (sender.balance < 0) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "You don't have enough money",
          });
        }
        const recipient = await db.account.update({
          where: {
            number: input.number,
          },
          data: {
            balance: {
              increment: input.balance,
            },
          },
        });

        return recipient;
      });

      return { success: true };
    }),
});

export type AppRouter = typeof appRouter;
