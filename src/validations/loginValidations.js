import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid Email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is Required")
    .min(6, "Password must be at least 6 characters"),
});
