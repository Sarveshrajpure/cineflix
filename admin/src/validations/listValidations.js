import * as yup from "yup";

export const addListSchema = yup.object().shape({
  title: yup.string().max(100).required("List title required"),
  genre: yup.string().required("Genre required"),
  type: yup.string().max(10).required("Content type required"),
  content: yup.array().required("Content required"),
});
