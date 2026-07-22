import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/adminOrders.css";

const AdminOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch("/api/orders", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    };

    fetchOrders();
  }, [user]);

  const updateStatus = async (id, status) => {
    const res = await fetch(`/api/orders/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ status }),
    });

    if (res.ok) {
  setOrders(prevOrders =>
    prevOrders.map(order =>
      order._id === id
        ? { ...order, status: status }
            : order
        )
    );
    }
  };

  return (
    <div className="admin-orders-container">

      <h2 className="admin-orders-title">
        Manage Orders
      </h2>

      <div className="table-wrapper">

        <table className="orders-table">

          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>USER</th>
              <th>TOTAL</th>
              <th>DATE</th>
              <th>STATUS</th>
            </tr>
          </thead>

          <tbody>

            {orders.map((order) => (
              <tr key={order._id}>

                <td>{order._id.substring(0, 8)}...</td>

                <td>{order.user?.name || "Deleted User"}</td>

                <td>₹{order.totalAmount.toFixed(2)}</td>

                <td>
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                <td>
                  <select
                        className="status-select"
                        value={order.status}
                        onChange={(e) => {
                            console.log("Selected Status:", e.target.value);
                            updateStatus(order._id, e.target.value);
                        }}
                    >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default AdminOrders;