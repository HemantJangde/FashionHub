import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, updateCartQty, clearCart } = useCart();
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  // ✅ Address state
  const [address, setAddress] = useState("");

  const placeOrder = async () => {
    if (!address.trim()) return alert("Please enter your address!");

    try {
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
      alert("✅ Order Placed Successfully!");
      navigate("/orders");
    } catch (error) {
      console.error(error);
      alert("❌ Error placing order");
    }
  };

  return (
    <div>
      <h1>Your Cart</h1>

      {cart.map((item) => (
        <div
          key={item._id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "10px",
          }}
        >
          <img
            src={item.product.image}
            alt={item.product.name}
            style={{ width: "80px", height: "80px", objectFit: "cover" }}
          />

          <div>
            <h3>{item.product.name}</h3>

            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <button
                onClick={() =>
                  updateCartQty(item.product._id, item.qty - 1)
                }
                disabled={item.qty <= 1}
              >
                -
              </button>
              <span>{item.qty}</span>
              <button
                onClick={() =>
                  updateCartQty(item.product._id, item.qty + 1)
                }
              >
                +
              </button>
            </div>

            <button onClick={() => removeFromCart(item.product._id)}>
              Remove
            </button>
          </div>
        </div>
      ))}

      {/* ✅ Address Input */}
      <div style={{ margin: "20px 0" }}>
        <h3>Delivery Address</h3>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your address"
          rows={3}
          style={{ width: "100%" }}
        />
      </div>

      <button onClick={placeOrder}>Place Order (COD)</button>
    </div>
  );
}