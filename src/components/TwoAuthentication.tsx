"use client";

import { AlertCircle, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { trpcClient } from "@/utils/trpcClient";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { buttonVariants } from "./ui/button";
import { DrawerDescription, DrawerHeader, DrawerTitle } from "./ui/drawer";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";

const TwoAuthentication = () => {
  const [otp, setOtp] = useState("");
  const { data, isFetched, isError, error } = trpcClient.generateOtp.useQuery();
  const { mutate, isPending } = trpcClient.verifyOtp.useMutation();

  useEffect(() => {
    if (otp.length === 6) {
      mutate(
        { otp },
        {
          onSuccess: ({ isVerified }) => {
            console.log(isVerified);
          },
        },
      );
    }
  }, [mutate, otp]);

  if (!isFetched) {
    return (
      <div className="mx-auto">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <Alert variant="destructive" className="min-w-[200px]">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error?.data?.code}</AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <DrawerHeader>
        <DrawerTitle>
          You can connect your two auth verification first!
        </DrawerTitle>
        <DrawerDescription>
          You should download <b>Google Authenticator App</b> in
          <a
            className={buttonVariants({
              variant: "link",
            })}
            target="_blank"
            href="https://apps.apple.com/us/app/google-authenticator/id388497605"
          >
            Apple Store
          </a>
          or
          <a
            className={buttonVariants({
              variant: "link",
            })}
            target="_blank"
            href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en&gl=US&pli=1"
          >
            Play Market
          </a>
          then scan this QR code please.
        </DrawerDescription>
      </DrawerHeader>
      <div className="my-2">
        <QRCode size={150} className="m-auto" value={data.url} />
        <div className="flex items-center justify-center mt-8 flex-col">
          <InputOTP
            id="otp"
            maxLength={6}
            value={otp}
            onChange={setOtp}
            className="mx-auto"
            disabled={isPending}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-center text-sm mt-2">
            Enter your one-time password.
          </p>
        </div>
      </div>
    </>
  );
};

export default TwoAuthentication;
