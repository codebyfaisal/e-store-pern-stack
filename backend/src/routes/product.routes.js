import express from "express";
import {
  getProducts,
  getProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
  getProductMeta,
} from "../controllers/products.controller.js";

const router = express.Router();

router.get("/products", getProducts);
router.get("/products/meta", getProductMeta);
router.get("/products/:id", getProduct);
router.post("/products", insertProduct);
router.put("/products", updateProduct);
router.delete("/products/:id", deleteProduct);

export default router;
