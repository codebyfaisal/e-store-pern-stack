import express from "express";
import cors from "cors";
import { config } from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import sql from "./db/neon.client.db.js";
import arcjetLib from "./lib/arcjet.lib.js";
import productRoutes from "./routes/products.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

// .env variables
config();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

// Arcjet Middleware
app.use(async (req, res, next) => {
  try {
    const decision = await arcjetLib.protect(req, {
      requested: 1,
    });
    if (decision.isDenied) {
      console.log("Access Denied by Arcjet");
      return res.status(403).send("Access Denied");
    }
  } catch (error) {
    console.error("Arcjet Middleware Error:", error);
    return res.status(500).send("Internal Server Error");
  }
  next();
});

// Test route
app.get("/test", (req, res) => {
  res.send("Welcome to the E-Store!");
});

// Register routes
app.use("/api", productRoutes);

// Initialize database connection
async function initDb() {
  try {
    await sql`SELECT 1`; // test query
    console.log("✅ Connected to Neon DB");
  } catch (error) {
    console.error("❌ Failed to connect to Neon DB:", error);
    // process.exit(1); // Exit if DB connection fails
  }
}
// Start server after Successful DB connection
initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
  });
});
