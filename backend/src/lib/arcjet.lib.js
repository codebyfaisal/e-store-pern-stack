import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { isSpoofedBot } from "@arcjet/inspect";
import { arcJetKey } from "../config/env.config.js";

const arcjetLib = arcjet({
  key: arcJetKey,
  characteristics: ["ip.src"],
  rules: [
    // Allow localhost (127.0.0.1) for development testing
    {
      mode: "DRY_RUN", // <--- was MONITOR
      match: { "ip.src": "127.0.0.1" },
      action: "allow",
    },

    // Protection against common threats like SQLi/XSS
    shield({ mode: "DRY_RUN" }), // <--- was MONITOR

    // Detect and block bots (except search engines)
    detectBot({
      mode: "DRY_RUN",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),

    // Rate limiting configuration
    tokenBucket({
      mode: "DRY_RUN",
      refillRate: 5,
      interval: 10,
      capacity: 10,
    }),

    // Optional spoofed bot detection
    // isSpoofedBot({
    //   mode: "DRY_RUN",
    //   allow: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:SOCIAL_MEDIA"],
    // }),
  ],
});

export default arcjetLib;
