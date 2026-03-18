import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { userInfo } = useAuth();

    // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);


    const updateCartQty = (productId, newQty) => {
    if (newQty < 1) return; // optional: prevent going below 1
    setCart((prev) =>
      prev.map((item) =>
        item.product._id === productId ? { ...item, qty: newQty } : item
      )
    );
  };

  const fetchCart = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/cart",
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setCart(data);
    } catch (error) {
      console.error(error);
    }
  };
  const removeFromCart = async (productId) => {
  try {
    await axios.delete(
      "http://localhost:5000/api/cart",
      {
        data: { productId }, // ⚠️ important for DELETE
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    fetchCart(); // refresh cart
  } catch (error) {
    console.error(error);
  }
};

const clearCart = () => {
  setCart([]);
};
  const addToCart = async (product) => {
    try {
      await axios.post(
        "http://localhost:5000/api/cart",
        { productId: product._id },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      fetchCart();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userInfo) {
      fetchCart();
    } else {
      setCart([]);
    }
  }, [userInfo]);

  return (
    <CartContext.Provider value={{ cart, addToCart ,removeFromCart , clearCart , updateCartQty}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);