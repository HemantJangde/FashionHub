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
    const { data } = await axios.get("http://localhost:5000/api/product");
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🗑️ DELETE
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    await axios.delete(`http://localhost:5000/api/product/${id}`, {
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
      `http://localhost:5000/api/product/${editId}`,
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
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Manage Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p._id}
            className="border rounded-lg shadow p-4 flex flex-col items-center bg-white"
          >
            {editId === p._id ? (
              <>
                <input
                  name="name"
                  value={editData.name}
                  onChange={handleChange}
                  className="border p-2 rounded w-full mb-2"
                  placeholder="Name"
                />
                <input
                  type="number"
                  name="price"
                  value={editData.price}
                  onChange={handleChange}
                  className="border p-2 rounded w-full mb-2"
                  placeholder="Price"
                />
                <input
                  type="number"
                  name="countInStock"
                  value={editData.countInStock}
                  onChange={handleChange}
                  className="border p-2 rounded w-full mb-2"
                  placeholder="Stock"
                />
                <textarea
                  name="description"
                  value={editData.description}
                  onChange={handleChange}
                  className="border p-2 rounded w-full mb-2"
                  placeholder="Description"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mb-2"
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-24 h-24 object-cover mb-2 rounded"
                  />
                )}
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={updateProduct}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => { setEditId(null); setPreview(null); }}
                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-32 h-32 object-cover rounded mb-2"
                />
                <h3 className="text-lg font-semibold mb-1">{p.name}</h3>
                <p className="font-medium mb-1">₹{p.price}</p>
                <p className={`mb-2 ${p.countInStock > 0 ? "text-green-600" : "text-red-600"}`}>
                  {p.countInStock > 0 ? `Stock: ${p.countInStock}` : "Out of Stock"}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(p)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(p._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminProducts;