import React, { useState, useContext } from "react";
import "./login.css";
import { AuthContext } from "../../context/AuthContext.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

  return (
    <div className="login">
      <div className="container">
        <input
          type="text"
          placeholder="username"
          id="username"
          className="input"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="input"
          onChange={handleChange}
        />
        <button disabled={loading} className="button" onClick={handleClick}>
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
}

export default Login;
