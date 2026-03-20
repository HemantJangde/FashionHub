import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { userInfo } = useAuth();
   const [cartItems, setCartItems] = useState([]);

    // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const updateCartQty = async (productId, newQty) => {
  if (newQty < 1) return;

  try {
    // 🔹 Update UI first (optimistic update)
    setCart(prev =>
      prev
        .filter(item => item.product) // remove invalid
        .map(item =>
          item.product._id === productId
            ? { ...item, qty: newQty }
            : item
        )
    );

    // 🔹 Sync with backend
    await axios.put(
      "https://fashionhub-bzx6.onrender.com/api/cart",
      { productId, qty: newQty },
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );

  } catch (error) {
    console.error("Failed to update cart quantity:", error);

    // 🔴 Optional: rollback (advanced)
    // You can re-fetch cart here if needed
  }
};

//   const updateCartQty = async (productId, newQty) => {
//   if (newQty < 1) return;

//   // Filter out invalid items
//   const validCart = cart.filter(item => item.product);

//   try {
//     // Update backend
//     await axios.put(
//       "https://fashionhub-bzx6.onrender.com/api/cart",
//       { productId, qty: newQty },
//       {
//         headers: { Authorization: `Bearer ${userInfo.token}` },
//       }
//     );

//     // Update local state
//     setCart(prev =>
//       validCart.map(item =>
//         item.product._id === productId ? { ...item, qty: newQty } : item
//       )
//     );
//   } catch (error) {
//     console.error("Failed to update cart quantity:", error);
//   }
// };
  const fetchCart = async () => {
    try {
      const { data } = await axios.get(
        "https://fashionhub-bzx6.onrender.com/api/cart",
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
      "https://fashionhub-bzx6.onrender.com/api/cart",
      {
        data: { productId }, // ⚠️ important for DELETE
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
      toast.success("Item Remove From Cart")

//  setCartItems((prev) => prev.filter((item) => item._id !== id));
    fetchCart(); // refresh cart
  } catch (error) {
    console.error(error);
  }
};

const clearCart = async () => {
  try {
    await axios.delete("https://fashionhub-bzx6.onrender.com/api/cart/clear", {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    setCart([]);
  } catch (error) {
    console.error(error);
  }
};



  const addToCart = async (product) => {
    try {
      await axios.post(
        "https://fashionhub-bzx6.onrender.com/api/cart",
        { productId: product._id },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      //  setCartItems((prev) => [...prev, product]);
      toast.success("Item Added to Cart")
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
    <CartContext.Provider value={{ cart, addToCart ,cartItems,removeFromCart , clearCart , updateCartQty}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

