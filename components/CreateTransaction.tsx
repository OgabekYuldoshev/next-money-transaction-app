"use client";
import React, { useState } from "react";
import TransactionForm from "../forms/TransactionForm";
import TwoAuthentication from "../forms/TwoAuthentication";
import { Button } from "./ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";

const CreateTransaction = ({ isVerified }: { isVerified: boolean }) => {
  const [isOpen, setOpen] = useState(false);
  const toggle = () => setOpen((p) => !p);
  return (
    <Drawer open={isOpen} onOpenChange={setOpen}>
      <DrawerTrigger>
        <Button>Create transaction</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="m-auto py-4">
          {isVerified ? (
            <TransactionForm onClose={toggle} />
          ) : (
            <TwoAuthentication onClose={toggle} />
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateTransaction;
