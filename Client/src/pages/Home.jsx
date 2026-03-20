import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FiFilter, FiX ,FiSearch } from "react-icons/fi";

function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters & search
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState(""); // "low-high" | "high-low"
  const [categories, setCategories] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          "https://fashionhub-bzx6.onrender.com/api/product",
        );
        setProducts(data);
        setFilteredProducts(data);

        // Get unique categories
        const uniqueCategories = [
          "All",
          ...new Set(data.map((p) => p.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Apply filters & sorting
 useEffect(() => {
  let temp = [...products];

  // 🔍 Search filter
  if (search) {
    temp = temp.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // 🏷️ Category filter
  if (category && category !== "All") {
    temp = temp.filter((p) => p.category === category);
  }

  // 💰 Price sorting
  if (sort === "low-high") {
    temp.sort((a, b) => a.price - b.price);
  } else if (sort === "high-low") {
    temp.sort((a, b) => b.price - a.price);
  }

  // Update filtered products
  setFilteredProducts(temp);
}, [search, category, sort, products]);
 if (loading) {
  return (
    <div className="p-6">
      {/* Title Skeleton */}
      <div className="h-6 w-40 bg-base-300 rounded mb-6 animate-pulse"></div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="card bg-base-100 shadow-md p-4 space-y-4"
          >
            {/* Image Skeleton */}
            <div className="skeleton h-40 w-full rounded"></div>

            {/* Text Skeleton */}
            <div className="skeleton h-4 w-3/4"></div>
            <div className="skeleton h-4 w-1/2"></div>

            {/* Button Skeleton */}
            <div className="skeleton h-10 w-full rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
// import { FiSearch } from "react-icons/fi";

if (!products.length) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      {/* Icon */}
      <div className="bg-base-200 p-6 rounded-full mb-4">
        <FiSearch size={40} className="text-gray-500" />
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-700">
        No Products Found
      </h2>

      {/* Description */}
      <p className="text-gray-500 mt-2 max-w-md">
        We couldn’t find any products matching your search or filters. Try adjusting your filters or search term.
      </p>

      {/* Action Button */}
      <button
        onClick={() => {
          setSearch("");
          setCategory("All");
          setSort("");
        }}
        className="btn btn-primary mt-6"
      >
        Clear Filters
      </button>
    </div>
  );
}

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      {/* <h1 className="text-2xl font-semibold mb-6">All Products</h1> */}

      {/* Filters */}
   <div className="mb-6">
      {/* Filter Toggle Button */}
     {/* Filter Toggle Button */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="btn bg-white text-black rounded-lg font-mono font-semibold gap-2 hover:bg-black/50 hover:text-white hover:font-bold"
      >
        {showFilters ? <FiX size={20} /> : <FiFilter size={20} />}
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>
      {/* Filter Options */}
      {showFilters && (
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 items-center justify-between bg-white p-4 rounded-lg shadow-md">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition placeholder-gray-400"
          />

          {/* Category Dropdown */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            <option value="All">All Categories</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
            <option value="Accessories">Accessories</option>
          </select>

          {/* Sort Dropdown */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            <option value="">Sort By</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>

          {/* Reset Button */}
          {/* <button
            onClick={resetFilters}
            className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold shadow hover:bg-red-600 transition"
          >
            Reset
          </button> */}
        </div>
      )}
    </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            className="card bg-base-100 shadow-md hover:shadow-2xl transition duration-300"
          >
            {/* Image */}
            <figure className="h-64 bg-gray-100 flex items-center justify-center ">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </figure>

            {/* Body */}
            <div className="card-body">
              <h2 className="card-title text-base line-clamp-2">
                {product.name}
              </h2>

              <p className="text-gray-500 text-lg font-semibold">
                ₹{product.price}
              </p>

              <div className="card-actions justify-end mt-2">
                <button
                  className=" btn border-t-neutral-50"
                  onClick={
                    () => {
                      // addToCart(product);
                      navigate("/cart");
                    } // redirect
                  }
                >
                  Buy Now
                </button>
              </div>
            </div>
          </Link>
        ))}

       {!filteredProducts.length && (
  <div className="col-span-full flex justify-center">
    <div className="card bg-base-100 p-8 max-w-md text-center">
      
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div className="bg-base-200 p-4 rounded-full">
          <FiFilter size={32} className="text-gray-500" />
        </div>
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-700">
        No Matching Products
      </h2>

      {/* Description */}
      <p className="text-gray-500 mt-2 text-sm">
        Try changing your filters or search terms to find what you're looking for.
      </p>

      {/* Action Button */}
      <button
        onClick={() => {
          setSearch("");
          setCategory("All");
          setSort("");
        }}
        className="btn bg-white mt-5 text-black rounded-lg font-mono font-semibold gap-2 hover:bg-black/50 hover:text-white hover:font-bold"
      >
        Clear Filters
      </button>
    </div>
  </div>
)}
      </div>
    </div>
  );
}

export default Home;
