import React, { useState } from "react";
import "./navbar.scss";
import logo from "../../assets/Cineflix.svg";
import profilePicDefault from "../../assets/profilepicDefault.svg";
import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img src={logo} alt="logo" />
          <span>Homepage</span>
          <span>Series</span>
          <span>Movies</span>
          <span>New and Popular</span>
          <span>My list</span>
        </div>
        <div className="right">
          <Search className="icon" />
          <span>KID</span>
          <Notifications className="icon" />
          <img src={profilePicDefault} alt="profilePic" />
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>Settings</span>
              <span>Log out</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
