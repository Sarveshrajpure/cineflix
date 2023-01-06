import { axiosInstance } from "../utilities/axiosHelper";
import { getAuthHeader } from "../utilities/authTools";

export const getAllseasonsByContentId = async (values) => {
  let response = await axiosInstance.post(
    "season/getall",
    values,
    getAuthHeader()
  );
  return response.data;
};

export const getAllseasonsById = async (values) => {
  let response = await axiosInstance.post(
    "season/getseasonbyid",
    values,
    getAuthHeader()
  );
  return response.data;
};

export const addSeason = async (values) => {
  let response = await axiosInstance.post(
    "season/addseason",
    values,
    getAuthHeader()
  );
  return response.data;
};

export const deleteSeasonById = async (values) => {
  let response = await axiosInstance.post(
    "season/deleteseason",
    values,
    getAuthHeader()
  );
  return response.data;
};
