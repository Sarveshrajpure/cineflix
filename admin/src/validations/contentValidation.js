import * as yup from "yup";
const FILE_SIZE = 15 * 1048576;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
export const addContentSchema = yup.object().shape({
  title: yup.string().max(100).required("Content title required"),
  desc: yup.string().max(500).required("Description required"),
  img: yup
    .mixed()
    .required("A file is required")
    .test(
      "fileSize",
      "File size should be less then 15mb",
      (value) => value && value[0].size <= FILE_SIZE
    )
    .test(
      "fileFormat",
      "Unsupported Format",
      (value) => value && SUPPORTED_FORMATS.includes(value[0].type)
    ),
  imgTitle: yup.string().required("Title image title required"),
  imgSm: yup.string().required("Thumbnail image title required"),
  trailer: yup.string().required("Trailer required"),
  video: yup.string().required("Video title required"),
  year: yup.string().required("year required"),
  limit: yup.string().max(10).required("Age Limit required"),
  duration: yup.string().max(10),
  genre: yup.string().required("Genre required"),
  type: yup.string().max(10).required("Content type required"),
});
