import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
import { AuthContext } from "../../context/AuthContex.js";

function Login() {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const navigate = useNavigate();

  const { loading, error, dispatch } = useContext(AuthContext);

  const handleClick = async (e) => {
    e.preventDefault();
   
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post(
        "https://mern-ticketbooking-api.vercel.app/api/auth/login",
        credentials
      );
     // console.log(res.data);
     // dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/");
    } catch (error) {
     // dispatch({ type: "LOGIN_FAILURE", payload: error.res.data });
    }
  };

  const handleRequest = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="user name"
          id="username"
          onChange={handleRequest}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="lInput"
          onChange={handleRequest}
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        <button disabled={loading} onClick={handleRegister} className="lButton">
          Register
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
}

export default Login;
