import { axiosInstance } from "../utilities/axiosHelper";
import { getAuthHeader } from "../utilities/authTools";

export const getEpisodes = async (values) => {
  let response = await axiosInstance.post(
    "episode/getall",
    values,
    getAuthHeader()
  );
  return response.data;
};

export const addEpisode = async (values) => {
  let response = await axiosInstance.post(
    "episode/addepisode",
    values,
    getAuthHeader()
  );
  return response.data;
};

export const deleteEpisode = async (values) => {
  let response = await axiosInstance.post(
    "episode/deleteepisode",
    values,
    getAuthHeader()
  );
  return response.data;
};
