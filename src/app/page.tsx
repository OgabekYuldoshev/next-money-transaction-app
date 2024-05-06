"use client";

import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import React from "react";
import { buttonVariants } from "@/components/ui/button";

const Page = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="flex gap-4">
        <LoginLink className={buttonVariants()}>Sign in</LoginLink>
        <RegisterLink
          className={buttonVariants({
            variant: "outline",
          })}
        >
          Sign up
        </RegisterLink>
      </div>
    </div>
  );
};

export default Page;
