// ProductDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Sample products array (can be imported from a separate file)
const products = [
  {
    id: "6683da887f779795ecfa98fd",
    name: "Kid Tapered Slim Fit Trouser",
    price: "38",
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img47.png",
  },
  {
    id: "6683d8897f779795ecfa98df",
    name: "Men Round Neck Pure Cotton T-shirt",
    price: "64",
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img8.png",
  },
  {
    id: "6683d5b67f779795ecfa98bb",
    name: "Boy Round Neck Pure Cotton T-shirt",
    price: "60",
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img14.png",
  },
  {
    id: "6683d8d17f779795ecfa98e5",
    name: "Women Zip-Front Relaxed Fit Jacket",
    price: "74",
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img35.png",
  },
  {
    id: "6683d5e07f779795ecfa98bd",
    name: "Men Tapered Fit Flat-Front Trousers",
    price: "58",
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img15.png",
  },
  {
    id: "6683d4b27f779795ecfa98ab",
    name: "Girls Round Neck Cotton Top",
    price: "56",
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img6.png",
  },
  {
    id: "6683daf67f779795ecfa9905",
    name: "Women Zip-Front Relaxed Fit Jacket",
    price: "68",
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img51.png",
  },
  {
    id: "6683dadf7f779795ecfa9903",
    name: "Kid Tapered Slim Fit Trouser",
    price: "40",
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img50.png",
  },
  {
    id: "6683d94e7f779795ecfa98ed",
    name: "Men Printed Plain Cotton Shirt",
    price: "52",
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img39.png",
  },
  {
    id: "6683d8f27f779795ecfa98e7",
    name: "Women Zip-Front Relaxed Fit Jacket",
    price: "78",
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img36.png",
  },
  {
    id: "6683daf67f779795ecfa9905",
    name: "Women Zip-Front Relaxed Fit Jacket",
    price: 68,
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img51.png",
  },
  {
    id: "6683da717f779795ecfa98fb",
    name: "Men Slim Fit Relaxed Denim Jacket",
    price: 72,
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img46.png",
  },
  {
    id: "6683db0d7f779795ecfa9907",
    name: "Men Slim Fit Relaxed Denim Jacket",
    price: 84,
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img52.png",
  },
  {
    id: "6683da147f779795ecfa98f7",
    name: "Women Zip-Front Relaxed Fit Jacket",
    price: 78,
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img44.png",
  },
  {
    id: "6683da5f7f779795ecfa98f9",
    name: "Men Slim Fit Relaxed Denim Jacket",
    price: 86,
    image:
      "https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img45.png",
  },
];

export default function ProductDetail() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true); 

  // Find product from the array
  const product = products.find((p) => p.id === id);

   useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

    if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-10 px-4 animate-pulse">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Image */}
          <div className="flex-1">
            <div className="w-full h-[400px] bg-gray-300 rounded-md"></div>
          </div>

          {/* Info */}
          <div className="flex-1 space-y-4">
            <div className="h-8 bg-gray-300 rounded w-3/4"></div>
            <div className="h-5 bg-gray-300 rounded w-1/2"></div>
            <div className="h-6 bg-gray-300 rounded w-1/3"></div>
            <div className="h-24 bg-gray-300 rounded"></div>
            <div className="h-10 bg-gray-300 rounded w-40"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return <p className="text-center py-10">Product not  wiwi found!</p>;

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

          <div className="flex items-center gap-2 mb-3">
            <span className="text-yellow-400 font-bold">
              {product.rating}⭐
            </span>
            <span className="text-gray-500">
              ({product.numReviews} reviews)
            </span>
          </div>

          <p className="text-3xl font-medium mb-4">₹{product.price}</p>

          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Size Selection */}
          {product.sizes && (
            <div className="mb-4">
              <p className="mb-2">Select Size:</p>
              <div className="flex gap-2"></div>
            </div>
          )}

          <button className="bg-red-400 text-white px-6 py-3 text-sm rounded hover:bg-red-800 transition">
            Out Of Stock
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
