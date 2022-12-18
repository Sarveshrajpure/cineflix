import { useEffect } from "react";
import { useState } from "react";
import "./addContent.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addContentSchema } from "../../validations/contentValidation";

export default function NewProduct() {
  const {
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(addContentSchema),
  });
  const [content, setContent] = useState({
    title: "",
    desc: "",
    year: "",
    genre: "",
    duration: "",
    limit: "",
    type: null,
  });
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setvideo] = useState(null);

  const handleChange = (e) => {
    const value = e.target.value;

    setContent((prev) => {
      return { ...prev, [e.target.name]: value };
    });
  };

  const onSubmit = async () => {};
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Add content</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="img"
            name="img"
            onInput={(e) => setImg(e.target.files[0])}
            {...register("img")}
          />
          {errors.img ? (
            <div className="invalidFeedbackContent">{errors.img?.message}</div>
          ) : (
            ""
          )}
        </div>
        <div className="addProductItem">
          <label>Title Image</label>
          <input
            type="file"
            id="imgTitle"
            name="imgTitle"
            onChange={(e) => setImgTitle(e.target.files[0])}
            {...register("imgTitle")}
          />
          {errors.imgTitle ? (
            <div className="invalidFeedbackContent">
              {errors.imgTitle?.message}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="addProductItem">
          <label>Thumbnail Image</label>
          <input
            type="file"
            id="imageSm"
            name="imgSm"
            onChange={(e) => setImgSm(e.target.files[0])}
            {...register("imgSm")}
          />
          {errors.imgSm ? (
            <div className="invalidFeedbackContent">
              {errors.imgSm?.message}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="John wick"
            name="title"
            onChange={handleChange}
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
          <label>Description</label>
          <input
            type="text"
            placeholder="description"
            name="desc"
            onChange={handleChange}
            {...register("desc")}
          />{" "}
          {errors.desc ? (
            <div className="invalidFeedbackContent">{errors.desc?.message}</div>
          ) : (
            ""
          )}
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input
            type="text"
            placeholder="year"
            name="year"
            onChange={handleChange}
            {...register("year")}
          />{" "}
          {errors.year ? (
            <div className="invalidFeedbackContent">{errors.year?.message}</div>
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
            onChange={handleChange}
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
          <label>Duration</label>
          <input
            type="text"
            placeholder="duration"
            name="duration"
            onChange={handleChange}
            {...register("duration")}
          />{" "}
          {errors.duration ? (
            <div className="invalidFeedbackContent">
              {errors.duration?.message}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="addProductItem">
          <label>Limit</label>
          <input
            type="text"
            placeholder="limit"
            name="limit"
            onChange={handleChange}
            {...register("limit")}
          />{" "}
          {errors.limit ? (
            <div className="invalidFeedbackContent">
              {errors.limit?.message}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="addProductItem">
          <label>Type</label>
          <select
            name="type"
            id="type"
            onChange={handleChange}
            value={content.type}
            {...register("type")}
          >
            {errors.type ? (
              <div className="invalidFeedbackContent">
                {errors.type?.message}
              </div>
            ) : (
              ""
            )}
            <option defaultChecked value="null">
              Select content type
            </option>
            <option value="movie">Movie</option>
            <option value="series">Series</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Trailer</label>
          <input
            type="file"
            name="trailer"
            onChange={(e) => setTrailer(e.target.files[0])}
            {...register("trailer")}
          />
          {errors.trailer ? (
            <div className="invalidFeedbackContent">
              {errors.trailer?.message}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="addProductItem">
          <label>Video</label>
          <input
            type="file"
            name="video"
            onChange={(e) => setvideo(e.target.files[0])}
            {...register("video")}
          />
          {errors.video ? (
            <div className="invalidFeedbackContent">
              {errors.video?.message}
            </div>
          ) : (
            ""
          )}
        </div>
        <button className="addProductButton">Upload</button>
      </form>
    </div>
  );
}
