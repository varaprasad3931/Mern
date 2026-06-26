import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AdminProducts() {
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    stock: "",
    averageRating: 4.5
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (!userInfo || userInfo.user?.role !== "admin") {
      navigate("/");
      return;
    }
    fetchData();
  }, [userInfo, navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [prodRes, catRes] = await Promise.all([
        API.get("/products"),
        API.get("/categories")
      ]);
      setProducts(prodRes.data);
      setCategories(catRes.data);
    } catch (err) {
      console.error("Error fetching admin data:", err);
      alert("Failed to load products/categories");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock)
      };

      if (editId) {
        await API.put(`/products/${editId}`, payload);
        alert("Product updated successfully!");
      } else {
        await API.post("/products", payload);
        alert("Product added successfully!");
      }
      setShowForm(false);
      setEditId(null);
      setFormData({
        name: "", description: "", price: "", image: "", category: "", stock: "", averageRating: 4.5
      });
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Error saving product. Please check inputs.");
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category?._id || "",
      stock: product.stock,
      averageRating: product.averageRating || 4.5
    });
    setEditId(product._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await API.delete(`/products/${id}`);
        fetchData();
      } catch (err) {
        console.error(err);
        alert("Failed to delete product");
      }
    }
  };

  if (loading) return <h2 style={{ textAlign: "center", padding: "50px" }}>Loading Product Management...</h2>;

  return (
    <div className="admin-page">
      <div className="admin-header" style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1>Manage Products</h1>
          <p>Add, edit, or delete items from the catalog.</p>
        </div>
        <button 
          onClick={() => {
            setShowForm(!showForm);
            setEditId(null);
            setFormData({ name: "", description: "", price: "", image: "", category: "", stock: "", averageRating: 4.5 });
          }}
          className="admin-btn-primary"
        >
          {showForm ? "Cancel" : "➕ Add New Product"}
        </button>
      </div>

      {showForm && (
        <div className="admin-form-container">
          <h2>{editId ? "Edit Product" : "Add New Product"}</h2>
          <form onSubmit={handleSubmit} className="admin-form">
            <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleInputChange} required />
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} rows="3" required />
            <input type="number" name="price" placeholder="Price (₹)" value={formData.price} onChange={handleInputChange} required />
            <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleInputChange} required />
            
            <select name="category" value={formData.category} onChange={handleInputChange} required>
              <option value="" disabled>Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
            
            <input type="number" name="stock" placeholder="Stock Quantity" value={formData.stock} onChange={handleInputChange} required />
            <button type="submit" className="admin-btn-success">{editId ? "Update Product" : "Save Product"}</button>
          </form>
        </div>
      )}

      <div className="recent-orders">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td><img src={product.image} alt={product.name} style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "8px" }} /></td>
                <td>{product.name}</td>
                <td>₹{product.price}</td>
                <td style={{ textTransform: "capitalize" }}>{product.category?.name || "Uncategorized"}</td>
                <td>{product.stock}</td>
                <td>
                  <button onClick={() => handleEdit(product)} className="admin-btn-edit">Edit</button>
                  <button onClick={() => handleDelete(product._id)} className="admin-btn-delete" style={{ marginLeft: "10px" }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminProducts;
