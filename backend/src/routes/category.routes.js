import express from "express";

import {
  getCategories,
  insertCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

const router = express.Router();

router.get("/categories", getCategories);
router.post("/categories", insertCategory);
router.put("/categories", updateCategory);
router.delete("/categories/:id", deleteCategory);

export default router;
