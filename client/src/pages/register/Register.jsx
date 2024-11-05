import React, { useRef } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const country = useRef();
  const phone = useRef();
  const city = useRef();

  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords dont match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        country: country.current.value,
        city: city.current.value,
        phone: phone.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("auth/register", user);

        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <div className="register">
      <div className="registerWrapper">
        {/* <div className="registerLeft">
          <h3 className="regiserLogo">Narensocial</h3>
          <span className="regiserDesc">
            Connect with friends and the world around you on Narensocial.
          </span>
        </div> */}
        <div className="registerRight">
          <form className="registerBox" onSubmit={handleClick}>
            <input
              type="text"
              placeholder="Username"
              className="registerInput"
              ref={username}
              required
            />
            <input
              type="email"
              placeholder="email"
              className="registerInput"
              ref={email}
              required
            />
            <input
              type="text"
              placeholder="country"
              className="registerInput"
              ref={country}
            />
            <input
              type="text"
              placeholder="city"
              className="registerInput"
              ref={city}
            />
            <input
              type="text"
              placeholder="phone"
              className="registerInput"
              ref={phone}
            />
            <input
              type="password"
              placeholder="password"
              className="registerInput"
              ref={password}
              required
            />
            <input
              type="password"
              placeholder="password again"
              className="registerInput"
              ref={passwordAgain}
              required
            />
            <button className="loginButton1">Sign Up</button>
            <button className="loginButton2" onClick={handleLogin}>
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
