import React, { useState, useEffect } from "react";
import "./sidebar.css";
import {
  LineStyle,
  Movie,
  Theaters,
  ArrowBack,
  List,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import { signout_user } from "../../Actions/userActions";
import { useDispatch } from "react-redux";
import { removeTokenCookie } from "../../utilities/authTools";

export default function Sidebar() {
  const history = useHistory();
  const location = useLocation();

  const dispatch = useDispatch();
  const logoutUser = async () => {
    removeTokenCookie();
    dispatch(signout_user());
    history.push("/login");
  };

  useEffect(() => {
    setCurrentLocation(location.pathname);
  }, [location]);

  const [curentLocation, setCurrentLocation] = useState("home");

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li
                className={`sidebarListItem ${
                  curentLocation === "/home" ? "active" : ""
                }`}
              >
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/lists" className="link">
              <li
                className={`sidebarListItem ${
                  curentLocation === "/lists" ? "active" : ""
                }`}
              >
                <List className="sidebarIcon" />
                Lists - (Curate content)
              </li>
            </Link>
            <Link to="/movies" className="link">
              <li
                className={`sidebarListItem ${
                  curentLocation === "/movies" ? "active" : ""
                }`}
              >
                <Movie className="sidebarIcon" />
                Movies
              </li>
            </Link>
            <Link to="/series" className="link">
              <li
                className={`sidebarListItem ${
                  curentLocation === "/series" ? "active" : ""
                }`}
              >
                <Theaters className="sidebarIcon" />
                Series
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <ul className="sidebarList">
            <h3 className="sidebarTitle">Account</h3>
            <li className="sidebarListItem" onClick={logoutUser}>
              <ArrowBack />
              Log-out
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
