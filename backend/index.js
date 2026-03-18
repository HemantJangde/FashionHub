import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";


dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/test", testRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);




connectDB()
// server
const PORT = process.env.PORT || 5000;

// console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
// console.log("API Key:", process.env.CLOUDINARY_API_KEY);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});