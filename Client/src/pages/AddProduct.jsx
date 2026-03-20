import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

function AddProduct() {
  const { userInfo } = useAuth();

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(
      "https://fashionhub-bzx6.onrender.com/api/products",
      form,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    alert("Product Added!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Product</h2>

      <input placeholder="Name"
        onChange={(e) => setForm({...form, name: e.target.value})}
      />

      <input placeholder="Price"
        onChange={(e) => setForm({...form, price: e.target.value})}
      />

      <button type="submit">Add</button>
    </form>
  );
}

export default AddProduct;