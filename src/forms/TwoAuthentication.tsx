"use client";

import { AlertCircle, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { toast } from "sonner";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { buttonVariants } from "../components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../components/ui/input-otp";
import { trpcClient } from "../utils/trpcClient";

const TwoAuthentication = ({ onClose }: { onClose(): void }) => {
  const [otp, setOtp] = useState("");
  const { getUserInfo } = trpcClient.useUtils();
  const { data, isFetched, isError, error } = trpcClient.generateOtp.useQuery();
  const { mutate, isPending } = trpcClient.verifyOtp.useMutation();

  useEffect(() => {
    if (otp.length === 6) {
      mutate(
        { otp },
        {
          onSuccess: ({ isVerified }) => {
            if (isVerified) {
              toast.success(
                "Congratulate🫡!, Successfully enabled Two Factor Authentication.",
              );
              getUserInfo.invalidate().then(() => onClose());
            }
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
      <DialogHeader>
        <DialogTitle>
          {" "}
          You can connect your two auth verification first!
        </DialogTitle>
        <DialogDescription>
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
        </DialogDescription>
      </DialogHeader>
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
