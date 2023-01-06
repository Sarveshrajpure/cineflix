import { ArrowBackOutlined } from "@material-ui/icons";
import React, { useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import "./watch.scss";

const Watch = () => {
  const playerRef = useRef(null);
  const location = useLocation();

  let videoLink = location.state?.movie;

  return (
    <div className="watch">
      <div className="back">
        <Link to="/home" className="link">
          <ArrowBackOutlined className="backIcon" />
        </Link>
      </div>
      <video
        className="video"
        autoPlay
        progresss="true"
        muted
        controls
        ref={playerRef}
        id="videoPlayer"
        src={videoLink.video}
      />
    </div>
  );
};

export default Watch;
