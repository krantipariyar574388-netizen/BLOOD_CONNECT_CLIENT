import * as yup from "yup";

// Login schema
export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format.")
    .required("Email is required."),
  password: yup.string().required("Password is required."),
});

// Register schema
export const registerSchema = yup.object({
  fullName: yup.string().required("Full name is required."),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required."),
  password: yup.string().required("Password is required."),
  cpassword: yup.string().required("Confirm password is required."),
  phone: yup.string().required("Phone number is required."),
});
