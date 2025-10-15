import { createEnv } from '@t3-oss/env-nextjs';
import z from 'zod';

export const env = createEnv({
  client: {
    NEXT_PUBLIC_BASE_URL: z.url(),
    NEXT_PUBLIC_GAID: z.string().min(1),
    NEXT_PUBLIC_REPO_URL: z.url(),
    NEXT_PUBLIC_EMAIL_HOST: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_GAID: process.env.NEXT_PUBLIC_GAID,
    NEXT_PUBLIC_REPO_URL: process.env.NEXT_PUBLIC_REPO_URL,
    NEXT_PUBLIC_EMAIL_HOST: process.env.NEXT_PUBLIC_EMAIL_HOST,
  },
});
