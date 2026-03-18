import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// user route
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

// admin route
router.get("/admin", protect, admin, (req, res) => {
  res.json({ message: "Welcome Admin" });
});

export default router;