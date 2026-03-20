// import { useState } from "react";
// import axios from "axios";
// import { useAuth } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// function AdminAddProduct() {
//   const { userInfo } = useAuth();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     price: "",
//     description: "",
//     countInStock: "",
//   });

//   const [image, setImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const DEFAULT_IMAGE =
//     "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAS4AAACnCAMAAACYVkHVAAAAJ1BMVEX09PTa2trc3Nz29vbj4+Pg4ODv7+/Y2Njy8vLt7e3q6urm5ubn5+eHk7pVAAAEMklEQVR4nO2ci46jMAxFSZw3/P/3ru0QFtoppSPtUsn3rDSLmFaCIycxjplpAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPxzSLj7Ir4b8UPdU6lL8MvdF/TtiKjSQnQ5O+cClbsv6OvQEddDKrEo7xTPuAhdeySUivgqqc5xmBq6+MfdF/hVSFxRSYuEVGY93j/ocunuS/wCxujjsTeLKOe3aFJlfMKHJfDJXK2vjUVNldpCl7SLJvXlY2hJBmiSs4vlXGJM596tpvxel+OQSrt0S05Gk7aKGuhjT91sAbUeSUhNx7SUIv8i3nXFt8KiJKTyELVN5jz2ZhY1PSfwNMnk5S0mEhT6JL4be1kjqhZN4Pkj5dELURO5xeBopPnvbJXV1CKz+ekzIesSu8mirjrCSseemprerXmUOCDdbFAXJwWsK3ZR178VOXXdL4125jGJrjBUlbKWHd4QZSXYn7j3Hv4fPSn48HYpcHTtl8ZkJbxUlx/B5a+yJWcrVuZ9muXOR1LgfosZXVXutkLXNahwQp9HKfmQ20PXT4igsB6LrvgZIZrSJXO9H7VR0RXW1OBSRkHr5GdHVxBdayIgh+GTO2dhwZSuadHb7cerrpKuMpnTlTLPXm3U/USXrJZZGf+/pE7WdBWpR8xHXb6vkMctjWe8QV381Ohz/FlXCKfpg0ldUl5Yl8ajrkWWvvkkvizq4kyAh1xfGg+65t4XMUPXHi0l57407nR5N61Pkg+Zvl//GdXFSyPfb9PDva5RpiB/mO99f1Cyq0sfrHty+l4X/6ZuFWuTuki2GPu24WEw1j531d1glNJW5QefmvvOtkldum2oh4ep3nddx+abntDyfGdVF1GT7F3n9aMu30ppx4nLz9p2UihY1aVL41ohfEhTnxKHv8/fFMzqKnLDywVduz0Q0iK/RV0TbSbe6OLPbNGl+yA2dUlPiS6Np7rysYuEik1dWrLqj0Gnuh57biiZHIxEC1vSx6DXurzLz92oNVdz5cHRVyIJ1Ul0/dSMSnMzqEtmbacVwidd+cyWtv4a1CUVQu2oOejiTCGUIM3O2buXjc4GdfFTo1QIy0N0xUaFmqajy0sdFnVJhdCnH8qD8irLItu2L1tsLOpqWvKS9F51ScEwbsOP0nzSj2RRl75YMG+6qne7zdly2rRrUBcvjU4rhCO6fDv00Z991aIubbmMI7okni7fvkVda1/J0PXcS3/yVXu6aJr1DdjwcUuJSV3T1NzY3IGuCyS3vbf4WcOSSV2l9N0x+Rnef3yHxUdsJm4t4D58grVmyw6F0Goqr2r0J/QvGNM19TenPnW1YU1Xz7Sg6yL9di+/5PII/kwCeMsv/1JLmSy+aQwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABjiD11yHkXgwpzGAAAAAElFTkSuQmCC";

//   // 📝 handle input
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // 📦 submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);

//       const formData = new FormData();
//       formData.append("name", form.name);
//       formData.append("price", form.price);
//       formData.append("description", form.description);
//       formData.append("countInStock", form.countInStock);

//       // Append image if selected
//       if (image) {
//         formData.append("image", image);
//       } else {
//         formData.append("image", DEFAULT_IMAGE); // send default image URL
//       }

//       await axios.post("https://fashionhub-bzx6.onrender.com/api/products", formData, {
//         headers: {
//           Authorization: `Bearer ${userInfo.token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       alert("✅ Product Added Successfully");
//       navigate("/admin/products"); // redirect back
//     } catch (error) {
//       console.error(error);
//       alert("❌ Error adding product");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: "400px", margin: "auto" }}>
//       <h2>Add Product</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Product Name"
//           required
//           onChange={handleChange}
//         />

//         <input
//           type="number"
//           name="price"
//           placeholder="Price"
//           required
//           onChange={handleChange}
//         />

//         <textarea
//           name="description"
//           placeholder="Description"
//           onChange={handleChange}
//         />

//         <input
//           type="number"
//           name="countInStock"
//           placeholder="Stock"
//           required
//           onChange={handleChange}
//         />

//         <input type="file" onChange={(e) => setImage(e.target.files[0])} />

//         <button type="submit" disabled={loading}>
//           {loading ? "Uploading..." : "Add Product"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AdminAddProduct;

import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function AdminAddProduct() {
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    countInStock: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle image selection & preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("category", form.category);
      formData.append("description", form.description);
      formData.append("countInStock", form.countInStock);

      if (image) formData.append("image", image); // optional

      await axios.post(
        "https://fashionhub-bzx6.onrender.com/api/product",
        formData,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("✅ Product added successfully");
      navigate("/admin/products");
    } catch (error) {
      console.error("Add product error:", error);
      alert("❌ Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="max-w-md mx-auto mt-10">
  <div className="card bg-base-100 shadow-xl p-6">
    
    <h2 className="text-2xl font-bold text-center mb-6">
      Add New Product
    </h2>

    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Name */}
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        required
        onChange={handleChange}
        className="input input-bordered w-full"
      />

      {/* Price */}
      <input
        type="number"
        name="price"
        placeholder="Price"
        required
        onChange={handleChange}
        className="input input-bordered w-full"
      />

  <textarea
  
        name="category"
        placeholder="category (Start with capital letter)"
        onChange={handleChange}
        className="input input-bordered w-full"
      />
      {/* Description */}
      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
        className="textarea textarea-bordered w-full"
      />

      {/* Stock */}
      <input
        type="number"
        name="countInStock"
        placeholder="Stock"
        required
        onChange={handleChange}
        className="input input-bordered w-full"
      />

      {/* Image Upload */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="file-input file-input-bordered w-full"
      />

      {/* Preview */}
      {preview && (
        <div className="flex justify-center">
          <img
            src={preview}
            alt="Preview"
            className="w-28 h-28 object-cover rounded-lg border"
          />
        </div>
      )}

      {/* Button */}
      <button
        type="submit"
        disabled={loading}
        className="btn hover:bg-gray-600 hover:text-white w-full"
      >
        {loading ? (
          <span className="loading loading-spinner"></span>
        ) : (
          "Add Product"
        )}
      </button>

    </form>
  </div>
</div>
  );
}

export default AdminAddProduct;
