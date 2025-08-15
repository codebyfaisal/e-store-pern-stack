import express from "express";
import { port } from "./src/config/env.config.js";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { productRoutes, customerRouter, orderRouter, brandRouter, categoryRouter, salesReturnRouter, invoiceRouter, dashboardRouter, reportRouter, userRouter, bootstrapRouter} from "./src/routes/index.js";
import arcjetMiddleware from "./src/middlewares/arcjet.middleware.js";
import initDb from "./src/initDb.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { authenticate } from "./src/middlewares/auth.middleware.js";

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "*", credentials: true,}));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet());

app.use(arcjetMiddleware);

app.get("/api/test", (req, res) => res.send("Ok 👍"));

app.use("/api", bootstrapRouter);
app.use("/api", userRouter);
app.use("/api", authenticate, dashboardRouter);
app.use("/api", authenticate, productRoutes);
app.use("/api", authenticate, customerRouter);
app.use("/api", authenticate, categoryRouter);
app.use("/api", authenticate, brandRouter);
app.use("/api", authenticate, orderRouter);
app.use("/api", authenticate, salesReturnRouter);
app.use("/api", authenticate, invoiceRouter);
app.use("/api", authenticate, reportRouter);

initDb().then(() => {
  app.listen(port, () => {
    console.log(`✅ Server is running on http://localhost:${port}`);
  });
});
