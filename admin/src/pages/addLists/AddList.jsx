import { useState, useEffect } from "react";
import "./addList.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addListSchema } from "../../validations/listValidations";
import BarLoader from "react-spinners/BarLoader";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { get_movies } from "../../Actions/contentActions";
import { getAllContent } from "../../apis/contentApis";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { addList } from "../../apis/listsApis";

export default function AddList() {
  const dispatch = useDispatch();
  const movies = useSelector((state) =>
    state.Content.movies ? state.Content.movies : []
  );
  let history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(addListSchema),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let response = await getAllContent();
        console.log(response);
        dispatch(get_movies(response));
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovies();
  }, [dispatch]);

  const submitForm = async (data, e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let values = {
        title: data.title,
        type: data.type,
        genre: data.genre,
        content: data.content,
      };
      console.log(values);
      // eslint-disable-next-line no-unused-vars
      let response = await addList(values);
      setLoading(false);
      history.push("/lists");
      toast.success(`${data.title} list added!`);
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Add List</h1>
      <form className="addProductForm" onSubmit={handleSubmit(submitForm)}>
        <div className="formLeft">
          <div className="addProductItem">
            <label>Title</label>
            <input
              type="text"
              placeholder="Popular movies"
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
          </div>

          <div className="addProductItem">
            <label>Genre</label>
            <input
              type="text"
              placeholder="genre"
              name="genre"
              {...register("genre")}
            />{" "}
            {errors.genre ? (
              <div className="invalidFeedbackContent">
                {errors.genre?.message}
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="addProductItem">
            <label>Type</label>
            <select name="type" id="type" {...register("type")}>
              <option defaultChecked value="">
                Select content type
              </option>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
            </select>
            {errors.type ? (
              <div className="invalidFeedbackContent">
                {errors.type?.message}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="addProductItem">
          <label>Content</label>
          <select
            multiple={true}
            name="content"
            id="content"
            {...register("content")}
            style={{ height: "280px" }}
          >
            {movies.map((item, index) => {
              return (
                <option value={item._id} key={index}>
                  {item.title}
                </option>
              );
            })}
          </select>
          <small>
            CTRL + Right click or Right click hold and drag to select multiple
            down
          </small>
          {errors.content ? (
            <div className="invalidFeedbackContent">
              {errors.content?.message}
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="buttonContainer">
          {loading ? (
            <BarLoader color={"#00008B"} className="loader" />
          ) : (
            <button type="submit" className="addProductButton">
              Create
            </button>
          )}
        </div>
      </form>{" "}
      {error ? <div className="addListError">Error: {error} !</div> : ""}
    </div>
  );
}
