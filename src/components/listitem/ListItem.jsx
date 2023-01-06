import "./listItem.scss";
import { PlayArrow, Add, Done, ExpandMore } from "@material-ui/icons";
import ListItemDetails from "../listitemdetails/listitemdetails";
import { useState, useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import { getContentById } from "../../api/contentApis";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { set_profile } from "../../actions/profileActions";
import { addToFavourite, removeFavourite } from "../../api/profileApis";

const ListItem = ({ item, index }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});
  const [inFavourites, setInFavourites] = useState([]);
  const [listItemDetailsOpen, setListItemDetailsOpen] = useState(false);

  const profile = useSelector((state) =>
    state.Profile.selectedProfile.id ? state.Profile.selectedProfile : null
  );

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

  useEffect(() => {
    const filterContentForFavourites = async () => {
      let favFiltered = profile.favourites.filter((ele) => {
        return ele === item;
      });

      setInFavourites(favFiltered);
    };

    filterContentForFavourites();
  }, [item, profile]);

  const handleAddToFavourite = async () => {
    let response = await addToFavourite({
      id: profile.id,
      contentId: item,
    });

    let favList = profile.favourites;
    favList.push(item);

    dispatch(
      set_profile({
        id: profile.id,
        name: profile.name,
        favourites: favList,
      })
    );
  };

  const handleRemoveFavourite = async () => {
    let response = await removeFavourite({
      id: profile.id,
      contentId: item,
    });

    let favFiltered = profile.favourites.filter((ele) => {
      return ele !== item;
    });

    dispatch(
      set_profile({
        id: profile.id,
        name: profile.name,
        favourites: favFiltered,
      })
    );
  };

  const handleHoverEffect = () => {
    if (listItemDetailsOpen) {
      setIsHovered(false);
    } else {
      setIsHovered(true);
    }
  };

  return (
    <>
      <div
        className="listItem"
        onMouseOver={() => {
          handleHoverEffect();
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
      >
        <img src={movie.imgSm} alt="" />

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
                    <PlayArrow
                      className="icon"
                      onClick={() => {
                        navigate("/watch", { state: { movie: movie } });
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
                  <div>
                    <ExpandMore
                      className="icon"
                      onClick={() => {
                        setListItemDetailsOpen(true);
                      }}
                    />
                  </div>
                </div>
                <div
                  onClick={() => {
                    setListItemDetailsOpen(true);
                  }}
                >
                  <div className="itemInfoTop">
                    <span>{movie.duration}</span>
                    <span className="limit">{movie.limit}</span>
                    <span>{movie.year}</span>
                  </div>

                  <div className="genres">
                    {movie.type === "series" ? "Series" : "Movie"}
                  </div>
                  {/* <div className="desc">{movie.desc}</div> */}
                  <div className="genres">
                    <ul>
                      <li> {movie.genre}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Fade>
          </div>
        )}

        {listItemDetailsOpen ? (
          <ListItemDetails
            dialogOpen={listItemDetailsOpen}
            setDialogOpen={(val) => {
              setListItemDetailsOpen(val);
              setIsHovered(false);
            }}
            content={movie}
            inFavourites={inFavourites}
            handleAddToFavourite={() => {
              handleAddToFavourite();
            }}
            handleRemoveFavourite={() => {
              handleRemoveFavourite();
            }}
          />
        ) : null}
      </div>
    </>
  );
};

export default ListItem;
