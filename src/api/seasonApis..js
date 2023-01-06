import { axiosInstance } from "../utilities/axiosHelper";
import { getAuthHeader } from "../utilities/authTools";

export const getAllSeasons = async (values) => {
  console.log(values);
  let response = await axiosInstance.post(
    "season/getall",
    values,
    getAuthHeader()
  );

  return response.data;
};
