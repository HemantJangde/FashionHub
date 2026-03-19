import express from "express";
import { addToCart, getCart,removeFromCart ,updateCartQty} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/", protect, addToCart);
router.get("/", protect, getCart);
router.delete("/", protect, removeFromCart);
router.put("/", protect, updateCartQty); 
// Backend
// ❌ CLEAR ENTIRE CART
router.delete("/clear", protect, async (req, res) => {
  try {
    // Find the logged-in user
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Clear the cart array
    user.cart = [];

    // Save changes
    await user.save();

    // Return updated cart (empty)
    res.status(200).json(user.cart);
  } catch (err) {
    console.error("Error clearing cart:", err);
    res.status(500).json({ message: "Server error" });
  }
});
export default router;