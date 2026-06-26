import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
// import Loader from "./components/Loader";
// import SearchBar from "./components/SearchBar";
// import ProducrCard from "./components/ProductCard";
// import AdminDashboard from "./pages/AdminDashboard";
// import Cart from "./pages/Cart";
function App() {
  return (
    <>
      <Navbar />

      <main
        style={{
          minHeight: "80vh",
          padding: "20px",
        }}
      >
        <AppRoutes />
      </main>

      <Footer />
    </>
  );
}

export default App;