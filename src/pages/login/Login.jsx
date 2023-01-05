import React, { useState, useRef } from "react";
import "./login.scss";
import logo from "../../assets/Cineflix.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../validations/loginValidations";
import { LoginUser } from "../../api/loginApis";
import { login_user } from "../../actions/userActions";
import PuffLoader from "react-spinners/PuffLoader";
import { removeTokenCookie } from "../../utilities/authTools";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });
  const submitForm = async (data, e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);

      let userCredentials = { email: data.email, password: data.password };
      let login = await LoginUser(userCredentials);

      if (login) {
        dispatch(login_user(login));
        setLoading(false);
        navigate("/", { state: { id: login._id } });
      }
    } catch (error) {
      setLoading(false);
      if (error.response.data) {
        setError(error.response.data.message);
      } else {
        setError(error.message);
      }
    }
  };
  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img className="registerLogo" src={logo} alt="" />
        </div>
      </div>
      <div className="container">
        <form onSubmit={handleSubmit(submitForm)}>
          <h1>Sign In</h1>
          <input
            name="email"
            type="email"
            placeholder="Email or phone number"
            {...register("email")}
          />

          {<div className="invalid-feedback">{errors.email?.message}</div>}
          <input
            name="password"
            type="password"
            placeholder="Password"
            {...register("password")}
          />

          {<div className="invalid-feedback">{errors.password?.message}</div>}

          {loading ? (
            <div className="loaderContainer">
              {" "}
              <PuffLoader color={"#FF0000"} size={30} />
            </div>
          ) : (
            <button className="loginButton">Sign In</button>
          )}

          {<div className="invalid-feedback">{error ? error : ""}</div>}

          <span
            onClick={() => {
              navigate("/register");
            }}
          >
            New to CineFlix <b>Sign up now.</b>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
