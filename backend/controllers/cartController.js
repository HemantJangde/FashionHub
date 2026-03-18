import User from "../models/User.js";

// ✅ Add to cart
export const addToCart = async (req, res) => {
  const { productId } = req.body;

  const user = await User.findById(req.user._id);

  const exist = user.cart.find(
    (item) => item.product.toString() === productId
  );

  if (exist) {
    exist.qty += 1;
  } else {
    user.cart.push({ product: productId, qty: 1 });
  }

  await user.save();

  res.json(user.cart);
};

// ✅ Get cart
export const getCart = async (req, res) => {
  const user = await User.findById(req.user._id).populate("cart.product");

  res.json(user.cart);
};

// ❌ REMOVE FROM CART
export const removeFromCart = async (req, res) => {
  const { productId } = req.body;

  const user = await User.findById(req.user._id);

  user.cart = user.cart.filter(
    (item) => item.product.toString() !== productId
  );

  await user.save();

  res.json(user.cart);
};

// Update quantity
export const updateCartQty = async (req, res) => {
  const { productId, qty } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const cartItem = user.cart.find(item => item.product.toString() === productId);
    if (!cartItem) return res.status(404).json({ message: "Product not in cart" });

    cartItem.qty = qty;
    await user.save();

    res.status(200).json(user.cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};