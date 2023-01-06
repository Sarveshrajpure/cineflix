import "./movie.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getMoviesById } from "../../apis/contentApis";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateContentSchema } from "../../validations/contentValidations";
import toast from "react-hot-toast";
import { updateContent } from "../../apis/contentApis";
import BarLoader from "react-spinners/BarLoader";

export default function Movie() {
  const [movie, setMovie] = useState("");
  const [loading, setLoading] = useState(false);
  const [movieUpdate, setMovieUpdate] = useState(false);

  let movieId = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(updateContentSchema),
  });

  useEffect(() => {
    const getMovie = async () => {
      try {
        let response = await getMoviesById(movieId.id);
        setMovie(response);
        console.log(response);
      } catch (error) {}
    };

    getMovie();
  }, [movieId.id, movieUpdate]);

  const submitForm = async (data, e) => {
    e.preventDefault();
    console.log(data);
    try {
      setLoading(true);
      // eslint-disable-next-line no-unused-vars
      let response = await updateContent(data);
      setLoading(false);
      reset();
      toast.success("Movie Updated!");
      setMovieUpdate((prev) => !prev);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Edit Movie</h1>
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
        <form className="productForm" onSubmit={handleSubmit(submitForm)}>
          <div className="productFormLeft">
            <label>Movie Title</label>
            <input
              className="updateMovieFormInput"
              type="text"
              placeholder={movie.title}
              name="title"
              {...register("title")}
            />
            {errors.title ? (
              <div className="invalidFeedbackContent">
                {errors.title?.message}
              </div>
            ) : (
              ""
            )}
            <label>Description</label>
            <textarea
              type="textArea"
              placeholder={movie.desc}
              name="desc"
              {...register("desc")}
            />
            {errors.desc ? (
              <div className="invalidFeedbackContent">
                {errors.desc?.message}
              </div>
            ) : (
              ""
            )}

            <label>Year</label>
            <input
              className="updateMovieFormInput"
              type="text"
              placeholder={movie.year}
              name="year"
              {...register("year")}
            />
            {errors.year ? (
              <div className="invalidFeedbackContent">
                {errors.year?.message}
              </div>
            ) : (
              ""
            )}
            <label>Genre</label>
            <input
              className="updateMovieFormInput"
              type="text"
              placeholder={movie.genre}
              name="genre"
              {...register("genre")}
            />
            {errors.genre ? (
              <div className="invalidFeedbackContent">
                {errors.genre?.message}
              </div>
            ) : (
              ""
            )}
            <label>Limit</label>
            <input
              className="updateMovieFormInput"
              type="text"
              placeholder={movie.limit}
              name="limit"
              {...register("limit")}
            />
            {errors.limit ? (
              <div className="invalidFeedbackContent">
                {errors.limit?.message}
              </div>
            ) : (
              ""
            )}
            <label>Trailer</label>
            <input
              className="updateMovieFormInput"
              type="text"
              placeholder={movie.trailer}
              name="trailer"
              {...register("trailer")}
            />
            {errors.trailer ? (
              <div className="invalidFeedbackContent">
                {errors.trailer?.message}
              </div>
            ) : (
              ""
            )}
            <label>Video</label>
            <input
              className="updateMovieFormInput"
              type="text"
              placeholder={movie.video}
              name="video"
              {...register("video")}
            />
            {errors.video ? (
              <div className="invalidFeedbackContent">
                {errors.video?.message}
              </div>
            ) : (
              ""
            )}

            <input
              className="updateMovieHiddenInput"
              type="text"
              name="type"
              value={"movie"}
              {...register("type")}
            />

            <input
              className="updateMovieHiddenInput"
              type="text"
              name="id"
              value={movieId.id}
              {...register("id")}
            />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={movie.img} alt="" className="productUploadImg" />

              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            {loading ? (
              <BarLoader color={"#00008B"} className="loader" />
            ) : (
              <button type="submit" className="productButton">
                Update
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
