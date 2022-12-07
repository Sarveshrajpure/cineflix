import React, { useState, useRef } from "react";
import "./login.scss";
import logo from "../../assets/Cineflix.svg";

const Login = () => {
  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img className="registerLogo" src={logo} alt="" />
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Sign In</h1>
          <input type="email" placeholder="Email or phone number" />
          <input type="password" placeholder="Password" />
          <button className="loginButton">Sign In</button>
          <span>
            New to CineFlix <b>Sign up now.</b>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
