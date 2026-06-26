import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handlePlaceOrder = async () => {
    if (!userInfo) {
      alert("Please login first to place an order.");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      navigate("/");
      return;
    }

    try {
      const orderData = {
        orderItems: cart.map((item) => ({
          product: item._id,
          quantity: item.qty,
          price: item.price,
        })),
        shippingAddress: {
          address: form.address,
          city: form.city,
          state: form.state || "India",
          pincode: form.pincode || "000000",
        },
        paymentMethod: paymentMethod.toUpperCase(),
        totalAmount: total,
      };

      await API.post("/orders", orderData);
      clearCart();
      alert("Order Placed Successfully 🎉");
      navigate("/orders");
    } catch (err) {
      console.error("Error placing order:", err);
      alert(err.response?.data?.message || "Failed to place order. Please try again.");
    }
  };

  return (
    <div className="checkout-container">

      {/* LEFT SECTION */}
      <div className="checkout-left">

        <h2>Checkout</h2>

        {/* STEP 1 - ADDRESS */}
        {step === 1 && (
          <div className="checkout-box">

            <h3>Delivery Address</h3>

            <input
              placeholder="Full Name"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              placeholder="Phone Number"
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />

            <input
              placeholder="Address"
              onChange={(e) =>
                setForm({ ...form, address: e.target.value })
              }
            />

            <input
              placeholder="City"
              onChange={(e) =>
                setForm({ ...form, city: e.target.value })
              }
            />

            <input
              placeholder="State"
              onChange={(e) =>
                setForm({ ...form, state: e.target.value })
              }
            />

            <input
              placeholder="Pincode"
              onChange={(e) =>
                setForm({ ...form, pincode: e.target.value })
              }
            />

            <button onClick={() => setStep(2)}>
              Continue
            </button>

          </div>
        )}

        {/* STEP 2 - PAYMENT */}
        {step === 2 && (
          <div className="checkout-box">

            <h3>Payment Method</h3>

            <label>
              <input
                type="radio"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
              />
              Credit / Debit Card
            </label>

            <label>
              <input
                type="radio"
                checked={paymentMethod === "upi"}
                onChange={() => setPaymentMethod("upi")}
              />
              UPI Payment
            </label>

            <label>
              <input
                type="radio"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
              Cash on Delivery
            </label>

            {/* CARD UI */}
            {paymentMethod === "card" && (
              <div className="payment-box">
                <input placeholder="Card Number" />
                <input placeholder="Expiry Date" />
                <input placeholder="CVV" />
              </div>
            )}

            {/* UPI UI */}
            {paymentMethod === "upi" && (
              <div className="payment-box">
                <input placeholder="Enter UPI ID" />
              </div>
            )}

            <button onClick={() => setStep(3)}>
              Review Order
            </button>

          </div>
        )}

        {/* STEP 3 - REVIEW */}
        {step === 3 && (
          <div className="checkout-box">

            <h3>Review Order</h3>

            <p><b>Name:</b> {form.name}</p>
            <p><b>Phone:</b> {form.phone}</p>
            <p><b>Address:</b> {form.address}, {form.city}, {form.state} - {form.pincode}</p>

            <h4>Payment: {paymentMethod.toUpperCase()}</h4>

            <button onClick={handlePlaceOrder}>
              Place Order
            </button>

          </div>
        )}

      </div>

      {/* RIGHT SECTION - SUMMARY */}
      <div className="checkout-right">

        <h3>Order Summary</h3>

        {cart.map((item) => (
          <div key={item._id} className="summary-item">
            <p>{item.name}</p>
            <p>Qty: {item.qty}</p>
            <p>₹{item.price * item.qty}</p>
          </div>
        ))}

        <hr />

        <h2>Total: ₹{total}</h2>

      </div>

    </div>
  );
}

export default Checkout;