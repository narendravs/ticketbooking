import React, { useState, useContext } from "react";
import "./login.css";
import { AuthContext } from "../../context/AuthContex";
import { useNavigate } from "react-router-dom";
import {
  IoMailOutline,
  IoLockClosedOutline,
  IoEyeOutline,
  IoEyeOffOutline,
} from "react-icons/io5";
import publicRequest from "../../api/axios";

function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { dispatch, loading, error } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [logerror, setError] = useState(null);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "LOGIN_START" });
      const res = await publicRequest.post("/auth/login", credentials);

      if (res.data) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed!" },
        });
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Something went wrong!";
      dispatch({
        type: "LOGIN_FAILURE",
        payload: { message: errorMessage },
      });
    }
  };

  const handleForgotEmailChange = (e) => {
    setForgotEmail(e.target.value);
    setError(null);
  };

  const handleForgotPassword = () => {
    setIsForgotModalOpen(true);
  };

  const handleResetSubmit = async () => {
    if (!forgotEmail) {
      setError({
        message: "Please enter a valid email.",
      });
      return;
    }
    // Simple RegEx to check for "text@text.domain" format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(forgotEmail)) {
      setError({
        message: "Please enter a valid email format (e.g., user@example.com).",
      });
      return;
    }

    try {
      // await axios.post('/auth/forgot-password', { email: forgotEmail });
      alert(
        `Password reset link has been sent to ${forgotEmail}. Please check your email.`,
      );
      // Close the modal
      setIsForgotModalOpen(false);
    } catch (err) {
      setError({ message: "Error processing request." });
    } finally {
      setForgotEmail("");
    }
  };

  // New handler to close the modal without submitting
  const handleResetCancel = () => {
    setIsForgotModalOpen(false);
    setForgotEmail("");
    setError(null);
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleForgotEmailChange = (e) => {
    setForgotEmail(e.target.value);
    setError(null);
  };

  const handleForgotPassword = () => {
    setIsForgotModalOpen(true);
  };

  const handleResetSubmit = async () => {
    if (!forgotEmail) {
      setError({
        message: "Please enter a valid email.",
      });
      return;
    }
    // Simple RegEx to check for "text@text.domain" format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(forgotEmail)) {
      setError({
        message: "Please enter a valid email format (e.g., user@example.com).",
      });
      return;
    }

    try {
      // await axios.post('/auth/forgot-password', { email: forgotEmail });
      alert(
        `Password reset link has been sent to ${forgotEmail}. Please check your email.`,
      );
      // Close the modal
      setIsForgotModalOpen(false);
    } catch (err) {
      setError({ message: "Error processing request." });
    } finally {
      setForgotEmail("");
    }
  };

  // New handler to close the modal without submitting
  const handleResetCancel = () => {
    setIsForgotModalOpen(false);
    setForgotEmail("");
    setError(null);
  };

  return (
    <div className="login-container-wrapper">
      <div className="screen-1">
        <div className="email">
          <label htmlFor="email">Email Address</label>
          <div className="sec-2">
            <IoMailOutline />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Username@gmail.com"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="password">
          <label htmlFor="password">Password</label>
          <div className="sec-2">
            <IoLockClosedOutline />
            <input
              className="pas"
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="············"
              onChange={handleChange}
            />
            {showPassword ? (
              <IoEyeOffOutline
                className="show-hide"
                onClick={() => setShowPassword(false)}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <IoEyeOutline
                className="show-hide"
                onClick={() => setShowPassword(true)}
                style={{ cursor: "pointer" }}
              />
            )}
          </div>
        </div>

        <div className="login-button-container">
          <button disabled={loading} className="login" onClick={handleClick}>
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <span className="error">{error.message}</span>}
        </div>

        <div className="footer1">
          <span onClick={handleRegister}>Sign up</span>
          <span onClick={handleForgotPassword}>Forgot Password?</span>
        </div>
      </div>
      {isForgotModalOpen && (
        <div className="forgot-modal-overlay">
          <div className="forgot-modal-content">
            <h3 className="forgot-modal-title">Reset Your Password</h3>
            <p className="forgot-modal-description">
              Enter your email address to receive a password reset link.
            </p>

            <div className="forgot-input-group">
              <IoMailOutline className="forgot-icon" />
              <input
                type="email"
                placeholder="Enter your email"
                value={forgotEmail}
                onChange={handleForgotEmailChange}
                className="forgot-input"
              />
            </div>
            {logerror && (
              <span className="login-error-message">{logerror.message}</span>
            )}
            <div className="forgot-modal-actions">
              <button onClick={handleResetCancel} className="forgot-cancel-btn">
                Cancel
              </button>
              <button onClick={handleResetSubmit} className="forgot-ok-btn">
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
