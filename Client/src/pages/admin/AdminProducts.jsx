import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [preview, setPreview] = useState(null);
  const { userInfo } = useAuth();

  const fetchProducts = async () => {
    const { data } = await axios.get("http://localhost:5000/api/products");
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🗑️ DELETE
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    await axios.delete(`http://localhost:5000/api/products/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });

    fetchProducts();
  };

  // ✏️ START EDIT
  const startEdit = (product) => {
    setEditId(product._id);
    setEditData(product);
    setPreview(product.image); // show current image
  };

  // Handle input change
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Handle image change & preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditData({ ...editData, imageFile: file }); // store file for upload
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // 💾 SAVE UPDATE
  const updateProduct = async () => {
    const formData = new FormData();
    formData.append("name", editData.name);
    formData.append("price", editData.price);
    formData.append("countInStock", editData.countInStock);
    formData.append("description", editData.description || "");
    formData.append("category", editData.category || "General");

    // Append new image if selected
    if (editData.imageFile) formData.append("image", editData.imageFile);

    await axios.put(
      `http://localhost:5000/api/products/${editId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setEditId(null);
    setPreview(null);
    fetchProducts();
  };

  return (
    <div>
      <h2>Admin Products</h2>

      {products.map((p) => (
        <div
          key={p._id}
          style={{ border: "1px solid gray", margin: 10, padding: 10 }}
        >
          {editId === p._id ? (
            <>
              {/* ✏️ EDIT MODE */}
              <input
                name="name"
                value={editData.name}
                onChange={handleChange}
              />
              <input
                type="number"
                name="price"
                value={editData.price}
                onChange={handleChange}
              />
              <input
                type="number"
                name="countInStock"
                value={editData.countInStock}
                onChange={handleChange}
              />
              <textarea
                name="description"
                value={editData.description}
                onChange={handleChange}
              />

              <input type="file" accept="image/*" onChange={handleImageChange} />

              {/* Image preview */}
              {preview && (
                <div style={{ margin: "10px 0" }}>
                  <img
                    src={preview}
                    alt="Preview"
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                  />
                </div>
              )}

              <button onClick={updateProduct}>Save</button>
              <button onClick={() => { setEditId(null); setPreview(null); }}>
                Cancel
              </button>
            </>
          ) : (
            <>
              {/* 👀 VIEW MODE */}
              <img src={p.image} alt="" width="80" />
              <h3>{p.name}</h3>
              <p>₹{p.price}</p>
              <p>
                Stock:{" "}
                {p.countInStock > 0 ? (
                  <span style={{ color: "green" }}>{p.countInStock}</span>
                ) : (
                  <span style={{ color: "red" }}>Out of Stock</span>
                )}
              </p>
              <button onClick={() => startEdit(p)}>Edit</button>
              <button onClick={() => deleteProduct(p._id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default AdminProducts;