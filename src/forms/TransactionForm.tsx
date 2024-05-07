"use client";
import React, { useEffect, useState } from "react";
import {
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  generateCreditCardNumber,
  isValidCreditCardNumber,
} from "@/utils/utils";

const TransactionForm = () => {
  const [number, setNumber] = useState("");

  useEffect(() => {
    if (number.length === 16) {
      console.log(number);
      const newnumber = generateCreditCardNumber();
      console.log(newnumber);
      console.log(isValidCreditCardNumber(newnumber));
      console.log(isValidCreditCardNumber(number));
    }
  }, [number]);

  return (
    <>
      <DrawerHeader>
        <DrawerTitle>Money Transaction</DrawerTitle>
        <DrawerDescription>Send money your friend</DrawerDescription>
      </DrawerHeader>
      <div className="">
        <InputOTP
          id="card-number"
          maxLength={16}
          value={number}
          onChange={setNumber}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSeparator />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
            <InputOTPSlot index={6} />
            <InputOTPSlot index={7} />
            <InputOTPSeparator />
            <InputOTPSlot index={8} />
            <InputOTPSlot index={9} />
            <InputOTPSlot index={10} />
            <InputOTPSlot index={11} />
            <InputOTPSeparator />
            <InputOTPSlot index={12} />
            <InputOTPSlot index={13} />
            <InputOTPSlot index={14} />
            <InputOTPSlot index={15} />
          </InputOTPGroup>
        </InputOTP>
      </div>
    </>
  );
};

export default TransactionForm;
