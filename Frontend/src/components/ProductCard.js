import { useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div className="product-card">

      <img
        src={product.image}
        alt={product.name}
      />

      <h3>{product.name}</h3>

      <p>₹{product.price}</p>

      <div className="btn-group">

        {/* VIEW PRODUCT */}
        <button
          onClick={() =>
            navigate(
              `/product/${product._id}`
            )
          }
        >
          View Details
        </button>

      </div>

    </div>
  );
}

export default ProductCard;