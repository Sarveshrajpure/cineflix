import "./listItem.scss";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from "@material-ui/icons";
import { useState } from "react";
import { Fade } from "react-awesome-reveal";

const ListItem = ({ index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const trailer =
    "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";
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
        <img
          src="https://occ-0-1723-92.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABU7D36jL6KiLG1xI8Xg_cZK-hYQj1L8yRxbQuB0rcLCnAk8AhEK5EM83QI71bRHUm0qOYxonD88gaThgDaPu7NuUfRg.jpg?r=4ee"
          alt=""
        />

        {isHovered && (
          <div className="hover">
            <Fade>
              <div className="imageVideoContainer">
                <img
                  src="https://occ-0-1723-92.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABU7D36jL6KiLG1xI8Xg_cZK-hYQj1L8yRxbQuB0rcLCnAk8AhEK5EM83QI71bRHUm0qOYxonD88gaThgDaPu7NuUfRg.jpg?r=4ee"
                  alt=""
                />
                <video src={trailer} autoPlay loop muted />
              </div>
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
                  <span>1 hour 14 mins</span>
                  <span className="limit">+16</span>
                  <span>1999</span>
                </div>
                <div className="desc">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Praesentium hic rem eveniet error possimus, neque ex
                  doloribus.
                </div>
                <div className="genres">
                  <ul>
                    <li> Action</li>
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
