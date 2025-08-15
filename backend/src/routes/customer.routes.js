import express from "express";
import {
  getCustomers,
  getCustomer,
  insertCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customer.controller.js";

const router = express.Router();

router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomer);
router.post("/customers", insertCustomer);
router.put("/customers/:id", updateCustomer);
router.delete("/customers/:id", deleteCustomer);

export default router;
