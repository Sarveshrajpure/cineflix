import * as yup from "yup";
const FILE_SIZE_VIDEO = 1100 * 1048576;
const SUPPORTED_FORMATS_VIDEO = ["video/mp3", "video/mp4"];

export const addEpisodeFilesSchema = yup.object().shape({
  title: yup.string().max(100).required("Episode title required"),
  desc: yup.string().max(500).required("Description required"),
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
});

export const createEpisodeSchema = yup.object().shape({
  title: yup.string().max(100).required("Content title required"),
  desc: yup.string().max(500).required("Description required"),
  video: yup.string().required("Video required!"),
  seasonId: yup.string().required(),
});
