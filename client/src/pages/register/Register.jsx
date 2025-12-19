import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";
import useFetch from "../../hooks/useFetch";
function Register() {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    country: "",
    city: "",
    phone: "",
    isAdmin: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const { postData } = useFetch("/auth/register");

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setCredentials((prev) => ({ ...prev, [e.target.id]: value }));
    // Clear messages when user starts typing
    setError(null);
    setSuccess(null);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!credentials.username || !credentials.email || !credentials.password) {
      setError({ message: "Username, email, and password are required." });
      setLoading(false);
      return;
    }

    if (!credentials.isAdmin) {
      setError({
        message: "If you want to login, please select 'Is Admin' checkbox.",
      });
      setLoading(false);
      return;
    }

    try {
      //await axios.post("/auth/register", credentials);
      await postData(credentials);
      setSuccess({ message: "Registration successful! Please log in." });
      setLoading(false);
    } catch (err) {
      setError(err.response?.data || { message: "Something went wrong!" });
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h1 className="register-title">Create a New User</h1>
        <input
          type="text"
          placeholder="Username"
          id="username"
          onChange={handleChange}
          className="register-input"
          required
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          onChange={handleChange}
          className="register-input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
          className="register-input"
          required
        />
        <input
          type="text"
          placeholder="Country"
          id="country"
          onChange={handleChange}
          className="register-input"
        />
        <input
          type="text"
          placeholder="City"
          id="city"
          onChange={handleChange}
          className="register-input"
        />
        <input
          type="text"
          placeholder="Phone"
          id="phone"
          onChange={handleChange}
          className="register-input"
        />
        <div className="register-admin-option">
          <label htmlFor="isAdmin">Is Admin?</label>
          <input
            type="checkbox"
            id="isAdmin"
            onChange={handleChange}
            checked={credentials.isAdmin}
          />
        </div>
        <button
          disabled={loading}
          onClick={handleClick}
          className="register-button"
        >
          {loading ? "Registering..." : "Register"}
        </button>
        {error && (
          <span className="register-error-message">{error.message}</span>
        )}

        {success && (
          <span className="register-success-message">{success.message}</span>
        )}

        <div className="register-navigation">
          <span className="register-nav-text">Already have an account?</span>
          &nbsp;
          <span
            className="register-nav-link"
            onClick={() => navigate("/login")}
          >
            Sign In
          </span>
        </div>
      </div>
    </div>
  );
}

export default Register;
