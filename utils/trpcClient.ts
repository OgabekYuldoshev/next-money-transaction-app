import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "../trpc";

export const trpcClient = createTRPCReact<AppRouter>({});
