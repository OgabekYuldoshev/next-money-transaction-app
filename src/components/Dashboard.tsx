import React, { Suspense } from "react";
import CreditCard from "./CreditCard";
import { Skeleton } from "./ui/skeleton";

const Dashboard = () => {
  return (
    <div>
      <Suspense
        fallback={
          <div className="block w-full py-10">
            <div className="container">
              <Skeleton className="max-w-[600px] h-[300px] mx-auto rounded-3xl" />
            </div>
          </div>
        }
      >
        <CreditCard />
      </Suspense>
    </div>
  );
};

export default Dashboard;
