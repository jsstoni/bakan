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

export function VerifyEmail({ name, token }: { name: string; token: string }) {
  return (
    <Tailwind>
      <Html>
        <Head />
        <Preview>Confirm your email</Preview>
        <Body>
          <Heading>Hi {name}</Heading>
          <Text>
            Thank you for signing up! Please verify your email address to
            activate your account.
          </Text>

          <Link href={token} target="_blank">
            Verify Email
          </Link>
        </Body>
      </Html>
    </Tailwind>
  );
}
