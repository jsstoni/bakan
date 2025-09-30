import { createMiddleware, defaults, type Options } from "@nosecone/next";

const isProduction = process.env.NODE_ENV === "production";

const nonceOptions: Options = {
  ...defaults,
  contentSecurityPolicy: {
    ...defaults.contentSecurityPolicy,
    directives: {
      ...defaults.contentSecurityPolicy.directives,
      imgSrc: [
        ...defaults.contentSecurityPolicy.directives.imgSrc,
        "https://lh3.googleusercontent.com",
      ],
      frameSrc: ["https://www.youtube.com/"],
      scriptSrc: isProduction
        ? [...defaults.contentSecurityPolicy.directives.scriptSrc]
        : ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      upgradeInsecureRequests: isProduction,
    },
  },
  crossOriginEmbedderPolicy: {
    policy: "unsafe-none",
  },
};

export default createMiddleware(nonceOptions);
