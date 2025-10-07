import { env } from '@/lib/env/env-client';
import { GoogleAnalytics, sendGAEvent } from '@next/third-parties/google';
import z from 'zod';

type TrackOptions = Record<string, any>;

const eventNameSchema = z
  .string()
  .min(1, 'Event name cannot be empty')
  .max(40, 'Event name cannot exceed 40 characters')
  .regex(
    /^[a-z0-9_]+$/,
    'Only lowercase letters, numbers, and underscores are allowed'
  )
  .refine((name) => !/^ga_|^google_|^firebase_/.test(name), {
    message: 'Event name cannot start with ga_, google_, or firebase_',
  });

function Google() {
  return <GoogleAnalytics gaId={env.NEXT_PUBLIC_GAID} />;
}

const track = (event: string, options: TrackOptions) => {
  const parsedEvent = eventNameSchema.safeParse(event);

  if (!parsedEvent.success) {
    console.error('[track] Invalid event name:', parsedEvent.error.issues);
    return;
  }

  sendGAEvent('event', event, options);
};

export { Google, track };
