import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  console.log(product);
  

  return (
    <div style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "10px", width: "200px" }}>
      
      <Link to={`/product/${product._id}`}>
        <img src={product.image} width="100%" />
        <h3>{product.name}</h3>
        <p>₹{product.price}</p>
      </Link>

      <button onClick={() => addToCart(product)}>
        Add to Cart
      </button>

    </div>
  );
}

export default ProductCard;