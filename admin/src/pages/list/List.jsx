import "./list.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { addListItems, getListById } from "../../apis/listsApis";
import { useState } from "react";
import { getMovies, getSeries, getMoviesById } from "../../apis/contentApis";
import { deleteListItem } from "../../apis/listsApis";
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
  Checkbox,
  FormControlLabel,
} from "@mui/material";

export default function List() {
  const [list, setList] = useState("");
  const [listContent, setListContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [content, setContent] = useState([]);
  const [contentTobeAddedInList, setContentTobeAddedinList] = useState([]);
  const [selectedContent, setSelectContent] = useState([]);
  const history = useHistory();

  let listId = useParams();

  const handleDelete = async (id, type) => {
    try {
      if (list._id) {
        let response = await deleteListItem({ id: list._id, contentId: id });

        let addMovieToContent = listContent.filter((movie) => {
          return movie._id === id;
        });
        console.log(addMovieToContent);

        setContent((prev) => [...prev, addMovieToContent[0]]);

        let removeMovie = listContent.filter((movie) => {
          return movie._id !== id;
        });
        setListContent(removeMovie);

        toast.success("List item deleted!");
      }
    } catch (error) {
      toast.error("Error deleting content");
      console.log(error);
    }
  };

  useEffect(() => {
    const getList = async () => {
      try {
        let response = await getListById(listId.id);
        setList(response);
      } catch (error) {
        console.log(error);
      }
    };

    getList();
  }, [listId.id]);

  useEffect(() => {
    const getListContent = async () => {
      console.log("in listcontent");
      try {
        setLoading(true);
        if (list) {
          let content = [];
          for (let i = 0; i < list.content.length; i++) {
            let response = await getMoviesById(list.content[i]);
            content.push(response);
          }
          setListContent(content);
          console.log(listContent);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getListContent();
  }, [list]);

  useEffect(() => {
    const getAllItems = async () => {
      try {
        if (list.type === "movie") {
          let resposne = await getMovies();
          setContent(resposne);
        }

        if (list.type === "series") {
          let resposne = await getSeries();
          setContent(resposne);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAllItems();
  }, [list]);

  const onCheckBoxChange = (e) => {
    let label = e.target.name;
    let value = e.target.value;
    if (e.target.checked) {
      setContentTobeAddedinList((prev) => [...prev, value]);
      setSelectContent((prev) => [...prev, label]);
    } else {
      let newArray = contentTobeAddedInList.filter((contentId) => {
        return contentId !== value;
      });
      setContentTobeAddedinList(newArray);
      let newArrayLabel = selectedContent.filter((ContentLabel) => {
        return ContentLabel !== label;
      });
      setSelectContent(newArrayLabel);
    }
  };

  const AddListItem = async () => {
    try {
      if (!contentTobeAddedInList.length > 0) {
        setOpenDialog(false);
        toast.error("No Items Selected!");
      } else {
        setOpenDialog(false);
        setLoading(true);
        let dataToBeSent = {
          id: listId.id,
          content: contentTobeAddedInList,
        };

        let response = await addListItems(dataToBeSent);

        let map = new Map();
        for (let i = 0; i < dataToBeSent.content.length; i++) {
          map.set(dataToBeSent.content[i], true);
        }

        for (let i = 0; i < content.length; i++) {
          if (map.has(content[i]._id)) {
            setListContent((prev) => [...prev, content[i]]);
          }
        }
        toast.success("List Items Added!");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
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
    {
      field: "title",
      headerName: "Content Name",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="movieListItem">
            <img className="movieListImg" src={params.row.imgTitle} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Genre", width: 120 },
    { field: "year", headerName: "Year", width: 120 },
    { field: "limit", headerName: "Limit", width: 120 },
    { field: "type", headerName: "Type", width: 120 },

    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline
              className="movieListDelete"
              onClick={() => handleDelete(params.row._id, params.row.type)}
            />
          </>
        );
      },
    },
  ];

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

      <div className="productTitleContainer">
        <h1 className="productTitle">Add/Remove List Content</h1>

        <button
          className="listItemAddButton"
          onClick={() => {
            openModal();
          }}
        >
          Add List Item
        </button>
      </div>
      <div className="listContentList">
        {!loading ? (
          <DataGrid
            rows={listContent[0] ? listContent : []}
            disableSelectionOnClick
            columns={columns}
            pageSize={8}
            getRowId={(r) => r._id}
            components={{ Toolbar: GridToolbarFilterButton }}
          />
        ) : (
          <div className="listItemloaderContainer">
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
          setContentTobeAddedinList([]);
          setSelectContent([]);
        }}
        fullWidth="true"
        scroll="paper"
      >
        <DialogTitle id="dialog-title">Add List Item</DialogTitle>
        <DialogContent>
          <div className="AddToListContent">
            <div className="AddToListContentLeft">
              {content
                ? content.map((movie) => (
                    <FormControlLabel
                      label={movie.title}
                      value={movie._id}
                      name={movie.title}
                      control={
                        <Checkbox
                          onChange={(e) => {
                            onCheckBoxChange(e);
                          }}
                        />
                      }
                    />
                  ))
                : ""}
            </div>
            <div className="AddToListContentRight">
              <h3>Selected Content</h3>
              {selectedContent.map((item) => (
                <div className="selectedContentDisplay">{item}</div>
              ))}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDialog(false);
              setContentTobeAddedinList([]);
              setSelectContent([]);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              AddListItem();
              setSelectContent([]);
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
