import React, { useState } from "react";
import "./login.scss";
import AdminPic from "../../assets/profilepicDefault.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../validations/loginValidations";
import { loginUser } from "../../apis/userApis";
import BarLoader from "react-spinners/BarLoader";
import { useDispatch } from "react-redux";
import { login_user } from "../../Actions/userActions";
import { useHistory } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
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
      let login = await loginUser(userCredentials);
      dispatch(login_user(login));
      setLoading(false);
      history.push("/");
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
      <div className="loginContainer">
        <div className="loginTitle">
          <img src={AdminPic} alt="admin pic" className="adminLogo" />
          Admin Login
        </div>
        <form className="loginForm" onSubmit={handleSubmit(submitForm)}>
          <div className="inputContainer">
            <input
              type="email"
              placeholder="email"
              className="loginInput"
              name="email"
              {...register("email")}
            />
            {<div className="invalid-feedback">{errors.email?.message}</div>}
          </div>
          <div className="inputContainer">
            <input
              type="password"
              placeholder="password"
              className="loginInput"
              name="password"
              {...register("password")}
            />
            {<div className="invalid-feedback">{errors.password?.message}</div>}
          </div>

          {loading ? (
            <BarLoader color={"#008080"} />
          ) : (
            <button type="submit" className="loginButton">
              Login
            </button>
          )}
          {<div className="invalid-feedback">{error ? error : ""}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;
