import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/adminDashboard.css";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await fetch("/api/analytics", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setStats(data);
        } else {
          setStats({
            totalOrders: 0,
            totalProducts: 0,
            totalUsers: 0,
            totalRevenue: 0,
          });
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, [user, navigate]);

  return (
    <div className="admin-dashboard">

      <div className="admin-header">
        <img
          src="/ShopNestLogo.png"
          alt="ShopNest Logo"
          className="admin-logo"
        />

        <div>
          <h2>Admin Dashboard</h2>
          <p>
            Welcome back, <span>{user?.name}</span>
          </p>
        </div>
      </div>

      {stats ? (
        <div className="stats-grid">

          <div className="stat-card">
            <h4>Total Orders</h4>
            <span>{stats.totalOrders}</span>
          </div>

          <div className="stat-card">
            <h4>Total Products</h4>
            <span>{stats.totalProducts}</span>
          </div>

          <div className="stat-card">
            <h4>Total Users</h4>
            <span>{stats.totalUsers}</span>
          </div>

          <div className="stat-card">
            <h4>Total Revenue</h4>
            <span>₹{stats.totalRevenue.toFixed(2)}</span>
          </div>

        </div>
      ) : (
        <h3 className="loading">Loading metrics...</h3>
      )}

      <div className="admin-controls">

        <h3>Administrative Controls</h3>

        <div className="admin-buttons">

          <button
            className="btn"
            onClick={() => navigate("/admin/add-product")}
          >
            + Add Product
          </button>

          <button
            className="btn secondary-btn"
            onClick={() => navigate("/admin/products")}
          >
            📦 Manage Products
          </button>

          <button
            className="btn secondary-btn"
            onClick={() => navigate("/admin/orders")}
          >
            🚚 Manage Orders
          </button>

          <button
            className="btn secondary-btn"
            onClick={() => navigate("/admin/users")}
          >
            👥 Users Directory
          </button>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;