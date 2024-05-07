import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import TransactionForm from "@/forms/TransactionForm";
import TwoAuthentication from "@/forms/TwoAuthentication";
import { db } from "@/utils/db";
import { Button } from "./ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";

const CreateTransaction = async () => {
  const { getUser } = getKindeServerSession();

  const sessionUser = await getUser();

  if (!sessionUser) redirect("/");

  const user = await db.user.findFirst({
    where: {
      id: sessionUser.id,
    },
  });

  if (!user) redirect("/callback");

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Create transaction</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="m-auto py-4">
          {user.isVerified ? <TransactionForm /> : <TwoAuthentication />}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateTransaction;
