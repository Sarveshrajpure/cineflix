import * as yup from "yup";
const FILE_SIZE = 15 * 1048576;
const FILE_SIZE_VIDEO = 1100 * 1048576;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
const SUPPORTED_FORMATS_VIDEO = ["video/mp3", "video/mp4"];

export const addContentSchema = yup.object().shape({
  title: yup.string().max(100).required("Content title required"),
  desc: yup.string().max(500).required("Description required"),
  img: yup
    .mixed()
    .required("A image file is required")
    .test("fileSize", "File size should be less then 15mb", (value) => {
      if (!value.length) return false;
      return value[0].size <= FILE_SIZE;
    })
    .test("fileFormat", "Unsupported Format", (value) => {
      if (!value.length) return false;
      return SUPPORTED_FORMATS.includes(value[0].type);
    }),
  imgTitle: yup
    .mixed()
    .required("A image file is required")
    .test("fileSize", "File size should be less then 15mb", (value) => {
      if (!value.length) return false;
      return value[0].size <= FILE_SIZE;
    })
    .test("fileFormat", "Unsupported Format", (value) => {
      if (!value.length) return false;
      return SUPPORTED_FORMATS.includes(value[0].type);
    }),
  imgSm: yup
    .mixed()
    .required("A image file is required")
    .test("fileSize", "File size should be less then 15mb", (value) => {
      if (!value.length) return false;
      return value[0].size <= FILE_SIZE;
    })
    .test("fileFormat", "Unsupported Format", (value) => {
      if (!value.length) return false;
      return SUPPORTED_FORMATS.includes(value[0].type);
    }),
  trailer: yup
    .mixed()
    .required("Trailer required")
    .test("fileSize", "File size should be less then 1gb", (value) => {
      if (!value.length) return false;
      return value[0].size <= FILE_SIZE_VIDEO;
    })
    .test("fileFormat", "Unsupported Format", (value) => {
      if (!value.length) return false;
      return SUPPORTED_FORMATS_VIDEO.includes(value[0].type);
    }),
  video: yup
    .mixed()
    .required("Video required")
    .test("fileSize", "File size should be less then 1gb", (value) => {
      if (!value.length) return false;
      return value[0].size <= FILE_SIZE_VIDEO;
    })
    .test("fileFormat", "Unsupported Format", (value) => {
      if (!value.length) return false;
      return SUPPORTED_FORMATS_VIDEO.includes(value[0].type);
    }),
  year: yup.string().required("year required"),
  limit: yup.string().max(10).required("Age Limit required"),
  duration: yup.string().max(10),
  genre: yup.string().required("Genre required"),
  type: yup.string().max(10).required("Content type required"),
});

export const createContentSchema = yup.object().shape({
  title: yup.string().max(100).required("Content title required"),
  desc: yup.string().max(500).required("Description required"),
  img: yup.string(),
  imgTitle: yup.string(),
  imgSm: yup.string(),
  trailer: yup.string(),
  video: yup.string(),
  year: yup.string().required("year required"),
  limit: yup.string().max(10).required("Age Limit required"),
  duration: yup.string().max(10),
  genre: yup.string().required("Genre required"),
  type: yup.string().max(10).required("Content type required"),
});
