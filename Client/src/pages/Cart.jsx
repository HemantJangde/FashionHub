// Cart.jsx
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, updateCartQty, removeFromCart, clearCart } = useCart();
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  // Calculate subtotal safely
  const subtotal = cart.reduce(
    (acc, item) => acc + (item.product?.price || 0) * item.qty,
    0
  );

  const handleQtyChange = (productId, newQty) => {
    // if (newQty < 1) return;
    updateCartQty(productId, newQty);
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

 const placeOrder = async () => {
  if (!address.trim()) return alert("Please enter your delivery address!");
  if (!cart.length) return alert("Your cart is empty!");

  try {
    setLoading(true);

    await axios.post(
      "http://localhost:5000/api/orders",
      { address, paymentMethod: "COD", items: cart },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    clearCart();
    alert("✅ Order placed successfully!");
    navigate("/orders");
  } catch (error) {
    console.error(error);
    alert("❌ Error placing order.");
  } finally {
    setLoading(false);
  }
};
  if (!userInfo) return <p className="text-center py-10">Please login to view your cart.</p>;

  if (!cart.length) return <p className="text-center py-10">Your cart is empty.</p>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-4 border border-gray-400 p-4 rounded"
          >
            <img
              src={item.product?.image || "https://via.placeholder.com/80"}
              alt={item.product?.name || "Product removed"}
              className="w-20 h-20 object-cover rounded"
            />

            <div className="flex-1">
              <h3 className="font-medium">{item.product?.name || "Product removed"}</h3>

              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => handleQtyChange(item.product?._id, item.qty - 1)}
                  disabled={!item.product || item.qty <= 1}
                  className="border px-2 rounded hover:bg-gray-200"
                >
                  -
                </button>
                <span>{item.qty}</span>
                <button
                  onClick={() => handleQtyChange(item.product?._id, item.qty + 1)}
                  disabled={!item.product}
                  className="border px-2 rounded hover:bg-gray-200"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => handleRemove(item.product?._id)}
                className="mt-2 text-red-500 hover:underline text-sm"
              >
                Remove
              </button>
            </div>

            <p className="font-medium">₹{(item.product?.price || 0) * item.qty}</p>
          </div>
        ))}
      </div>

      {/* Address Input */}
      <div className="mt-6">
        <h3 className="font-medium mb-2">Delivery Address</h3>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your address"
          rows={3}
          className="w-full border p-2 rounded"
        />
      </div>

      {/* Subtotal & Place Order */}
      <div className="mt-6 flex justify-between items-center">
        <p className="text-lg font-semibold">Subtotal: ₹{subtotal}</p>
        <button
          onClick={placeOrder}
          disabled={loading}
          className={`px-6 py-2 rounded text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-800"
          }`}
        >
          {loading ? "Placing..." : "Place Order (COD)"}
        </button>
      </div>

      {/* Clear Cart Button */}
      <div className="mt-4">
        <button
          onClick={clearCart}
          className="px-6 py-2 rounded bg-red-600 text-white hover:bg-red-800"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}