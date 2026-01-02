import type { HelmetOptions } from "helmet";

export const helmetConfig: HelmetOptions = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'"],
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  referrerPolicy: { policy: "no-referrer" },
  frameguard: { action: "deny" },
  hsts: { maxAge: 15552000, includeSubDomains: true, preload: true },
  xssFilter: true,
};
