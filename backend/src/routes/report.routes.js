import express from "express";
import { getSalesReports, getInventoryReports,getProfitLossReport,getAnnualReport } from "../controllers/reports.controller.js";

const router = express.Router();

router.get("/reports/sales", getSalesReports);
router.get("/reports/inventory", getInventoryReports);
router.get("/reports/profit-loss", getProfitLossReport);
router.get("/reports/annual", getAnnualReport);

export default router;