import { axiosInstance } from "../utilities/axiosHelper";
import { getAuthHeader, getTokenCookie } from "../utilities/authTools";

export const getMovies = async () => {
  let response = await axiosInstance.get(
    "content/getallmovies",
    getAuthHeader()
  );
  return response.data;
};

export const getSeries = async () => {
  let response = await axiosInstance.get(
    "content/getallseries",
    getAuthHeader()
  );
  return response.data;
};

export const getAllContent = async () => {
  let response = await axiosInstance.get(
    "content/getall",

    getAuthHeader()
  );
  return response.data;
};

export const getMoviesById = async (values) => {
  let response = await axiosInstance.get(
    `content/get/${values}`,
    getAuthHeader()
  );
  return response.data;
};

export const deleteMovie = async (values) => {
  let response = await axiosInstance.post(
    "content/deletecontent",
    values,
    getAuthHeader()
  );
  return response.data;
};

export const addContent = async (values) => {
  let response = await axiosInstance.post(
    "content/addcontent",
    values,
    getAuthHeader()
  );
  return response.data;
};
