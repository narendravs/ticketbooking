import React, { useState, useContext } from "react";
import "./login.css";
import { AuthContext } from "../../context/AuthContex";
import { useNavigate } from "react-router-dom";
import {
  IoMailOutline,
  IoLockClosedOutline,
  IoEyeOutline,
} from "react-icons/io5";
import useFetch from "../../hooks/useFetch";
function Login() {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const navigate = useNavigate();

  const { loading, error, dispatch } = useContext(AuthContext);
  const { postData } = useFetch("/auth/login");

  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [logerror, setError] = useState(null);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "LOGIN_START" });
      const data = await postData(credentials);
      console.log(data);
      if (data) {
        dispatch({ type: "LOGIN_SUCCESS", payload: data });
        navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed!" },
        });
      }
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error });
    }
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
        `Password reset link has been sent to ${forgotEmail}. Please check your email.`
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
              type="password"
              name="password"
              id="password"
              placeholder="············"
              onChange={handleChange}
            />
            <IoEyeOutline className="show-hide" />
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
