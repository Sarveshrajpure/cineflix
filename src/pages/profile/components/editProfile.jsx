import React, { useState, useEffect } from "react";
import ProfileThumb from "./profileThumb";
import { ArrowBack, Done, DeleteForever } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  editProfile,
  deleteProfile,
  getProfile,
} from "../../../api/profileApis";
import "./editProfile.scss";

const EditProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [profiles, setProfiles] = useState([]);
  const user = useSelector((state) =>
    state.User.loginInfo._id ? state.User.loginInfo : null
  );
  const [name, setName] = useState();

  const handleEditProfile = () => {
    navigate("/", { state: { id: user._id } });
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

  const saveProfile = async () => {
    if (name) {
      try {
        if (location?.state.name === name) {
        } else {
          let response = await editProfile({ name, id: location?.state.id });

          if (response) {
            navigate("/", { state: { id: user._id } });
          }
        }
      } catch (err) {}
    }
  };

  const deleteProfiles = async () => {
    try {
      let response = await deleteProfile({
        name,
        userId: user._id,
        id: location?.state.id,
      });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="editProfileContainer">
      <div className="editProfileHeader">
        <div
          className="editProfilesBtn"
          onClick={() => {
            handleEditProfile();
          }}
        >
          <ArrowBack className="editProfileIcons" /> Edit Profile
        </div>
        <div className="addDeleteProfileBlock">
          <div
            className="addProfilesBtn"
            onClick={() => {
              saveProfile();
            }}
          >
            <Done className="addProfileIcons" />
            Save
          </div>
          {profiles.length > 1 ? (
            <div
              className="addProfilesBtn"
              onClick={() => {
                deleteProfiles();
              }}
            >
              <DeleteForever className="deleteProfileIcons" />
              Delete
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="editProfileThumbHeaderBlock">
        <div className="editProfileThumbBlock">
          <div className="editProfileThumbInputBlock">
            <ProfileThumb name={location?.state.name} editState={false} />
            <div className="profileNameInputBlock">
              <input
                className="profileNameInput"
                defaultValue={location?.state.name}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
