import React from "react";
import Avatar from "react-avatar";
import { useNavigate } from "react-router-dom";
import { Edit } from "@material-ui/icons";
import "./profileThumb.scss";

const ProfileThumb = ({ name, editState, id, handleSelect }) => {
  const navigate = useNavigate();
  const handleEditProfile = () => {
    navigate("/editProfile", { state: { id: id, name: name } });
  };
  return (
    <div
      className="profileThumbContainer"
      onClick={() => {
        if (!editState) {
          handleSelect();
        }
      }}
    >
      <div
        className="profileThumbBtn"
        onClick={() => {
          console.log("profile clicked");
        }}
      >
        {editState ? (
          <div
            className="profileSettingsIconBlock"
            onClick={() => {
              handleEditProfile();
            }}
          >
            <div className="blurBlock"></div>
            <Edit className="profileSettingsIcon" />
          </div>
        ) : (
          ""
        )}
        <div className="profileThumbAvatar">
          <Avatar name={name} />
        </div>
      </div>
      <div className="profileName">{name}</div>
    </div>
  );
};

export default ProfileThumb;
