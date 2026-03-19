// Cart.jsx
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { sendOrderEmail } from "../services/sendEmail";

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
  if (!address.trim()) return toast.error("Please enter your delivery address!");
  if (!cart.length) return toast.error("Your cart is empty!");

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
        await sendOrderEmail(userInfo, cart, address);
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
  <div className="max-w-4xl mx-auto py-10 px-4 ">
  {/* Cart Header */}
  <div className="text-2xl mb-6">
    <div className="inline-flex gap-2 items-center mb-3">
      <p className="text-gray-500">
        YOUR <span className="text-gray-700 font-medium">CART</span>
      </p>
      <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
    </div>
  </div>

  {/* Cart Items */}
  <div className="space-y-4">
    {cart.map((item) => (
      <div
        key={item._id}
        className="py-4 border-t border-b border-gray-300/80 text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
      >
        {/* Product Info */}
        <div className="flex items-start gap-6">
          <img
            src={item.product?.image || "https://via.placeholder.com/80"}
            alt={item.product?.name || "Product removed"}
            className="w-16 sm:w-20 object-cover rounded"
          />
          <div>
            <h3 className="text-xs sm:text-lg font-medium">{item.product?.name || "Product removed"}</h3>
            <div className="flex items-center gap-5 mt-2">
              <p>₹{item.product?.price || 0}</p>
              {/* <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.product?.size || "N/A"}</p> */}
            </div>
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center">
          <button
            onClick={() => handleQtyChange(item.product?._id, item.qty - 1)}
            disabled={!item.product || item.qty <= 1}
            className="border px-2 rounded hover:bg-gray-200"
          >
            -
          </button>
          <span className="mx-2">{item.qty}</span>
          <button
            onClick={() => handleQtyChange(item.product?._id, item.qty + 1)}
            disabled={!item.product}
            className="border px-2 rounded hover:bg-gray-200"
          >
            +
          </button>
        </div>

        {/* Remove Button */}
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAACXBIWXMAABCcAAAQnAEmzTo0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFRSURBVHgB7ZfhTcMwFITPEf/JCBkBNggTUCYAJqAj0A1ggzABZYHEbJANmm4QFgicwUJVlTq8F6Wkkj/p5DaX1Ff7pc0zEJLn+ROHB8ElDXVjra0F1yCBHEkoR0ZdQ8gZ9DSUDfgZlUPJqGDcnvtDJrc8x4hgmq08CoZfbAFZDdz5saXWgfNSauFf115/wX3uygX7xPxYuq0sMC/cir2Z/aM7K8jatleYCH9zVP7tI+da7fqzLf4YTMpsg6l++Vm3GX7+M99ZtOuAX9N/gQLtirlJl9QrQ6QBvzjgTxbsd7IkSc4V/iCx+KXEYFJiMCkxmJQYTEoMJkUbrPFjW5blNuCj67oPKNB24s/U1hiz6TNdY8HHnW+/qqoWClTBOLGbrBg4J+gPEYtfykk2I6lvKqYi2AuEgl1QG/wTfVupur1H0uwf6FuxS+oWx6Pt6z2/APN7VZph5zBWAAAAAElFTkSuQmCC"
          alt="Remove item"
          className="w-4 mr-4 sm:w-5 cursor-pointer"
          onClick={() => handleRemove(item.product?._id)}
        />
      </div>
    ))}
  </div>

  {/* Delivery Address */}
<div className="mt-6">
  <label htmlFor="address" className="block text-gray-700 font-semibold mb-2">
    Delivery Address
  </label>
  <textarea
    id="address"
    value={address}
    onChange={(e) => setAddress(e.target.value)}
    placeholder="Enter your full delivery address"
    rows={4}
    className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
  />
</div>

  {/* Cart Totals */}
  <div className="flex justify-end my-10">
    <div className="w-full sm:w-[450px]">
      <div className="text-2xl mb-3">
        <div className="inline-flex gap-2 items-center mb-3">
          <p className="text-gray-500">
            CART <span className="text-gray-700 font-medium">TOTALS</span>
          </p>
          <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>₹{subtotal}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>₹500.00</p>
        </div>
        <hr />
        <div className="flex justify-between font-bold">
          <p>Total</p>
          <p>₹{subtotal + 500}</p>
        </div>
      </div>

      <div className="w-full text-end mt-4">
        <button
          onClick={placeOrder}
          disabled={loading}
          className={`bg-black text-white text-sm my-2 px-8 py-3 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"
          }`}
        >
          {loading ? "Placing..." : "Place Order (COD)"}
        </button>
      </div>

      <div className="mt-2 text-end">
   
      </div>
    </div>
  </div>
</div>
  );
}