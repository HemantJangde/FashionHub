import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
   updateProduct,
  deleteProduct,  
} from "../controllers/productController.js";

import { protect, admin } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/", protect, admin, upload.single("image"), createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", protect, admin,  upload.single("image"),updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

export default router;