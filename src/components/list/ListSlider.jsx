import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";
import { useRef, useState } from "react";
import ListItem from "../listitem/ListItem";
import "./listSlider.scss";

const ListSlider = ({ list }) => {
  const [showControls, setShowControls] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);
  const listRef = useRef();

  const handleDirection = (direction) => {
    let distance = listRef.current.getBoundingClientRect().x - 50;

    if (direction === "left" && sliderPosition > 0) {
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
      setSliderPosition(sliderPosition - 1);
    }

    if (direction === "right" && sliderPosition < 5) {
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
      setSliderPosition(sliderPosition + 1);
    }
  };
  return (
    <div
      className="listContainer"
      onMouseEnter={() => {
        setShowControls(true);
      }}
      onMouseLeave={() => {
        setShowControls(false);
      }}
    >
      <h1>{list.title}</h1>
      <div className="wrapper">
        <div
          className={`sliderAction left ${!showControls ? "none" : ""}`}
          onClick={() => handleDirection("left")}
        >
          <ArrowBackIosOutlined />
        </div>
        <div className="slider" ref={listRef}>
          {list.content.map((item, index) => (
            <ListItem key={index} index={index} item={item} />
          ))}
        </div>
        <div
          className={`sliderAction right ${!showControls ? "none" : ""}`}
          onClick={() => handleDirection("right")}
        >
          <ArrowForwardIosOutlined />
        </div>
      </div>
    </div>
  );
};

export default ListSlider;
