import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { cache } from "react";
import { db } from "@/utils/db";

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
