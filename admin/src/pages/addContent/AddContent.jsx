import { useState } from "react";
import "./addContent.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  addContentSchema,
  createContentSchema,
} from "../../validations/contentValidations";
import { storage } from "../../utilities/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addContent } from "../../apis/contentApis";
import { useEffect } from "react";
import BarLoader from "react-spinners/BarLoader";
import toast from "react-hot-toast";
import { v4 } from "uuid";
import { useHistory } from "react-router-dom";

export default function NewProduct() {
  let history = useHistory();
  const {
    register,
    handleSubmit,
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
    type: "",
  });
  const [uploaded, setUploaded] = useState(0);
  const [dataToBeUploaded, setDataToBeUploaded] = useState({});
  const [contentCreationStatus, setContentCreationStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;

    setContent((prev) => {
      return { ...prev, [e.target.name]: value };
    });
  };

  const uploadContent = (items, data) => {
    setContentCreationStatus("Uploading Files..");
    let formData = {
      title: data.title,
      desc: data.desc,
      year: data.year,
      limit: data.limit,
      duration: data.duration,
      genre: data.genre,
      type: data.type,
    };
    setDataToBeUploaded(formData);
    items.forEach((item) => {
      const storageRef = ref(storage, `Content/${item.file.name + v4()}`);
      const uploadTask = uploadBytesResumable(storageRef, item.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (err) => {
          setLoading(false);
          console.log(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setDataToBeUploaded((prev) => {
              return { ...prev, [item.label]: url };
            });

            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const submitForm = (data, e) => {
    e.preventDefault();
    try {
      setLoading(true);

      let filesToBeUploaded = [
        { file: data.img[0], label: "img" },
        { file: data.imgTitle[0], label: "imgTitle" },
        { file: data.imgSm[0], label: "imgSm" },
        { file: data.trailer[0], label: "trailer" },
        { file: data.video[0], label: "video" },
      ];

      uploadContent(filesToBeUploaded, data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const createContent = async () => {
      try {
        setContentCreationStatus("Creating new content...");

        if (uploaded === 5) {
          console.log("in uploaded effect if");
          let data = await createContentSchema.validate(dataToBeUploaded);

          if (data) {
            let response = await addContent(data);
            console.log(response);

            if (response) {
              setContentCreationStatus("");
              setLoading(false);
              history.push("/movies");
              toast.success("Content Added!");
            }
          }
        }
      } catch (error) {
        setContentCreationStatus("");
        setLoading(false);
        console.log(error);
      }
    };
    createContent();
  }, [dataToBeUploaded, history, uploaded]);
  console.log(content);

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Add content</h1>
      <form className="addProductForm" onSubmit={handleSubmit(submitForm)}>
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="img" name="img" {...register("img")} />
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
          <input type="file" id="imageSm" name="imgSm" {...register("imgSm")} />
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
            onInput={handleChange}
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
            onInput={handleChange}
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
            onInput={handleChange}
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
            onInput={handleChange}
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
            onInput={handleChange}
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
            onInput={handleChange}
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
            onInput={handleChange}
            {...register("type")}
          >
            <option defaultChecked value="">
              Select content type
            </option>
            <option value="movie">Movie</option>
            <option value="series">Series</option>
          </select>{" "}
          {errors.type ? (
            <div className="invalidFeedbackContent">{errors.type?.message}</div>
          ) : (
            ""
          )}
        </div>
        <div className="addProductItem">
          <label>Trailer</label>
          <input type="file" name="trailer" {...register("trailer")} />
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
          <input type="file" name="video" {...register("video")} />
          {errors.video ? (
            <div className="invalidFeedbackContent">
              {errors.video?.message}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="buttonContainer">
          {loading ? (
            <>
              <BarLoader color={"#00008B"} className="loader" />
              <p className="uploadStatus">
                {contentCreationStatus ? contentCreationStatus : ""}
              </p>
            </>
          ) : (
            <button type="submit" className="addProductButton">
              Upload
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
