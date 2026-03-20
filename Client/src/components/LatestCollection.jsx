
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

export default function LatestCollection({ products }) {
   const [loading, setLoading] = useState(true);
  
  return (
    <div className="my-10">
      {/* Heading */}
      <div className="text-center py-8 text-3xl">
  <div className="inline-flex gap-2 items-center mb-3">
    <p className="text-gray-500">
      NEW <span className="text-gray-700 font-medium">SEASON STYLES</span>
    </p>
    <div className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></div>
  </div>

  <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
    Step into the season with our latest fashion drops. Designed to keep you stylish, confident, and comfortable wherever you go.
  </p>
</div>

      {/* Products Grid */}
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
