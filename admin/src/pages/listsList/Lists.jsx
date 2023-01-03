import "./lists.css";
import { DataGrid, GridToolbarFilterButton } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getLists, deleteLists } from "../../apis/listsApis";
import { useDispatch } from "react-redux";
import { delete_Lists, get_Lists } from "../../Actions/listActions";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function List() {
  const dispatch = useDispatch();
  const lists = useSelector((state) => (state.List ? state.List.lists : []));

  const handleDelete = async (id, type) => {
    try {
      let response = await deleteLists({ id: id });

      toast.success("Content deleted!");
      let removeList = lists.filter((list) => {
        return list._id !== id;
      });
      dispatch(delete_Lists(removeList));
    } catch (error) {
      toast.error("Error deleting content");
      console.log(error);
    }

    // setData(data.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const fetchLists = async () => {
      try {
        let response = await getLists();

        dispatch(get_Lists(response));
      } catch (error) {}
    };

    fetchLists();
  }, [dispatch]);
  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    { field: "title", headerName: "Title", width: 250 },
    { field: "genre", headerName: "Genre", width: 120 },
    { field: "type", headerName: "Type", width: 120 },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/list/" + params.row._id}>
              <button className="movieListEdit">Edit</button>
            </Link>
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
    <div className="movieList">
      <div className="contentTitleContainer">
        <h1 className="contentTitle">Lists</h1>
        <Link to="/addlist">
          <button className="contentAddButton">Add List</button>
        </Link>
      </div>

      {lists ? (
        <DataGrid
          rows={lists}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          getRowId={(r) => r._id}
          components={{ Toolbar: GridToolbarFilterButton }}
        />
      ) : (
        ""
      )}
    </div>
  );
}
