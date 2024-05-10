"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { cache } from "react";
import { db } from "@/utils/db";
import { generateCreditCardNumber } from "@/utils/utils";

export const initializedUser = cache(async () => {
  const user = await getUserSession();
  const dbUser = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });
  // if user not found then create a new user
  if (!dbUser) {
    await db.user.create({
      data: {
        id: user.id,
        email: user.email!,
        account: {
          create: {
            number: generateCreditCardNumber(),
          },
        },
      },
    });
  }

  return { success: true };
});

export const getUserSession = cache(async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) redirect("/");
  return user;
});

export const getCardInfo = cache(async () => {
  const { id } = await getUserSession();

  const cardInfo = await db.account.findUnique({
    where: {
      userId: id,
    },
  });

  return cardInfo;
});

export const getUserInfo = cache(async () => {
  const { id } = await getUserSession();

  const userInfo = await db.user.findUnique({
    where: {
      id,
    },
  });
  if (!userInfo) redirect("/");

  return userInfo;
});
