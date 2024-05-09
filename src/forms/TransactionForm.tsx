"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import React, { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { trpcClient } from "../utils/trpcClient";
import { isValidCreditCardNumber } from "../utils/utils";

interface FormInputs {
  number: string;
  balance: number;
  otp: number;
}

const validation = zodResolver(
  z.object({
    number: z.coerce.string(),
    balance: z.coerce.number(),
    otp: z.coerce.number(),
  }),
);

const TransactionForm = ({ onClose }: { onClose(): void }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const [isOtp, setOtp] = useState(false);

  const ctx = trpcClient.useUtils();

  const { mutate, data, isPending, reset, isSuccess } =
    trpcClient.getCardInfo.useMutation();

  const transaction = trpcClient.makeTransaction.useMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<FormInputs>({
    resolver: validation,
  });

  const account = ctx.getAccountInfo.getData();

  const onSubmit: SubmitHandler<FormInputs> = (values) => {
    transaction.mutate(values, {
      onSuccess() {
        toast.success("Congratulate😍, Transacrion successfully done!");
        ctx.getAccountInfo.invalidate().then(() => onClose());
      },
    });
  };

  const onEffect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length === 16) {
      if (!isValidCreditCardNumber(value)) {
        setError("number", {
          type: "custom",
          message: "Invalid credit card number",
        });
      } else if (value === account?.number) {
        setError("number", {
          type: "custom",
          message: "You can't implement this transaction on your own!",
        });
      } else {
        mutate({
          number: value,
        });
      }
    } else {
      reset();
      clearErrors();
    }
  };

  return (
    <div className="w-[400px]">
      <DialogHeader>
        <DialogTitle>Money Transaction</DialogTitle>
        <DialogDescription>Send money your friend</DialogDescription>
      </DialogHeader>
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className="my-8 flex flex-col gap-4"
      >
        <div className="flex flex-col">
          <Label htmlFor="number" className="mb-2">
            Card number
          </Label>
          <Input
            disabled={isOtp}
            id="number"
            {...register("number", {
              onChange: onEffect,
            })}
            maxLength={16}
            placeholder="#### #### #### ####"
          />
          {errors.number && (
            <span className="text-destructive text-xs mt-1">
              {errors.number.message}
            </span>
          )}
          {isPending && <span className="text-xs mt-1">Loading...</span>}
          {data && (
            <span className="text-xs mt-1 text-green-500">
              {data.user.email}
            </span>
          )}
        </div>
        {isSuccess && (
          <>
            <div className="flex flex-col">
              <Label htmlFor="balance" className="mb-2">
                Amount
              </Label>
              <Input
                disabled={isOtp}
                id="balance"
                {...register("balance", {
                  onChange(e: React.ChangeEvent<HTMLInputElement>) {
                    const value = Number(e.target.value);
                    if (value > account?.balance!) {
                      setError("balance", {
                        type: "custom",
                        message: "You don't have enough money",
                      });
                    } else {
                      clearErrors();
                    }
                  },
                })}
                placeholder="Amount"
              />
              {errors.balance && (
                <span className="text-destructive text-xs mt-1">
                  {errors.balance.message}
                </span>
              )}
            </div>
            {isOtp ? (
              <div className="flex flex-col">
                <Label htmlFor="amount" className="mb-2">
                  One Time Password (OTP)
                </Label>
                <Input
                  maxLength={6}
                  id="otp"
                  {...register("otp", {
                    onChange(e: React.ChangeEvent<HTMLInputElement>) {
                      const otp = e.target.value;
                      if (otp.length === 6) {
                        if (formRef.current) {
                          formRef.current.dispatchEvent(
                            new Event("submit", {
                              cancelable: true,
                              bubbles: true,
                            }),
                          );
                        }
                      }
                    },
                  })}
                  placeholder="Enter one time password"
                />
                {errors.otp && (
                  <span className="text-destructive text-xs mt-1">
                    {errors.otp.message}
                  </span>
                )}
              </div>
            ) : (
              <Button type="button" onClick={() => setOtp(true)}>
                <Send className="mr-2" /> Submit
              </Button>
            )}
            {transaction.isPending && (
              <Loader2 className="h-8 w-8 animate-spin text-zinc-800 mx-auto" />
            )}
          </>
        )}
      </form>
    </div>
  );
};

export default TransactionForm;
