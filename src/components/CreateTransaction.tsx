import React from "react";
import TransactionForm from "@/forms/TransactionForm";
import TwoAuthentication from "@/forms/TwoAuthentication";
import { Button } from "./ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";

const CreateTransaction = ({ isVerified }: { isVerified: boolean }) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Create transaction</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="m-auto py-4">
          {isVerified ? <TransactionForm /> : <TwoAuthentication />}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateTransaction;
