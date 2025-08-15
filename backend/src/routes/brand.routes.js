import express from "express";
import {
  getBrands,
  insertBrand,
  updateBrand,
  deleteBrand,
} from "../controllers/brand.controller.js";

const router = express.Router();

router.get("/brands", getBrands);
router.post("/brands", insertBrand);
router.put("/brands/:id", updateBrand);
router.delete("/brands/:id", deleteBrand);

export default router;