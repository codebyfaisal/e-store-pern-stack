import arcjetLib from "../lib/arcjet.lib.js";

const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await arcjetLib.protect(req, {
      requested: 100,
    });

    // Only block if not in DRY_RUN and conclusion is DENY
    if (decision.conclusion === "DENY" && decision.state !== "DRY_RUN") {
      console.log("❌ Access Denied by Arcjet.");
      console.log("Decision details:", JSON.stringify(decision, null, 2));
      return res.status(403).send("Access Denied");
    }

    // Log DRY_RUN activity
    if (decision.state === "DRY_RUN") {
      console.log("🟡 DRY_RUN decision:");
      console.dir(decision, { depth: 4 });
    }

  } catch (error) {
    console.error("❌ Arcjet Middleware Error:", error);
    return res.status(500).send("Internal Server Error");
  }

  next();
};

export default arcjetMiddleware;
