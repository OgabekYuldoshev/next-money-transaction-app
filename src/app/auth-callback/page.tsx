import { redirect } from "next/navigation";
import { initializedUser } from "@/lib/actions/user.actions";

const Page = async ({
  searchParams,
}: {
  searchParams?: {
    origin?: string;
  };
}) => {
  const origin = searchParams?.origin;

  const { success } = await initializedUser();

  if (success) {
    return redirect(origin ? `/${origin}` : "/dashboard");
  }

  return redirect("/");
};

export default Page;
