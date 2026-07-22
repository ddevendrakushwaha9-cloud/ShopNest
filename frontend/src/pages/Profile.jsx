import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "../styles/profile.css";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchMyOrders = async () => {
      try {
        const res = await fetch("/api/orders/myorders", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setOrders(Array.isArray(data) ? data : []);
        } else {
          if (res.status === 401) {
            logout();
            navigate("/login");
          }
          setOrders([]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [user, navigate, logout]);

  if (!user) return null;

  return (
    <div className="profile-container">
      <div className="profile-header">

        <div>
          <h2>My Profile</h2>

          <p>
            <strong>Name:</strong> {user.name}
          </p>

          <p>
            <strong>Email:</strong> {user.email}
          </p>

          <span className="profile-badge">
            Account Type : {user.role.toUpperCase()}
          </span>
        </div>

        <button
          className="logout-btn"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          Logout
        </button>

      </div>

      <h3 className="order-heading">Order History</h3>

      {loading ? (
        <p className="loading-text">Fetching your orders...</p>
      ) : orders.length === 0 ? (
        <div className="empty-orders">
          <p>You haven't placed any orders yet.</p>

          <Link to="/" className="shop-btn">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order._id}>

              <div>
                <p>
                  <strong>Order ID:</strong> {order._id}
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>

                <p>
                  <strong>Total:</strong>
                  <span className="price">
                    ₹{order.totalAmount.toFixed(2)}
                  </span>
                </p>
              </div>

              <span className={`status ${order.status.toLowerCase()}`}>
                {order.status}
              </span>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;