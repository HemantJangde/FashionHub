// ProductDetailDynamic.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

export default function ProductDetailDynamic() {
  const { id } = useParams(); // product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `https://fashionhub-bzx6.onrender.com/api/product/${id}`,
        );
        setProduct(data);
      } catch (err) {
        console.error(err);
        setError("Product not found or error fetching product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

 if (loading) {
  return (
    <div className="max-w-5xl mx-auto py-10 px-4 animate-pulse">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Image Skeleton */}
        <div className="flex-1">
          <div className="w-full h-[400px] bg-gray-300 rounded-md"></div>
        </div>

        {/* Content Skeleton */}
        <div className="flex-1 space-y-4">
          <div className="h-8 bg-gray-300 rounded w-3/4"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
          <div className="h-6 bg-gray-300 rounded w-1/3"></div>

          <div className="h-24 bg-gray-300 rounded"></div>

          <div className="h-10 bg-gray-300 rounded w-40"></div>
        </div>
      </div>
    </div>
  );
}

  if (error || !product)
    return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 md:px-0">
      <Link to="/collection" className="text-blue-500 px-3 pt-1 rounded">
       ---  Go Back
      </Link>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="flex-1">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover rounded-md"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col">
          <h1 className="text-2xl font-semibold mb-3">{product.name}</h1>
          <p className="text-3xl font-medium mb-4">₹{product.price}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>

          <button
            onClick={() => {
              addToCart(product); // add item
              navigate("/cart"); // redirect
            }}
            className="bg-blue-600 text-white px-6 py-3 text-sm rounded hover:bg-blue-800 transition"
          >
            Add to Cart
          </button>

          <div className="mt-6 text-sm sm:text-base text-gray-500 space-y-2">
            <p>100% Original product guaranteed.</p>
            <p>Cash on delivery available for all orders.</p>
            <p> Easy return and exchange policy within 7 days.</p>
            <p>Fast shipping: delivered within 3-7 business days.</p>
            <p> Secure payments through SSL-encrypted checkout.</p>
            <p> Perfect packaging: ensures product safety during transit.</p>
            <p>24/7 Customer support to assist you anytime.</p>
            <p>Trusted by thousands of satisfied customers.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
