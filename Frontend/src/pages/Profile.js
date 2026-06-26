import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Profile() {
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (!userInfo) return;

    const fetchOrders = async () => {
      try {
        const { data } = await API.get("/orders/myorders");
        setOrders(data);
      } catch (err) {
        console.error("Error fetching user orders for profile:", err);
      } finally {
        setLoadingOrders(false);
      }
    };
    fetchOrders();
  }, [userInfo]);

  if (!userInfo) {
    return (
      <div className="profile-page" style={{ textAlign: "center", paddingTop: "50px" }}>
        <h2>Please login to view your profile.</h2>
        <button 
          onClick={() => navigate("/login")}
          style={{
            padding: "10px 25px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            marginTop: "15px"
          }}
        >
          Go to Login
        </button>
      </div>
    );
  }

  const user = {
    name: userInfo.user?.name || "Customer",
    email: userInfo.user?.email || "",
    role: userInfo.user?.role || "user",
    phone: "+91 9876543210",
    address: "Visakhapatnam, Andhra Pradesh, India",
    joined: "June 2026",
  };

  const totalSpent = orders.reduce((sum, order) => sum + order.totalAmount, 0);

  return (
    <div className="profile-page">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-cover"></div>
        <div className="profile-user">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Profile"
          />
          <div>
            <h1>{user.name}</h1>
            <p>{user.email} | <span style={{ textTransform: "capitalize", fontWeight: "600" }}>{user.role}</span></p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="profile-stats">
        <div className="stat-box">
          <h2>{loadingOrders ? "..." : orders.length}</h2>
          <p>Orders Placed</p>
        </div>

        <div className="stat-box">
          <h2>12</h2>
          <p>Wishlist</p>
        </div>

        <div className="stat-box">
          <h2>5</h2>
          <p>Reviews</p>
        </div>

        <div className="stat-box">
          <h2>₹{loadingOrders ? "..." : totalSpent.toLocaleString("en-IN")}</h2>
          <p>Total Spent</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="profile-content">
        {/* Left Side */}
        <div className="profile-card">
          <div className="card-header">
            <h2>Personal Information</h2>
            <button>Edit Profile</button>
          </div>

          <div className="info-row">
            <strong>Name:</strong>
            <span>{user.name}</span>
          </div>

          <div className="info-row">
            <strong>Email:</strong>
            <span>{user.email}</span>
          </div>

          <div className="info-row">
            <strong>Phone:</strong>
            <span>{user.phone}</span>
          </div>

          <div className="info-row">
            <strong>Address:</strong>
            <span>{user.address}</span>
          </div>

          <div className="info-row">
            <strong>Joined:</strong>
            <span>{user.joined}</span>
          </div>
        </div>

        {/* Right Side */}
        <div className="activity-card">
          <h2>Recent Activity</h2>
          {orders.length > 0 ? (
            orders.slice(0, 4).map((order) => (
              <div key={order._id} className="activity-item">
                📦 Placed Order of ₹{order.totalAmount} ({order.orderStatus})
              </div>
            ))
          ) : (
            <div className="activity-item">
              🌱 Welcome to TrendEra! Explore and place your first order.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;