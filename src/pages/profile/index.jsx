import React, { useState, useEffect } from "react";
import { Edit, Close, Add } from "@material-ui/icons";
import "./profile.scss";
import logo from "../../assets/Cineflix.svg";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../api/profileApis";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { set_profile } from "../../actions/profileActions";
import ProfileThumb from "./components/profileThumb";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [editProfile, setEditProfile] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const user = useSelector((state) =>
    state.User.loginInfo._id ? state.User.loginInfo : null
  );
  const handleAddProfile = () => {
    navigate("/addProfile");
  };

  useEffect(() => {
    const getProfiles = async () => {
      let response = await getProfile({ id: user._id });
      if (response) {
        setProfiles(response);
      }
    };

    getProfiles();
  }, [user._id]);

  const handleSelectProfile = (id, name) => {
    dispatch(set_profile(id, name));
    navigate("/home");
  };

  return (
    <div className="profileContainer">
      <div className="profileHeader">
        <div className="logoContainer">
          <img src={logo} alt="Logo" />
        </div>
        <div
          className="editDoneProfilesBtn"
          onClick={() => {
            setEditProfile((prev) => !prev);
          }}
        >
          {editProfile ? (
            <>
              <Close />
              Done
            </>
          ) : (
            <>
              <Edit />
              Manage
            </>
          )}
        </div>
      </div>

      <div className="profileThumbHeaderBlock">
        <div className="profileEditStateHeader">
          {editProfile ? "Manage Profiles" : "Who's watching?"}
        </div>
        <div className="profileThumbBlock">
          {profiles.map((item, index) => {
            return (
              <ProfileThumb
                name={item.name}
                id={item._id}
                editState={editProfile}
                key={index}
                handleSelect={() => {
                  handleSelectProfile({ id: item._id, name: item.name });
                }}
              />
            );
          })}
          {profiles.length > 0 && profiles.length < 5 ? (
            <div
              className="addProfileBtn"
              onClick={() => {
                handleAddProfile();
              }}
            >
              <Add />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
