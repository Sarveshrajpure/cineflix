import { axiosInstance } from "../utilities/axiosHelper";

import {
  getTokenCookie,
  getAuthHeader,
  removeTokenCookie,
} from "../utilities/authTools.js";

export const getProfile = async (values) => {
  const profile = await axiosInstance.post(
    "profile/getprofile",
    {
      userId: values.id,
    },
    getAuthHeader()
  );

  return profile.data;
};

export const editProfile = async (values) => {
  const profile = await axiosInstance.post(
    "profile/editprofile",
    {
      name: values.name,
      profileId: values.id,
    },
    getAuthHeader()
  );

  return profile.data;
};

export const addProfile = async (values) => {
  const profile = await axiosInstance.post(
    "profile/addprofile",
    {
      name: values.name,
      userId: values.id,
    },
    getAuthHeader()
  );

  return profile.data;
};

export const deleteProfile = async (values) => {
  const profile = await axiosInstance.post(
    "profile/deleteprofile",
    {
      name: values.name,
      userId: values.userId,
      profileId: values.id,
    },
    getAuthHeader()
  );

  return profile.data;
};

export const addToFavourite = async (values) => {
  console.log(values);
  const profile = await axiosInstance.post(
    "profile/addtofavourite",
    {
      profileId: values.id,
      contentId: values.contentId,
    },
    getAuthHeader()
  );

  return profile.data;
};

export const removeFavourite = async (values) => {
  console.log(values);
  const profile = await axiosInstance.post(
    "profile/removefavourite",
    {
      profileId: values.id,
      contentId: values.contentId,
    },
    getAuthHeader()
  );

  return profile.data;
};
