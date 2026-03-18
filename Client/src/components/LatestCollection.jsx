
import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

export default function LatestCollection({ products }) {
  
  return (
    <div className="my-10">
      {/* Heading */}
      <div className="text-center py-8 text-3xl">
        <div className="inline-flex gap-2 items-center mb-3">
          <p className="text-gray-500">
            LATEST <span className="text-gray-700 font-medium">COLLECTIONS</span>
          </p>
          <div className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></div>
        </div>
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {products.map((product) => (
           <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
