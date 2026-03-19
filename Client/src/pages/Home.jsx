import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters & search
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState(""); // "low-high" | "high-low"
  const [categories, setCategories] = useState([]);
     const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/product");
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

    // Search
    if (search) {
      temp = temp.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Category filter
    if (category !== "All") {
      temp = temp.filter((p) => p.category === category);
    }

    // Sorting
    if (sort === "low-high") {
      temp.sort((a, b) => a.price - b.price);
    } else if (sort === "high-low") {
      temp.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(temp);
  }, [search, category, sort, products]);

  if (loading)
    return (
      <p className="text-center py-10 text-gray-500">Loading products...</p>
    );

  if (!products.length)
    return (
      <p className="text-center py-10 text-gray-500">No products found.</p>
    );

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      {/* <h1 className="text-2xl font-semibold mb-6">All Products</h1> */}

      {/* Filters */}
      <div className="flex flex-col  sm:flex-row gap-4 mb-6 items-center">

        
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className=" border border-gray-200 text-shadow-gray-800 px-3 py-2 rounded-lg  font-bold transition focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Sort By</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>

        <button
          onClick={() => {
            setSearch("");
            setCategory("All");
            setSort("");
          }}
          className="  border border-gray-200 text-shadow-gray-800 px-3 py-2 rounded-lg hover:bg-gray-600 hover:text-white font-bold transition"
        >
          Reset
        </button>
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
                 onClick={() => addToCart(product)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </Link>
        ))}

        {!filteredProducts.length && (
          <p className="col-span-full text-center py-10 text-gray-500">
            No products match your filters.
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;
