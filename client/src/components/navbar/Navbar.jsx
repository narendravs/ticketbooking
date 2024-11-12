import React, { useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContex";
import "./navbar.css";

function Navbar() {
const { user } = useContext(AuthContext);
    const navigate = useNavigate();

const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">ticketbooking</span>
        </Link>
        {user ? (
         <div className="navUser">
            <p className="navFont">{user.username}</p>
            <button className="navButton" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="navItems">
            <button className="navButton" onClick={handleRegister}>Register</button>
            <button className="navButton" onClick={handleLogin}>Login</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
