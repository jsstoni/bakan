import { env } from '@/lib/env/env-client';
import {
  Body,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Tailwind,
  Text,
} from '@react-email/components';

export function ResetPasswordEmail({
  name,
  token,
}: {
  name: string;
  token: string;
}) {
  const link = `${env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;

  return (
    <Tailwind>
      <Html>
        <Head />
        <Preview>Reset your password</Preview>
        <Body>
          <Heading>Hi {name}</Heading>
          <Text>Reset your password</Text>
          <Text>
            We received a request to reset the password for your account. If it
            was you, click the button below to create a new password:
          </Text>

          <Link href={link} target="_blank">
            Reset your password
          </Link>
        </Body>
      </Html>
    </Tailwind>
  );
}
