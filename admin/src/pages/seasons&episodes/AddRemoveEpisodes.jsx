import { useState } from "react";
import "./addRemoveEpisodes.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  addEpisodeFilesSchema,
  createEpisodeSchema,
} from "../../validations/episodesValidations";
import { useParams } from "react-router-dom";
import { storage } from "../../utilities/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getEpisodes, addEpisode, deleteEpisode } from "../../apis/episodeApis";
import { getAllseasonsById } from "../../apis/seasonsApis";
import { useEffect } from "react";
import BarLoader from "react-spinners/BarLoader";
import toast from "react-hot-toast";
import { v4 } from "uuid";
import { useSelector } from "react-redux";
import { DeleteOutline } from "@material-ui/icons";
import { DataGrid, GridToolbarFilterButton } from "@material-ui/data-grid";

export default function AddRemoveEpisodes() {
  let seriesSeason = useParams();

  const seriesInfo = useSelector((state) =>
    state.Content.series ? state.Content.series : []
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(addEpisodeFilesSchema),
  });

  const [uploaded, setUploaded] = useState(0);
  const [dataToBeUploaded, setDataToBeUploaded] = useState({});
  const [contentCreationStatus, setContentCreationStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [getEpisodesLoader, setGetEpisodesLoader] = useState(false);
  const [seriesDetails, setSeriesDetails] = useState([]);
  const [seasonDetails, setSeasonDetails] = useState("");
  const [episodeList, setEpisodeList] = useState([]);

  useEffect(() => {
    let seriesFilter = seriesInfo.filter((item) => {
      return item._id === seriesSeason.cid;
    });

    setSeriesDetails(seriesFilter);
  }, [seriesInfo, seriesSeason]);

  useEffect(() => {
    const fectchSeason = async () => {
      try {
        let response = await getAllseasonsById({ id: seriesSeason.id });

        setSeasonDetails(response);
      } catch (error) {
        console.log(error);
      }
    };
    fectchSeason();
  }, [seriesSeason]);

  const uploadContent = (items, data) => {
    setContentCreationStatus("Uploading Files..");
    let formData = {
      seasonId: data.seasonId,
      title: data.title,
      desc: data.desc,
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

      let filesToBeUploaded = [{ file: data.video[0], label: "video" }];

      uploadContent(filesToBeUploaded, data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const createEpisode = async () => {
      try {
        setContentCreationStatus("Creating new content...");

        if (uploaded === 1) {
          console.log("in uploaded effect if");
          let data = await createEpisodeSchema.validate(dataToBeUploaded);

          if (data) {
            let response = await addEpisode(data);

            if (response) {
              setContentCreationStatus("");
              reset();
              setLoading(false);
              toast.success("Episode Added!");
              setEpisodeList((prev) => [...prev, response]);
            }
          }
        }
      } catch (error) {
        setContentCreationStatus("");
        setLoading(false);
        console.log(error);
      }
    };
    createEpisode();
  }, [dataToBeUploaded, reset, uploaded]);

  const handleDelete = async (id) => {
    try {
      if (seriesSeason.id) {
        // eslint-disable-next-line no-unused-vars
        let response = await deleteEpisode({
          id: id,
        });

        let removeSeason = episodeList.filter((episode) => {
          return episode._id !== id;
        });
        setEpisodeList(removeSeason);

        toast.success("Episode deleted!");
      }
    } catch (error) {
      toast.error("Error deleting Episode");
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        setGetEpisodesLoader(true);
        let response = await getEpisodes({ seasonId: seriesSeason.id });
        setEpisodeList(response);
        setGetEpisodesLoader(false);
      } catch (error) {
        console.log(error);
        setGetEpisodesLoader(false);
      }
    };
    fetchEpisodes();
  }, [seriesSeason.id]);

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    { field: "seasonId", headerName: "", width: 250 },
    { field: "title", headerName: "Title", width: 120 },
    { field: "desc", headerName: "Description", width: 250 },

    {
      field: "action",
      headerName: "Action",
      width: 220,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline
              className="movieListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Add/Remove Episodes</h1>
      <h3 className="addProductTitle">
        Series title: {seriesDetails[0]?.title}
      </h3>
      <h3 className="addProductTitle">Season: {seasonDetails?.title}</h3>
      <form className="addProductForm" onSubmit={handleSubmit(submitForm)}>
        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="John wick"
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

          <input
            type="text"
            name="seasonId"
            value={seriesSeason.id}
            {...register("seasonId")}
            className="seasonIdHidden"
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            type="text"
            placeholder="description"
            name="desc"
            {...register("desc")}
          />{" "}
          {errors.desc ? (
            <div className="invalidFeedbackContent">{errors.desc?.message}</div>
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
      <div className="addRemoveEpisodeBottom">
        <div className="episodeList">
          {!getEpisodesLoader ? (
            <DataGrid
              rows={episodeList[0] ? episodeList : []}
              disableSelectionOnClick
              columns={columns}
              pageSize={8}
              rowsPerPageOptions={episodeList}
              getRowId={(r) => r._id}
              components={{ Toolbar: GridToolbarFilterButton }}
            />
          ) : (
            <div className="seasonsListloaderContainer">
              <BarLoader color={"#008080"} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
