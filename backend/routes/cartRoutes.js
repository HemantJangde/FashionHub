import express from "express";
import { addToCart, getCart,removeFromCart ,updateCartQty} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addToCart);
router.get("/", protect, getCart);
router.delete("/", protect, removeFromCart);
router.put("/", protect, updateCartQty); 

export default router;