import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import ListSlider from "../../components/list/ListSlider";
import { getRandomLists } from "../../api/listApis";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getLists = async () => {
      try {
        let response = await getRandomLists(
          `${type ? "?contentType=" + type : ""}${
            genre ? "&genreType=" + genre : ""
          }`
        );
        setLists(response);
      } catch (error) {
        console.log(error);
      }
    };
    getLists();
  }, [type, genre]);
  return (
    <div className="home">
      <Navbar />
      <Featured type={type} />
      {lists.map((list, index) => (
        <ListSlider key={index} list={list} />
      ))}
    </div>
  );
};

export default Home;
