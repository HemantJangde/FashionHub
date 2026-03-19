import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});
  const [preview, setPreview] = useState(null);
  const { userInfo } = useAuth();
  const [loadingId, setLoadingId] = useState(null);
  const [actionType, setActionType] = useState(""); // "edit" or "delete"

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

    await axios.put(`http://localhost:5000/api/product/${editId}`, formData, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    setEditId(null);
    setPreview(null);
    fetchProducts();
  };

 return (
  <div className="w-full">
    {/* ================= MOBILE VIEW ================= */}
    <div className="grid grid-cols-1 gap-4 md:hidden">
      {products.map((p) => (
        <div key={p._id} className="bg-white p-4 rounded-xl shadow border border-gray-100">
          {editId === p._id ? (
            <>
              {/* IMAGE + NAME */}
              <div className="flex gap-3 items-center">
                <img
                  src={preview || p.image}
                  alt={p.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />

                <input
                  name="name"
                  value={editData.name}
                  onChange={handleChange}
                  className="input input-bordered input-sm w-full"
                />
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2 text-sm w-full"
              />

              {/* PRICE + STOCK */}
              <div className="flex gap-2 mt-3">
                <input
                  type="number"
                  name="price"
                  value={editData.price}
                  onChange={handleChange}
                  className="input input-bordered input-sm w-full"
                />

                <input
                  type="number"
                  name="countInStock"
                  value={editData.countInStock}
                  onChange={handleChange}
                  className="input input-bordered input-sm w-full"
                />
              </div>

              {/* ACTIONS */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={updateProduct}
                  className="btn  btn-xs flex-1"
                >
                  Save
                </button>

                <button
                  onClick={() => {
                    setEditId(null);
                    setPreview(null);
                  }}
                  className="btn btn-ghost btn-xs flex-1"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              {/* NORMAL VIEW */}
              <div className="flex gap-3 items-center">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h2 className="font-semibold text-sm">{p.name}</h2>
                  <p className="text-xs text-gray-500">
                    {p.category || "Fashion"}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex justify-between text-sm">
                <p>₹{p.price}</p>
                <span
                  className={`badge ${
                    p.countInStock > 0
                      ? "badge-"
                      : "badge-"
                  }`}
                >
                  {p.countInStock > 0
                    ? `${p.countInStock} in stock`
                    : "Out"}
                </span>
              </div>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => {
                    setLoadingId(p._id);
                    setActionType("edit");

                    setTimeout(() => {
                      startEdit(p);
                      setLoadingId(null);
                    }, 200);
                  }}
                  className="btn  btn-xs flex-1"
                  disabled={loadingId === p._id}
                >
                  {loadingId === p._id && actionType === "edit" ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    "Edit"
                  )}
                </button>

                <button
                  onClick={async () => {
                    setLoadingId(p._id);
                    setActionType("delete");

                    await deleteProduct(p._id);

                    setLoadingId(null);
                  }}
                  className="btn btn btn-xs flex-1"
                  disabled={loadingId === p._id}
                >
                  {loadingId === p._id && actionType === "delete" ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>

    {/* ================= DESKTOP TABLE ================= */}
    <div className="hidden md:block overflow-x-auto">
      <table className="table w-full min-w-[700px]">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              {editId === p._id ? (
                <>
                  <td>
                    <div className="flex items-center gap-3">
                      <img
                        src={preview || p.image}
                        className="w-12 h-12 rounded"
                      />

                      <input
                        name="name"
                        value={editData.name}
                        onChange={handleChange}
                        className="input input-bordered input-sm w-full"
                      />
                    </div>

                    <input
                      type="file"
                      onChange={handleImageChange}
                      className="mt-2 text-sm"
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      name="price"
                      value={editData.price}
                      onChange={handleChange}
                      className="input input-bordered input-sm w-full"
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      name="countInStock"
                      value={editData.countInStock}
                      onChange={handleChange}
                      className="input input-bordered input-sm w-full"
                    />
                  </td>

                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={updateProduct}
                        className="btn  btn-xs"
                      >
                        Save
                      </button>

                      <button
                        onClick={() => {
                          setEditId(null);
                          setPreview(null);
                        }}
                        className="btn btn-ghost btn-xs"
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </>
              ) : (
                <>
                  <td>
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image}
                        className="w-12 h-12 rounded"
                      />
                      <div>
                        <div className="font-semibold">{p.name}</div>
                        <div className="text-sm opacity-50">
                          {p.category || "Fashion"}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td>₹{p.price}</td>

                  <td>
                    <span
                      className={`badge ${
                        p.countInStock > 0
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {p.countInStock > 0
                        ? `Stock: ${p.countInStock}`
                        : "Out"}
                    </span>
                  </td>

                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setLoadingId(p._id);
                          setActionType("edit");

                          setTimeout(() => {
                            startEdit(p);
                            setLoadingId(null);
                          }, 200);
                        }}
                        className="btn  btn-xs"
                        disabled={loadingId === p._id}
                      >
                        {loadingId === p._id &&
                        actionType === "edit" ? (
                          <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                          "Edit"
                        )}
                      </button>

                      <button
                        onClick={async () => {
                          setLoadingId(p._id);
                          setActionType("delete");

                          await deleteProduct(p._id);

                          setLoadingId(null);
                        }}
                        className="btn btn-error btn-xs"
                        disabled={loadingId === p._id}
                      >
                        {loadingId === p._id &&
                        actionType === "delete" ? (
                          <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                          "Delete"
                        )}
                      </button>
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
}

export default AdminProducts;
