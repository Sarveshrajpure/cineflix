import React, { useState } from "react";
import ProfileThumb from "./profileThumb";
import { ArrowBack, Done } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { addProfile } from "../../../api/profileApis";
import "./addProfile.scss";

const AddProfile = () => {
  const navigate = useNavigate();
  const user = useSelector((state) =>
    state.User.loginInfo._id ? state.User.loginInfo : null
  );
  const [name, setName] = useState();
  const handleAddProfile = () => {
    navigate("/", { state: { id: user._id } });
  };

  const addProfiles = async () => {
    try {
      console.log(name);
      let response = await addProfile({ name, id: user._id });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="addProfileContainer">
      <div className="addProfileHeader">
        <div
          className="addProfilesBtn"
          onClick={() => {
            handleAddProfile();
          }}
        >
          <ArrowBack className="addProfileIcons" /> Add Profile
        </div>
        <div
          className="addProfilesBtn"
          onClick={() => {
            addProfiles();
          }}
        >
          <Done className="addProfileIcons" />
          Save
        </div>
      </div>

      <div className="addProfileThumbHeaderBlock">
        <div className="addProfileThumbBlock">
          <div className="addProfileThumbInputBlock">
            <ProfileThumb name={name} editState={false} />
            <div className="profileNameInputBlock">
              <input
                className="profileNameInput"
                placeholder="Enter Profile Name"
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

export default AddProfile;
