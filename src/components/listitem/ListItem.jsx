import "./listItem.scss";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from "@material-ui/icons";
import { useState, useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import { getContentById } from "../../api/contentApis";
import { Link } from "react-router-dom";

const ListItem = ({ item, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getMovies = async () => {
      try {
        let response = await getContentById(item);
        setMovie(response);
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
  }, []);
  return (
    <>
      <div
        className="listItem"
        onMouseOver={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
      >
        <img src={movie.img} alt="" />

        {isHovered && (
          <div className="hover">
            <Fade>
              <Link to="/watch" state={{ movie: movie }}>
                <div className="imageVideoContainer">
                  <img src={movie.img} alt="" />
                  <video src={movie.trailer} autoPlay loop muted />
                </div>
              </Link>
              <div className="infoContainer">
                {/* <h3 className="name">Name</h3> */}
                <div className="icons">
                  <div className="controls">
                    <PlayArrow className="icon" />

                    <Add className="icon" />

                    <ThumbUpAltOutlined className="icon" />

                    <ThumbDownOutlined className="icon" />
                  </div>
                </div>
                <div className="itemInfoTop">
                  <span>{movie.duration}</span>
                  <span className="limit">{movie.limit}</span>
                  <span>{movie.year}</span>
                </div>
                <div className="desc">{movie.desc}</div>
                <div className="genres">
                  <ul>
                    <li> {movie.genre}</li>
                  </ul>
                </div>
              </div>
            </Fade>
          </div>
        )}
      </div>
    </>
  );
};

export default ListItem;
