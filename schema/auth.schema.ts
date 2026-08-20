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
  password: yup
    .string()
    .min(6, "At least 6 characters required")
    .matches(/[A-Z]/, "At least one uppercase is required")
    .matches(/[a-z]/, "At least one lowercase is required")
    .matches(/[0-9]/, "At least one number is required")
    .matches(/[@!#%&*]/, "At least one special character is required")
    .required("Password is required."),
  cpassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password does not matched")
    .required("Confirm password is required."),
  phone: yup
    .string()
    .matches(/^\d+$/, {
      message: "phone must contain only numbers",
      excludeEmptyString: true,
    })
    .test("test-length", "phone must contain 10 digits", (value) => {
      if (value && value.trim().length === 10) {
        return true;
      }
    })
    .required("Phone number is required."),
});
