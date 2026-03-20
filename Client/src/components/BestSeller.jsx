import React, { useState } from "react";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

// Sample products array
const products = [
  {
    id: "6683daf67f779795ecfa9905",
    name: "Women Zip-Front Relaxed Fit Jacket",
    price: 68,
    img: "https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img51.png",
  },
  {
    id: "6683da717f779795ecfa98fb",
    name: "Men Slim Fit Relaxed Denim Jacket",
    price: 72,
    img: "https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img46.png",
  },
  {
    id: "6683db0d7f779795ecfa9907",
    name: "Men Slim Fit Relaxed Denim Jacket",
    price: 84,
    img: "https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img52.png",
  },
  {
    id: "6683da147f779795ecfa98f7",
    name: "Women Zip-Front Relaxed Fit Jacket",
    price: 78,
    img: "https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img44.png",
  },
  {
    id: "6683da5f7f779795ecfa98f9",
    name: "Men Slim Fit Relaxed Denim Jacket",
    price: 86,
    img: "https://raw.githubusercontent.com/avinashdm/gs-images/main/forever/p_img45.png",
  },
];

export default function BestSeller() 
{
  const [loading, setLoading] = useState(true);

  return (
    <div className="my-10">
     <div className="text-center text-3xl py-8">
  <div className="inline-flex gap-2 items-center mb-3">
    <p className="text-gray-500">
      TRENDING <span className="text-gray-700 font-medium">COLLECTION</span>
    </p>
    <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
  </div>

  <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
    Discover the latest styles loved by our customers. Handpicked pieces that define comfort, quality, and modern fashion.
  </p>
</div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
       {loading
  ? [...Array(8)].map((_, i) => <ProductCardSkeleton key={i} setLoading={setLoading}/>)
  : products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
      </div>
    </div>
  );
}