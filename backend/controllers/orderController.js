import Order from "../models/Order.js";
import User from "../models/User.js";

// ✅ Place Order
export const placeOrder = async (req, res) => {
  const user = await User.findById(req.user._id).populate("cart.product");

  if (user.cart.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const order = new Order({
    user: user._id,
    orderItems: user.cart.map((item) => ({
      product: item.product._id,
      qty: item.qty,
    })),
    totalPrice: user.cart.reduce(
      (acc, item) => acc + item.product.price * item.qty,
      0
    ),
  });

  const createdOrder = await order.save();

  // 🧹 clear cart after order
  user.cart = [];
  await user.save();

  res.status(201).json(createdOrder);
};

// 📜 Get My Orders
export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate(
    "orderItems.product"
  );

  res.json(orders);
};

// 👨‍💼 Admin: Get All Orders
export const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate("user", "name email");

  res.json(orders);
};