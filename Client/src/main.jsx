import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import './index.css'
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
<div><Toaster position="top-right" reverseOrder={false} />
<AuthProvider>

  <CartProvider>
    <App />
  </CartProvider>
</AuthProvider>
</div>
);