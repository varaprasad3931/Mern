import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../assets/styles/navbar.css";

function Navbar() {
  const { userInfo, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        <h2>TrendEra</h2>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search products..."
        />
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
        
        {userInfo ? (
          <>
            <Link to="/orders">Orders</Link>
            <Link to="/profile">Profile</Link>
            {userInfo.user?.role === "admin" && (
              <Link to="/admin" style={{ color: "#ffc107", fontWeight: "bold" }}>Admin</Link>
            )}
            <span className="user-greeting" style={{ color: "#fff", marginLeft: "10px" }}>
              Hi, {userInfo.user?.name.split(" ")[0]}
            </span>
            <button 
              onClick={handleLogout} 
              style={{
                background: "transparent",
                border: "1px solid #ff4d4d",
                color: "#ff4d4d",
                padding: "4px 10px",
                borderRadius: "4px",
                cursor: "pointer",
                marginLeft: "10px"
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        <Link to="/support">Support</Link>
      </div>
    </nav>
  );
}

export default Navbar;