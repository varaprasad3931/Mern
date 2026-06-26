import { Routes, Route } from "react-router-dom";

// Pages
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Orders from "../pages/Orders";
import AdminDashboard from "../pages/AdminDashboard";
import AdminProducts from "../pages/AdminProducts";
import AdminUsers from "../pages/AdminUsers";
import CustomerSupport from "../pages/CustomerSupport";
import Checkout from "../pages/Checkout";

// Optional 404 page (create later if you want)
const NotFound = () => (
  <h2 style={{ textAlign: "center", marginTop: "50px" }}>
    404 - Page Not Found
  </h2>
);

function AppRoutes() {
  return (
    <Routes>

      {/* ================= HOME ================= */}
      <Route path="/" element={<Home />} />

      {/* ================= PRODUCTS ================= */}
      <Route path="/products" element={<Products />} />

      {/* ================= PRODUCT DETAILS ================= */}
      <Route path="/product/:id" element={<ProductDetails />} />

      {/* ================= CART ================= */}
      <Route path="/cart" element={<Cart />} />

      {/* ================= CHECKOUT ================= */}
      <Route path="/checkout" element={<Checkout />} />

      {/* ================= AUTH ================= */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ================= USER ================= */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/orders" element={<Orders />} />

      {/* ================= ADMIN ================= */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/products" element={<AdminProducts />} />
      <Route path="/admin/users" element={<AdminUsers />} />

      {/* ================= SUPPORT ================= */}
      <Route path="/support" element={<CustomerSupport />} />

      {/* ================= 404 ================= */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default AppRoutes;