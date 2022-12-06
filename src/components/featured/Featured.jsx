import React, { useState } from "react";
import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import "./featured.scss";
import defaultLogo from "../../assets/stranger_thing_logo.png";
import { Fade } from "react-awesome-reveal";

const Featured = ({ type }) => {
  const [showDesc, setShowDesc] = useState(true);

  setTimeout(() => setShowDesc(false), 5000);
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movie" ? "Movies" : "Series"}</span>
          <select name="genre" id="genre">
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      <img
        src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/8a6a68144592045.628efcd3e77b5.jpg"
        alt=""
      />
      <div className="info">
        <Fade>
          <div className={`logoDesc${showDesc ? "" : " logoDescNone"}`}>
            <img src={defaultLogo} alt="" />

            <div className="desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
              adipisci repellendus eum quasi illo, velit numquam, maxime tempora
              sint deleniti, aliquid qui? Facilis, adipisci! Ratione hic
              repudiandae temporibus eum earum?
            </div>
          </div>
        </Fade>

        <div className="buttons">
          <button className="play">
            <PlayArrow />
            <span>Play</span>
          </button>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
