import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PlayArrow, Add, Done } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import { getAllSeasons } from "../../api/seasonApis.";
import { getAllEpisodes } from "../../api/episodeApis";
import SelectDropDown from "../../utilities/selectDropDown";
import EpisodeList from "./components/edpisodeList";
import "./listeitemdetails.scss";

const ListItemDetails = ({
  dialogOpen,
  setDialogOpen,
  content,
  inFavourites,
  handleAddToFavourite,
  handleRemoveFavourite,
}) => {
  const [scroll, setScroll] = useState("body");
  const [seasonList, setSeasonList] = useState([]);
  const [episodeList, setEpisodeList] = useState([]);
  const [selectSeason, setSelectSeason] = useState("");
  const navigate = useNavigate();
  const handleClose = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    const getSeasons = async () => {
      if (content.type === "series") {
        let response = await getAllSeasons({ contentId: content._id });
        setSelectSeason(response[0]._id);
        setSeasonList(response);
      }
    };
    getSeasons();
  }, [content._id, content.type]);

  useEffect(() => {
    const getEpisodes = async () => {
      if (content.type === "series" && selectSeason) {
        let response = await getAllEpisodes({ seasonId: selectSeason });

        setEpisodeList(response);
      }
    };
    getEpisodes();
  }, [content.type, selectSeason]);

  return (
    <Dialog
      className="listItemDetailsDialog"
      open={dialogOpen}
      onClose={handleClose}
      scroll={scroll}
      maxWidth="md"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <Link to="/watch" state={{ movie: content }}>
        <div className="imageVideoDialogContainer">
          <video src={content.trailer} muted />
        </div>
      </Link>

      <div className="dialogBodyContainer">
        <div className="iconsDialog">
          <div className="controls">
            <PlayArrow
              className="icon"
              onClick={() => {
                navigate("/watch", { state: { movie: content } });
              }}
            />
            {inFavourites.length > 0 ? (
              <Done
                className="icon"
                onClick={() => {
                  handleRemoveFavourite();
                }}
              />
            ) : (
              <Add
                className="icon"
                onClick={() => {
                  handleAddToFavourite();
                }}
              />
            )}
          </div>
        </div>

        <div className="dialogContentSummaryBlock">
          <div className="dialogContentDesc">{content.desc}</div>
          <div className="dialogContentInfo">
            <div className="dialogContentType">
              {content.type === "series" ? "Series" : "Movie"}
            </div>
            <div className="dialogContentItemInfoTop">
              {content.type === "series" ? (
                <span>
                  {seasonList?.length} Season{seasonList?.length > 1 ? "s" : ""}
                </span>
              ) : (
                <span>{content.duration}</span>
              )}

              <span className="limit">{content.limit}</span>
              <span>{content.year}</span>
            </div>

            <div className="dialogGenres">
              <ul>
                <li> {content.genre}</li>
              </ul>
            </div>
          </div>
        </div>
        {content.type === "series" ? (
          <div className="dialogSeasonsEpisodeConatainer">
            <div className="dialogSeasonDropDown">
              <div className="dialogEpisodesHeader">Episodes</div>
              <SelectDropDown
                option={selectSeason}
                setOption={(val) => {
                  setSelectSeason(val);
                }}
                list={seasonList}
              />
            </div>
            <div className="dialogEpisodeContainer">
              {episodeList.map((ele, index) => {
                return <EpisodeList item={ele} index={index} key={index} />;
              })}
            </div>
          </div>
        ) : null}
      </div>
    </Dialog>
  );
};

export default ListItemDetails;
