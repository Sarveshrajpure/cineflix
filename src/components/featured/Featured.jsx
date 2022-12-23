import React, { useState, useEffect } from "react";
import { InfoOutlined, PlayArrow, RssFeed } from "@material-ui/icons";
import "./featured.scss";
import defaultLogo from "../../assets/stranger_thing_logo.png";
import { Fade } from "react-awesome-reveal";
import { getRandomContent } from "../../api/contentApis";

const Featured = ({ type }) => {
  const [showDesc, setShowDesc] = useState(true);
  const [content, setContent] = useState({});

  useEffect(() => {
    const getContent = async () => {
      try {
        let response = await getRandomContent(
          `${type ? `?contentType=${type}` : ""}`
        );
        setContent(response[0]);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    getContent();
  }, []);

  setTimeout(() => setShowDesc(false), 5000);
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : "Tv Shows"}</span>
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
      <img src={content.img} alt="" />
      <div className="info">
        <Fade>
          <div className={`logoDesc${showDesc ? "" : " logoDescNone"}`}>
            <img src={content.imgTitle} alt="" />

            <div className="desc">{content.desc}</div>
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
