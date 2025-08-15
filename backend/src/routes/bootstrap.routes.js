import express from "express";
import { getBootstrapData } from "../controllers/bootstrap.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/bootstrap", authenticate, getBootstrapData);

export default router;
