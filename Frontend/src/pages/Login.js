import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      login(data);

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid credentials"
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h1>TrendEra</h1>
        <p>
          Discover trending fashion,
          electronics and lifestyle
          products.
        </p>
      </div>

      <div className="login-right">
        <div className="login-card">
          <h2>Welcome Back 👋</h2>

          <p className="subtitle">
            Login to continue shopping
          </p>

          {error && (
            <div className="error-box">
              {error}
            </div>
          )}

          <form onSubmit={submitHandler}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              required
            />

            <div className="login-options">
              <label>
                <input
                  type="checkbox"
                />
                Remember Me
              </label>

              <span>
                Forgot Password?
              </span>
            </div>

            <button type="submit">
              Login
            </button>
          </form>

          <p className="register-link">
            Don't have an account?{" "}
            <Link to="/register">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;