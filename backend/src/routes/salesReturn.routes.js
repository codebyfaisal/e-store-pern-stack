import express from "express";
import { getSalesReturns } from "../controllers/salesReturns.controller.js";

const router = express.Router();

router.get("/sales-returns", getSalesReturns);
// router.put("/sales-returns", updateSalesReturn);
// router.delete("/sales-returns/:id", deleteSalesReturn);

export default router;
