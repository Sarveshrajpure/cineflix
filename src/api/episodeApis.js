import { axiosInstance } from "../utilities/axiosHelper";
import { getAuthHeader } from "../utilities/authTools";

export const getAllEpisodes = async (values) => {
  console.log(values);
  let response = await axiosInstance.post(
    "episode/getall",
    values,
    getAuthHeader()
  );

  return response.data;
};
