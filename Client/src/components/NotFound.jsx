// src/pages/NotFound.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      {/* Hero Illustration / Icon */}
      <div className="mb-8">
        <FiShoppingBag className="w-24 h-24 sm:w-32 sm:h-32 text-black mx-auto animate-bounce" />
      </div>

      {/* 404 Title */}
      <h1 className="text-6xl sm:text-8xl font-extrabold text-gray-800 mb-4">
        404
      </h1>

      {/* Message */}
      <p className="text-lg sm:text-xl text-gray-600 mb-6">
        Oops! We can't seem to find the page you're looking for.
      </p>
      <p className="text-gray-500 mb-8">
        But don’t worry, you can continue shopping and explore our latest collections.
      </p>

      {/* Call-to-Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => navigate("/")}
          className="bg-black/94 text-white px-6 py-3 rounded-md text-sm sm:text-base hover:bg-gray-300 hover:font-extrabold hover:text-black transition flex items-center justify-center gap-2"
        >
          <FiShoppingBag className="w-5 h-5" />
          Shop Now
        </button>

      </div>

     
    </div>
  );
}