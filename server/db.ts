import * as user from "@/server/schema/user";
import { env } from "@/utils/env";
import { drizzle } from "drizzle-orm/node-postgres";

export const db = drizzle(env.DATABASE_URL, {
  schema: { ...user },
});
