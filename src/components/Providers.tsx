"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import NextTopLoader from "nextjs-toploader";
import React from "react";
import { trpcClient } from "@/utils/trpcClient";
import { getBaseUrl } from "@/utils/utils";

interface IPros {
  children: React.ReactNode;
}

const queryClient = new QueryClient();
const trpc = trpcClient.createClient({
  links: [
    httpBatchLink({
      url: getBaseUrl() + "/api/trpc",
    }),
  ],
});
const Providers = ({ children }: IPros) => {
  return (
    <trpcClient.Provider queryClient={queryClient} client={trpc}>
      <QueryClientProvider client={queryClient}>
        <NextTopLoader />
        {children}
      </QueryClientProvider>
    </trpcClient.Provider>
  );
};

export default Providers;
