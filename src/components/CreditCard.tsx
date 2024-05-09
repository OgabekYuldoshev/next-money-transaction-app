"use client";
import { trpcClient } from "../utils/trpcClient";
import CreateTransaction from "./CreateTransaction";
import { Skeleton } from "./ui/skeleton";

const CreditCard = () => {
  const user = trpcClient.getUserInfo.useQuery();

  const account = trpcClient.getAccountInfo.useQuery();

  if (!user.isFetched || !account.isFetched) {
    return (
      <div className="block w-full py-10">
        <div className="container">
          <Skeleton className="max-w-[600px] h-[300px] mx-auto rounded-3xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="block w-full py-10">
      <div className="container">
        <div className="max-w-[600px] w-full border rounded-3xl bg-gradient-to-r from-zinc-800 to-zinc-600 text-white md:p-8 p-4 mx-auto">
          <h1 className="font-bold md:text-lg text-sm uppercase text-center">
            Your Credit Card
          </h1>
          <p className="md:text-5xl text-2xl font-bold text-center my-2 select-none">
            {new Intl.NumberFormat("us-US", {
              style: "currency",
              currency: "USD",
            }).format(account.data?.balance || 0)}
          </p>
          <div className="block bg-zinc-500 rounded-xl p-4 bg-opacity-50 mt-10 space-y-2">
            <h3 className="font-medium text-sm md:text-base">
              {user.data?.email}
            </h3>
            <div className="flex justify-between text-sm md:text-base items-end">
              <span>{account.data?.number || "xxxx xxxx xxxx xxxx"}</span>
              <CreateTransaction isVerified={user.data?.isVerified!} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
