import express from "express";
import {
  getInvoices,
  getInvoiceDetails,
  getInvoicePdf,
} from "../controllers/invoice.controller.js";

const router = express.Router();

router.get("/invoices", getInvoices);
router.get("/invoices/:id", getInvoiceDetails);
router.get("/invoices/:id/pdf", getInvoicePdf);

export default router;
