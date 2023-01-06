import React from "react";
import { Link } from "react-router-dom";
import "./episodeList.scss";

const EdpisodeList = ({ item, index }) => {
  console.log(item);
  return (
    <div className="episodeListBlock">
      <div className="episodeListSrno">{index + 1}</div>

      <Link to="/watch" state={{ movie: item }}>
        <div className="episodeListVideoPreview">
          <video src={item.video} muted />
        </div>
      </Link>

      <div className="episodeListTitleDescBlock">
        <div className="episodeListTitle">{item.title}</div>
        <div className="episodeListDesc">{item.desc}</div>
      </div>
    </div>
  );
};

export default EdpisodeList;
