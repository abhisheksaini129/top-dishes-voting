import React, { useState } from "react";
import "../Style/Login.css";
import { useNavigate } from "react-router-dom";
import user from "../database/users.json";
import logo from "../database/images/dish-logo.jpg";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  let loginFlag = localStorage.getItem("login");
  function handleLogin() {
    if (username && password) {
      let result = user.filter(
        (user) => user.username === username && user.password === password
      );
      if (result.length > 0) {
        localStorage.setItem("login", true);
        navigate("/home");
      } else {
        alert("Username or Password is incorrect");
      }
    } else {
      alert("Attention, some fields are missing");
    }
  }

  
  ///after login suucessfully, if someone again want to access login page using url address without logout
  if (loginFlag) {
    setTimeout(() => {
      navigate("/home");
    }, 500);
  }
  return (
    <div className="login-container">
      <h1>Vote for Your favorite dish 🍽️</h1>
      <div className="form-box">
        <div className="logo-container">
          <img className="logo-img" src={logo} alt="dish-logo" />
        </div>
        <div className="info-container email">
          <label className="label">Username</label>
          <input
            className="input-container name"
            onChange={(e) => setUsername(e.target.value.toLowerCase())}
            type="email"
          />
        </div>
        <div className="info-container password">
          <label className="label">Password</label>
          <input
            className="input-container paswrd"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </div>
        <button className="sign-in" onClick={handleLogin}>
          LogIn
        </button>
      </div>
    </div>
  );
};

export default Login;
