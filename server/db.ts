import { env } from '@/lib/env';
import * as subscription from '@/server/models/subscription';
import * as user from '@/server/models/user';
import { drizzle } from 'drizzle-orm/node-postgres';

export const db = drizzle(env.DATABASE_URL, {
  schema: { ...user, ...subscription },
});
