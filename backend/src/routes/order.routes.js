import express from "express";
import {
  getOrders,
  updateOrder,
} from "../controllers/orders.controller.js";

const router = express.Router();

router.get("/orders", getOrders);
router.put("/orders", updateOrder);

export default router;
