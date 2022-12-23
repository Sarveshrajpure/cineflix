import { Link } from "react-router-dom";
import "./list.css";
import { Publish } from "@material-ui/icons";
import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getListById } from "../../apis/listsApis";
import { useState } from "react";

export default function List() {
  const [list, setList] = useState("");

  let listId = useParams();

  useEffect(() => {
    const getList = async () => {
      try {
        let response = await getListById(listId.id);
        setList(response);
        console.log(response);
      } catch (error) {}
    };

    getList();
  }, [listId.id]);
  console.log(listId);
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Edit List</h1>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productName">{list?.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <div className="productInfoKey">Id: </div>
              <div className="productInfoValue">{list._id}</div>
            </div>
            <div className="productInfoItem">
              <div className="productInfoKey">Genre:</div>
              <div className="productInfoValue">{list.genre}</div>
            </div>
            <div className="productInfoItem">
              <div className="productInfoKey">Type:</div>
              <div className="productInfoValue">{list.type}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Movie Title</label>
            <input type="text" placeholder={list.title} />
            <label>Type</label>
            <input type="text" placeholder={list.type} />
            <label>Genre</label>
            <input type="text" placeholder={list.genre} />
          </div>
          <div className="productFormRight">
            <button className="productButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
