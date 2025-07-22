import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { isSpoofedBot } from "@arcjet/inspect";
import { config } from "dotenv";

config();

const arcjetLib = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    // shielding against common attacks e.g., SQL injection, XSS, CSRF
    shield({ mode: "LIVE" }),
    // Blocking all bots except those from search engines
    detectBot({ mode: "LIVE", allow: ["CATEGORY:SEARCH_ENGINE"] }),
    // Rate limiting to prevent abuse
    tokenBucket({
      mode: "LIVE",
      refillRate: 5,
      interval: 10,
      capacity: 10,
      //   rate: 100,
      //   burst: 10,
    }),
    // Detecting spoofed bots, allowing only those from search engines and social media
    // isSpoofedBot({
    //   mode: "LIVE",
    //   allow: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:SOCIAL_MEDIA"],
    // }),
  ],
});
export default arcjetLib;
