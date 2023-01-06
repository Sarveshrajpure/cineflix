import "./movieList.css";
import { DataGrid, GridToolbarFilterButton } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { getMovies, deleteMovie } from "../../apis/contentApis";
import { useDispatch } from "react-redux";
import { get_movies, delete_movies } from "../../Actions/contentActions";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function MovieList() {
  const dispatch = useDispatch();
  const movie = useSelector((state) =>
    state.Content.movies ? state.Content.movies : []
  );

  const handleDelete = async (id, type) => {
    try {
      // eslint-disable-next-line no-unused-vars
      let response = await deleteMovie({ content_id: id, type: "movie" });

      toast.success("Content deleted!");
      let removeMovie = movie.filter((movie) => {
        return movie._id !== id;
      });
      dispatch(delete_movies(removeMovie));
    } catch (error) {
      toast.error("Error deleting content");
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let response = await getMovies();
        console.log(response);
        dispatch(get_movies(response));
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovies();
  }, [dispatch]);

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
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/movie/" + params.row._id}>
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
        <h1 className="contentTitle">Content</h1>
        <Link to="/addcontent">
          <button className="contentAddButton">Add content</button>
        </Link>
      </div>
      {movie[0] ? (
        <DataGrid
          rows={movie}
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
