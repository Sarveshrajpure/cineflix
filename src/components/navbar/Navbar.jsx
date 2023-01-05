import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { signout_user } from "../../actions/userActions";
import { userSignOut } from "../../api/loginApis";
import { set_profile } from "../../actions/profileActions";
import Avatar from "react-avatar";
import "./navbar.scss";
import logo from "../../assets/Cineflix.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const profile = useSelector((state) =>
    state.Profile.selectedProfile.id ? state.Profile.selectedProfile : null
  );

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const handleSwitchProfiles = () => {
    navigate("/");
  };
  const handleLogout = () => {
    userSignOut();
    dispatch(signout_user());
    dispatch(set_profile({ id: null, name: null }));
    navigate("/login");
  };
  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img src={logo} alt="Logo" />
          <Link to="/" className="link">
            <span>Home</span>
          </Link>

          <Link to="/series" className="link">
            <span>Tv Shows</span>
          </Link>
          <Link to="/movies" className="link">
            <span>Movies</span>
          </Link>

          <span>New and Popular</span>
          <span>My List</span>
        </div>
        <div className="right">
          <Search className="icon" />

          <Notifications className="icon" />

          <Avatar
            name={profile.name}
            size={38}
            textSizeRatio={2.5}
            round="5px"
          />

          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span
                onClick={() => {
                  handleSwitchProfiles();
                }}
              >
                Switch Profile
              </span>
              <span
                onClick={() => {
                  handleLogout();
                }}
              >
                Logout
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
