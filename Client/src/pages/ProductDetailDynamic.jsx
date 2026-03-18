// ProductDetailDynamic.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

export default function ProductDetailDynamic() {
  const { id } = useParams(); // product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
   const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/product/${id}`
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

  if (loading)
    return <p className="text-center py-10 text-gray-500">Loading product...</p>;

  if (error || !product)
    return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 md:px-0">
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
            onClick={() => addToCart(product)}
            className="bg-blue-600 text-white px-6 py-3 text-sm rounded hover:bg-blue-800 transition"
          >
            Add to Cart
          </button>
          

          <div className="mt-6 text-sm text-gray-500 space-y-1">
            <p>100% Original product.</p>
            <p>Cash on delivery available.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
    </div>
  );
}