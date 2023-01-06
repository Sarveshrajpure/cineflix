import "./addRemoveSeasons.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import {
  getAllseasonsByContentId,
  deleteSeasonById,
  addSeason,
} from "../../apis/seasonsApis";
import { addSeasonSchema } from "../../validations/seasonsValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DeleteOutline } from "@material-ui/icons";
import { DataGrid, GridToolbarFilterButton } from "@material-ui/data-grid";
import { toast } from "react-hot-toast";
import BarLoader from "react-spinners/BarLoader";
import { useHistory } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

export default function AddRemoveSeasons() {
  const [listContent, setListContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [content, setContent] = useState([]);
  const history = useHistory();

  let series = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(addSeasonSchema),
  });

  const clearAddSeasonForm = () => {
    document.getElementById("addSeasonForm").reset();
  };

  useEffect(() => {
    const getAllSeasons = async () => {
      try {
        setLoading(true);
        let resposne = await getAllseasonsByContentId({
          contentId: series.id,
        });
        setListContent(resposne);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    getAllSeasons();
  }, [series.id]);

  const handleDelete = async (id, type) => {
    try {
      if (series.id) {
        let response = await deleteSeasonById({
          seasonId: id,
        });

        let removeSeason = listContent.filter((season) => {
          return season._id !== id;
        });
        setListContent(removeSeason);

        toast.success("Season deleted!");
      }
    } catch (error) {
      toast.error("Error deleting season");
      console.log(error);
    }
  };

  const submitAddSeason = async (data, e) => {
    e.preventDefault();
    console.log(data);
    try {
      if (series.id) {
        setOpenDialog(false);
        setLoading(true);
        let dataToBeSent = {
          contentId: series.id,
          title: data.title,
        };

        let response = await addSeason(dataToBeSent);

        setListContent((prev) => [...prev, response]);
        toast.success("Season Added!");
        setLoading(false);
        clearAddSeasonForm();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (error.response.data) {
        toast.error(error.response.data.message);
      }
    }
  };

  const openModal = () => {
    let map = new Map();
    if (listContent) {
      for (let i = 0; i < listContent.length; i++) {
        map.set(listContent[i]._id, true);
      }

      let newArr = [];
      for (let i = 0; i < content.length; i++) {
        if (!map.has(content[i]._id)) {
          newArr.push(content[i]);
        }
      }

      setContent(newArr);
    }

    setOpenDialog(true);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    { field: "title", headerName: "Title", width: 120 },
    { field: "contentId", headerName: "Series Id", width: 250 },

    {
      field: "action",
      headerName: "Action",
      width: 120,
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
  console.log(listContent);
  return (
    <div className="addRemoveSeasons">
      <div className="addRemoveSeasonsTitleContainer">
        <h1 className="addRemoveSeasonsTitle">Add/Remove Seasons</h1>
      </div>

      <div className="addRemoveSeasonsAddButton">
        <button
          className="listItemAddButton"
          onClick={() => {
            openModal();
          }}
        >
          Add Seasons
        </button>
      </div>
      <div className="seasonsList">
        {!loading ? (
          <DataGrid
            rows={listContent[0] ? listContent : []}
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            rowsPerPageOptions={listContent}
            getRowId={(r) => r._id}
            components={{ Toolbar: GridToolbarFilterButton }}
          />
        ) : (
          <div className="seasonsListloaderContainer">
            <BarLoader color={"#008080"} />
          </div>
        )}
      </div>

      <Dialog
        aria-labelledby="dialog-title"
        aria-describedby="Add List Item"
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          // setContentTobeAddedinList([]);
          // setSelectContent([]);
        }}
        fullWidth="true"
        scroll="paper"
      >
        <DialogTitle id="dialog-title">Add Season</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(submitAddSeason)} id="addSeasonForm">
            <div className="addSeasonFormItem">
              <input
                className="addSeasonFormInput"
                placeholder="Title"
                name="title"
                {...register("title")}
              />
              {errors.title ? (
                <div className="addSeasonInvalidFeedback">
                  {errors.title?.message}
                </div>
              ) : (
                ""
              )}
              <input
                className="addSeasonFormInputContentId"
                name="contentId"
                value={series.id}
                {...register("contentId")}
              />
            </div>

            <button
              type="reset"
              className="addSeasonModalCancelButton"
              onClick={() => {
                setOpenDialog(false);
                clearAddSeasonForm();
              }}
            >
              Cancel
            </button>
            <button type="submit" className="addSeasonModalSubmitButton">
              Submit
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
