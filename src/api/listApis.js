import { axiosInstance } from "../utilities/axiosHelper";
import { getAuthHeader } from "../utilities/authTools";

export const getRandomLists = async (values) => {
  console.log(values);
  let response = await axiosInstance.get(
    `/lists/getlists/${values}`,
    getAuthHeader()
  );

  return response.data;
};
