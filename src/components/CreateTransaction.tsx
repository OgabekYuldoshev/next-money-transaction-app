"use client";
import React, { useState } from "react";
import TransactionForm from "../forms/TransactionForm";
import TwoAuthentication from "../forms/TwoAuthentication";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

const CreateTransaction = ({ isVerified }: { isVerified: boolean }) => {
  const [isOpen, setOpen] = useState(false);
  const toggle = () => setOpen((p) => !p);

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create transaction</Button>
      </DialogTrigger>
      <DialogContent>
        <div className="m-auto py-4">
          {isVerified ? (
            <TransactionForm onClose={toggle} />
          ) : (
            <TwoAuthentication onClose={toggle} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTransaction;
