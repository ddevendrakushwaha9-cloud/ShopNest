import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/adminUsers.css";

const AdminUsers = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  useEffect(() => {

    if (!user) {
      navigate("/login");
      return;
    }

    const fetchUsers = async () => {
      try {

        const res = await fetch("/api/auth/users", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setUsers(Array.isArray(data) ? data : []);
        } else {
          setUsers([]);
        }

      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();

  }, [user, navigate]);


  if (!user) {
    return null;
  }


  return (
    <div className="admin-users-container">

      <h2 className="admin-users-title">
        User Directory
      </h2>


      <div className="table-wrapper">

        <table className="users-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ROLE</th>
              <th>JOINED</th>
            </tr>
          </thead>


          <tbody>

            {users.map((u) => (

              <tr key={u._id}>

                <td>{u._id.substring(0, 8)}...</td>

                <td>{u.name}</td>

                <td>{u.email}</td>


                <td>
                  <span
                    className={
                      u.role === "admin"
                        ? "role-badge admin-role"
                        : "role-badge user-role"
                    }
                  >
                    {u.role.toUpperCase()}
                  </span>
                </td>


                <td>
                  {u.createdAt
                    ? new Date(u.createdAt).toLocaleDateString()
                    : "N/A"}
                </td>


              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default AdminUsers;