import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import ListSlider from "../../components/list/ListSlider";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Featured />
      <ListSlider />
      <ListSlider />
      <ListSlider />
    </div>
  );
};

export default Home;
