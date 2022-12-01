import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import React from "react";
import "./featured.scss";

const featured = ({ type }) => {
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
            <option value="roamnce">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentry">Documentry</option>
          </select>
        </div>
      )}
      <img
        width="100%"
        src="https://images.pexels.com/photos/2061678/pexels-photo-2061678.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="featured"
      />
      <div className="info">
        <img
          src="https://images.pexels.com/photos/3408354/pexels-photo-3408354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <span className="desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, sunt
          necessitatibus. Exercitationem saepe accusamus magnam nostrum nisi
          maxime cupiditate modi a maiores commodi, alias quaerat, beatae
          mollitia quae cum. Voluptas?
        </span>
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

export default featured;
