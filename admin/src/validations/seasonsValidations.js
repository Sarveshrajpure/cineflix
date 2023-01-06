import * as yup from "yup";

export const addSeasonSchema = yup.object().shape({
  title: yup.string().required("Title required!"),
  contentId: yup.string().required("ContentId required!"),
});
