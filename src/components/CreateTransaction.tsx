import React from "react";
import TwoAuthentication from "./TwoAuthentication";
import { Button } from "./ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";

const CreateTransaction = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Create transaction</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="m-auto py-4">
          <TwoAuthentication />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateTransaction;
