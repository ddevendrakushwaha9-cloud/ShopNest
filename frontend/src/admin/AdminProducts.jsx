import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../styles/adminProducts.css";

const AdminProducts = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (res.ok) {
        setProducts(products.filter((p) => p._id !== id));
      }
    }
  };

  return (
    <div className="admin-products-container">

      <div className="admin-products-header">
        <h2>Manage Products</h2>

        <Link to="/admin/add-product" className="btn">
          + Add Product
        </Link>
      </div>

      <div className="table-wrapper">

        <table className="products-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>STOCK</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>

            {products.map((product) => (
              <tr key={product._id}>

                <td>{product._id.substring(0, 8)}...</td>

                <td>{product.name}</td>

                <td>₹{product.price.toFixed(2)}</td>

                <td>{product.category}</td>

                <td>{product.stock}</td>

                <td className="action-buttons">

                  <Link
                    to={`/admin/edit-product/${product._id}`}
                    className="edit-btn"
                  >
                    Edit
                  </Link>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default AdminProducts;