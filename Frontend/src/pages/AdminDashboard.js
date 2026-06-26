import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AdminDashboard() {
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const [usersCount, setUsersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userInfo || userInfo.user?.role !== "admin") {
      setLoading(false);
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const [usersRes, productsRes, ordersRes] = await Promise.all([
          API.get("/users"),
          API.get("/products"),
          API.get("/orders"),
        ]);

        setUsersCount(usersRes.data.length);
        setProductsCount(productsRes.data.length);
        setOrders(ordersRes.data);
      } catch (err) {
        console.error("Error fetching admin dashboard data:", err);
        setError("Failed to load dashboard statistics. Please ensure you are authorized.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [userInfo]);

  if (!userInfo || userInfo.user?.role !== "admin") {
    return (
      <div className="admin-page" style={{ textAlign: "center", paddingTop: "60px" }}>
        <h2 style={{ color: "red" }}>Access Denied</h2>
        <p>You do not have the administrative privileges required to access this dashboard.</p>
        <button 
          onClick={() => navigate("/")}
          style={{
            padding: "10px 25px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            marginTop: "15px"
          }}
        >
          Go to Home
        </button>
      </div>
    );
  }

  const revenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

  const stats = [
    {
      title: "Total Users",
      value: usersCount,
      icon: "👥",
    },
    {
      title: "Products",
      value: productsCount,
      icon: "📦",
    },
    {
      title: "Orders",
      value: orders.length,
      icon: "🛒",
    },
    {
      title: "Revenue",
      value: `₹${revenue.toLocaleString("en-IN")}`,
      icon: "💰",
    },
  ];

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome back, Admin 👋</p>
      </div>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading dashboard statistics...</p>
      ) : error ? (
        <p style={{ textAlign: "center", color: "red" }}>{error}</p>
      ) : (
        <>
          {/* Statistics */}
          <div className="stats-grid">
            {stats.map((item, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{item.icon}</div>
                <h2>{item.value}</h2>
                <p>{item.title}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <h2>Quick Actions</h2>
            <div className="action-grid">
              <button onClick={() => navigate("/admin/products")}>➕ Add Product</button>
              <button onClick={() => navigate("/admin/products")}>📦 Manage Products</button>
              <button onClick={() => navigate("/admin/users")}>👥 Manage Users</button>
              <button onClick={() => navigate("/orders")}>🛒 View Orders</button>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="recent-orders">
            <h2>Recent Orders</h2>
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 10).map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.user?.name || "Deleted User"}</td>
                    <td>₹{order.totalAmount}</td>
                    <td>
                      <span className={`status ${order.orderStatus.toLowerCase()}`}>
                        {order.orderStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminDashboard;