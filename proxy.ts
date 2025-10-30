import { createMiddleware, defaults, type Options } from '@nosecone/next';
import { getSessionCookie } from 'better-auth/cookies';
import { type NextRequest, NextResponse } from 'next/server';

const isProduction = process.env.NODE_ENV === 'production';

const nonceOptions: Options = {
  ...defaults,
  contentSecurityPolicy: {
    ...defaults.contentSecurityPolicy,
    directives: {
      ...defaults.contentSecurityPolicy.directives,
      imgSrc: [
        ...defaults.contentSecurityPolicy.directives.imgSrc,
        'https://lh3.googleusercontent.com',
      ],
      frameSrc: ['https://www.youtube.com/'],
      scriptSrc: isProduction
        ? [
            ...defaults.contentSecurityPolicy.directives.scriptSrc,
            'https://www.googletagmanager.com',
          ]
        : [
            "'self'",
            "'unsafe-inline'",
            "'unsafe-eval'",
            'https://www.googletagmanager.com',
          ],
      connectSrc: [
        ...defaults.contentSecurityPolicy.directives.connectSrc,
        'https://www.google-analytics.com',
        'https://ungh.cc',
      ],
      upgradeInsecureRequests: isProduction,
    },
  },
  crossOriginEmbedderPolicy: {
    policy: 'unsafe-none',
  },
};

const securityHeaders = createMiddleware(nonceOptions);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/dashboard')) {
    const cookie = getSessionCookie(request);
    if (!cookie) {
      return NextResponse.redirect(new URL('/signin', request.url));
    }
  }

  return securityHeaders();
}
