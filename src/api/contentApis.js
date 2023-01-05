import { axiosInstance } from "../utilities/axiosHelper";
import { getAuthHeader } from "../utilities/authTools";

export const getContentById = async (values) => {
  let response = await axiosInstance.get(
    `/content/get/${values}`,
    getAuthHeader()
  );

  return response.data;
};

export const getRandomContent = async (values) => {
  let response = await axiosInstance.get(
    `/content/randomContent${values}`,
    getAuthHeader()
  );

  return response.data;
};
