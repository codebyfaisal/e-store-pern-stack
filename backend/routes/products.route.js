import express from "express";
import {
  getProducts,
  getProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";

const router = express.Router();

router.get("/products", getProducts);
router.get("/product/:id", getProduct);
router.post("/product", insertProduct);
router.put("/product", updateProduct);
router.delete("/product/:id", deleteProduct);

export default router;
