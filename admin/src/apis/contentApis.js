import { axiosInstance } from "../utilities/axiosHelper";
import { getAuthHeader, getTokenCookie } from "../utilities/authTools";

export const getMovies = async (values) => {
  let response = await axiosInstance.post(
    "content/getall",
    {},
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
