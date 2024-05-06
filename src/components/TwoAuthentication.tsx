"use client";

import React, { useState } from "react";
import { trpcClient } from "@/utils/trpcClient";
import { buttonVariants } from "./ui/button";
import { DrawerDescription, DrawerHeader, DrawerTitle } from "./ui/drawer";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";

const TwoAuthentication = () => {
  const [otp, setOtp] = useState("");
  const { data } = trpcClient.generateOtp.useQuery();
  console.log(data);

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
      <div>
        <div>
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </div>
    </>
  );
};

export default TwoAuthentication;
