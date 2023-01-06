import React from "react";
import Navbar from "../../components/navbar/Navbar";
import ListItem from "../../components/listitem/ListItem";
import { useSelector } from "react-redux/es/exports";
import "./mylist.scss";

const MyList = () => {
  const profile = useSelector((state) =>
    state.Profile.selectedProfile.id ? state.Profile.selectedProfile : null
  );

  return (
    <div className="myListContainer">
      <Navbar />

      <div className="contentMyListContainer">
        <div className="contentMyListHeader">My List</div>
        {profile.favourites.length > 0 ? (
          <div className="contentMyListBlock">
            {profile.favourites.map((item, index) => (
              <ListItem key={index} index={index} item={item} />
            ))}
          </div>
        ) : (
          <div className="myListEmptyMessage">My List is empty.</div>
        )}
      </div>
    </div>
  );
};

export default MyList;
