import { Link } from "react-router-dom";
import "./movie.css";
import { Publish } from "@material-ui/icons";
import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getMoviesById } from "../../apis/contentApis";
import { useState } from "react";

export default function Movie() {
  const [movie, setMovie] = useState("");

  let movieId = useParams();

  useEffect(() => {
    const getMovie = async () => {
      try {
        let response = await getMoviesById(movieId.id);
        setMovie(response);
        console.log(response);
      } catch (error) {}
    };

    getMovie();
  });
  console.log(movie);
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Edit Movie</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={movie.img} alt="" className="productInfoImg" />
            <span className="productName">{movie?.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <div className="productInfoKey">Id: </div>
              <div className="productInfoValue">{movie._id}</div>
            </div>
            <div className="productInfoItem">
              <div className="productInfoKey">Genre:</div>
              <div className="productInfoValue">{movie.genre}</div>
            </div>
            <div className="productInfoItem">
              <div className="productInfoKey">Year:</div>
              <div className="productInfoValue">{movie.year}</div>
            </div>
            <div className="productInfoItem">
              <div className="productInfoKey">Limit:</div>
              <div className="productInfoValue">{movie.limit}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Movie Title</label>
            <input type="text" placeholder={movie.title} />
            <label>Year</label>
            <input type="text" placeholder={movie.year} />
            <label>Genre</label>
            <input type="text" placeholder={movie.genre} />
            <label>Limit</label>
            <input type="text" placeholder={movie.limit} />
            <label>Trailer</label>
            <input type="text" placeholder={movie.trailer} />
            <label>Video</label>
            <input type="text" placeholder={movie.video} />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={movie.img} alt="" className="productUploadImg" />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="productButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
