import { axiosInstance } from "../utilities/axiosHelper";
import { getAuthHeader } from "../utilities/authTools";

export const getRandomLists = async (values) => {
  console.log(values);
  let response = await axiosInstance.get(`/lists/getlists/${values}`, {
    headers: {
      authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzIyZTBlNzI5ODVmOGUwYzgyNTNlMSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3MTQ2MTUwMCwiZXhwIjoxNjcxODkzNTAwfQ.87FRZVV9t6E4ZeEsR6765ud4Xv136lEz0hPJRfoRZeI",
    },
  });

  return response.data;
};
