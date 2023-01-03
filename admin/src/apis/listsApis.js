import { axiosInstance } from "../utilities/axiosHelper";
import { getAuthHeader } from "../utilities/authTools";

export const getLists = async (values) => {
  let response = await axiosInstance.get("lists/getlists", getAuthHeader());
  return response.data;
};

export const deleteLists = async (values) => {
  let response = await axiosInstance.post(
    "lists/deletelist",
    values,
    getAuthHeader()
  );
  return response.data;
};

export const getListById = async (values) => {
  let response = await axiosInstance.get(
    `lists/getlistbyid/${values}`,
    getAuthHeader()
  );
  return response.data;
};

export const addList = async (values) => {
  let response = await axiosInstance.post(
    "lists/addlist",
    values,
    getAuthHeader()
  );
  return response.data;
};

export const deleteListItem = async (values) => {
  let response = await axiosInstance.post(
    "lists/removeitem",
    values,
    getAuthHeader()
  );

  return response.data;
};

export const addListItems = async (values) => {
  let response = await axiosInstance.post(
    "lists/additem",
    values,
    getAuthHeader()
  );

  return response.data;
};
