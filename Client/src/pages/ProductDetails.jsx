import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );
      setProduct(data);
    };

    fetchProduct();
  }, [id]);


  return (
    <div style={{ padding: "20px" }}>
      <img src={product.image} width="300" />

      <h2>{product.name}</h2>

      <p>{product.description}</p>

      <h3>₹{product.price}</h3>
    </div>
  );
}
  

export default ProductDetails;