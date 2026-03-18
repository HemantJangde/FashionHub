import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        qty: Number,
      },
    ],
    totalPrice: Number,
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;