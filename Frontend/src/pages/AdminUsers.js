import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AdminUsers() {
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userInfo || userInfo.user?.role !== "admin") {
      navigate("/");
      return;
    }
    fetchUsers();
  }, [userInfo, navigate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/users");
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
      alert("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      try {
        await API.delete(`/users/${id}`);
        fetchUsers();
      } catch (err) {
        console.error(err);
        alert("Failed to delete user");
      }
    }
  };

  if (loading) return <h2 style={{ textAlign: "center", padding: "50px" }}>Loading Users...</h2>;

  return (
    <div className="admin-page">
      <div className="admin-header" style={{ marginBottom: "20px" }}>
        <h1>Manage Users</h1>
        <p>View registered users and manage access.</p>
      </div>

      <div className="recent-orders">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td style={{ fontWeight: "bold" }}>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`status ${user.role === 'admin' ? 'delivered' : 'processing'}`}>
                    {user.role}
                  </span>
                </td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <button 
                    onClick={() => handleDelete(user._id)} 
                    className="admin-btn-delete"
                    disabled={user.role === 'admin'}
                    style={{ opacity: user.role === 'admin' ? 0.5 : 1, cursor: user.role === 'admin' ? 'not-allowed' : 'pointer' }}
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
}

export default AdminUsers;
