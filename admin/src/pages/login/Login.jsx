import React, { useState, useContext } from "react";
import "./login.css";
import { AuthContext } from "../../context/AuthContext.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  IoMailOutline,
  IoLockClosedOutline,
  IoEyeOutline,
} from "react-icons/io5";

function Login() {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { dispatch, loading, error } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "LOGIN_START" });
      const res = await axios.post("auth/login", credentials);

      console.log(res.data);
      if (res.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });

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

  return (
    <div className="login-container-wrapper">
      <div className="screen-1">
        <div className="screen-1-content">
          <div className="email">
            <label htmlFor="email">Email Address</label>
            <div className="sec-2">
              {/* 3. Replaced IonIcon with IoMailOutline */}
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
              {/* 3. Replaced IonIcon with IoLockClosedOutline */}
              <IoLockClosedOutline />
              <input
                className="pas"
                type="password"
                name="password"
                id="password"
                placeholder="············"
                onChange={handleChange}
              />
              {/* 3. Replaced IonIcon with IoEyeOutline */}
              <IoEyeOutline className="show-hide" />
            </div>
          </div>

          <div className="login-button-container">
            <button disabled={loading} className="login" onClick={handleClick}>
              {loading ? "Logging in..." : "Login"}
            </button>
            {error && <span className="error">{error.message}</span>}
          </div>

          <div className="footer">
            <span onClick={handleRegister}>Sign up</span>
            <span>Forgot Password?</span>{" "}
            {/* You can add a handler for this too */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
