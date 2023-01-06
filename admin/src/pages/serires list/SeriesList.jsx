import "./seriesList.css";
import { DataGrid, GridToolbarFilterButton } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { getSeries, deleteMovie } from "../../apis/contentApis";
import { useDispatch } from "react-redux";
import { get_series, delete_movies } from "../../Actions/contentActions";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function SeriesList() {
  const dispatch = useDispatch();
  const series = useSelector((state) =>
    state.Content.series ? state.Content.series : []
  );

  const handleDelete = async (id, type) => {
    try {
      let response = await deleteMovie({ content_id: id, type: "series" });

      toast.success("Content deleted!");
      let removeMovie = series.filter((series) => {
        return series._id !== id;
      });
      dispatch(delete_movies(removeMovie));
    } catch (error) {
      toast.error("Error deleting content");
      console.log(error);
    }

    // setData(data.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let response = await getSeries();
        dispatch(get_series(response));
      } catch (error) {}
    };

    fetchMovies();
  }, []);

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
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
    { field: "genre", headerName: "Genre", width: 110 },
    { field: "year", headerName: "Year", width: 110 },
    { field: "limit", headerName: "Limit", width: 110 },
    { field: "type", headerName: "Type", width: 110 },

    {
      field: "action",
      headerName: "Action",
      width: 250,

      renderCell: (params) => {
        return (
          <>
            <Link to={"/singleSeries/" + params.row._id}>
              <button className="movieListEdit">Edit</button>
            </Link>

            <Link to={"/editseasons/" + params.row._id}>
              <button className="seriesListAddRemove">Seasons</button>
            </Link>
            <Link to={"/editepisodes/" + params.row._id}>
              <button className="seriesListAddRemove">Episodes</button>
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
        <h1 className="contentTitle">Tv Series</h1>
        <Link to="/addseries">
          <button className="contentAddButton">Add Series</button>
        </Link>
      </div>
      {series[0] ? (
        <DataGrid
          rows={series}
          rowHeight={90}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          getRowId={(r) => r._id}
          components={{ Toolbar: GridToolbarFilterButton }}
          sx={{ border: 5 }}
        />
      ) : (
        ""
      )}
    </div>
  );
}
