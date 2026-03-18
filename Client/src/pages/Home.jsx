import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("http://localhost:5000/api/products");
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>

  
      <h1>Our Products</h1>
<Link to="/cart">Go to Cart</Link>


        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
     
    </div>
  );
}

export default Home;