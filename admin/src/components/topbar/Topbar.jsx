import React from "react";
import "./topbar.css";
import profilePic from "../../assets/profilepicDefault.svg";
import { useSelector } from "react-redux";

export default function Topbar() {
  const user = useSelector((state) =>
    state.User.loginInfo._id ? state.User.loginInfo : ""
  );
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">CineFlix CMS</span>
        </div>
        <div className="topRight">
          <p className="userName">{user.email}</p>
          <img src={profilePic} alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
