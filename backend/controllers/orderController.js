import Order from "../models/Order.js";
import User from "../models/User.js";

// ✅ Place Order
export const placeOrder = async (req, res) => {
  const { address, paymentMethod, items } = req.body;

  if (!items || !items.length) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  // ✅ Filter out null products
  const validItems = items.filter(item => item.product);

  if (!validItems.length) {
    return res.status(400).json({ message: "No valid products in cart" });
  }

  const orderItems = validItems.map(item => ({
    product: item.product._id,
    qty: item.qty,
  }));

  const order = new Order({
    user: req.user._id,
    orderItems,
    address,
    paymentMethod,
  });

  const createdOrder = await order.save();
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