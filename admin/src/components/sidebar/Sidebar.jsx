import React from "react";
import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  Movie,
  Theaters,
  ArrowBack,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { signout_user } from "../../Actions/userActions";
import { useDispatch } from "react-redux";
import { removeTokenCookie } from "../../utilities/authTools";

export default function Sidebar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const logoutUser = async () => {
    removeTokenCookie();
    dispatch(signout_user());
    history.push("/login");
  };
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/movies" className="link">
              <li className="sidebarListItem">
                <Movie className="sidebarIcon" />
                Movies
              </li>
            </Link>
            <Link to="/series" className="link">
              <li className="sidebarListItem">
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
