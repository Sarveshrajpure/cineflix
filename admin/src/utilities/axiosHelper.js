import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "/api",
});

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Cache-Control"] = "no-cahce";
