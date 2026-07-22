import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/addProduct.css";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!user || user.role !== "admin") {
    navigate("/");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      return toast.warning("Please select an image");
    }

    setLoading(true);

    const data = new FormData();

    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("stock", formData.stock);
    data.append("image", image);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: data,
      });

      const responseData = await res.json();

      if (res.ok) {
        toast.success("Product created successfully!");
        navigate("/admin/products");
      } else {
        toast.error(responseData.message || "Error creating product");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-container">

      <h2>Add New Product</h2>

      <form className="add-product-form" onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Product Name"
          required
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />

        <textarea
          rows="5"
          placeholder="Description"
          required
          onChange={(e) =>
            setFormData({
              ...formData,
              description: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Price"
          required
          onChange={(e) =>
            setFormData({
              ...formData,
              price: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Category"
          required
          onChange={(e) =>
            setFormData({
              ...formData,
              category: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Stock Quantity"
          required
          onChange={(e) =>
            setFormData({
              ...formData,
              stock: e.target.value,
            })
          }
        />

        <div className="image-upload">

          <label>Upload Product Image</label>

          <input
            type="file"
            accept="image/*"
            required
            onChange={(e) =>
              setImage(e.target.files[0])
            }
          />

        </div>

        <button
          type="submit"
          className="btn"
          disabled={loading}
        >
          {loading
            ? "Uploading & Creating..."
            : "Publish Product"}
        </button>

      </form>

    </div>
  );
};

export default AddProduct;