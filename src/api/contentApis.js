import { axiosInstance } from "../utilities/axiosHelper";
import { getAuthHeader } from "../utilities/authTools";

export const getContentById = async (values) => {
  let response = await axiosInstance.get(`/content/get/${values}`, {
    headers: {
      authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzIyZTBlNzI5ODVmOGUwYzgyNTNlMSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3MDQ0MTI0NywiZXhwIjoxNjcwODczMjQ3fQ.xZk0x3qK8zWJw6Qiiht93-0asLqlDLGCTEe_4FTO7Yw",
    },
  });

  return response.data;
};

export const getRandomContent = async (values) => {
  let response = await axiosInstance.get(`/content/randomContent${values}`, {
    headers: {
      authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzIyZTBlNzI5ODVmOGUwYzgyNTNlMSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3MDQ0MTI0NywiZXhwIjoxNjcwODczMjQ3fQ.xZk0x3qK8zWJw6Qiiht93-0asLqlDLGCTEe_4FTO7Yw",
    },
  });

  return response.data;
};
