import * as yup from "yup";

export const updateProfileSchema = yup.object({
  fullName: yup.string().required("Full name is required."),
  phone: yup
    .string()
    .matches(/^\d+$/, {
      message: "phone must contain only numbers",
      excludeEmptyString: true,
    })
    .test("test-length", "phone must contain 10 digits", (value) => {
      if (value && value.trim().length === 10) return true;
    })
    .required("Phone number is required."),
  district: yup.string().required("District is required."),
});

export const changePasswordSchema = yup.object({
  oldPassword: yup.string().required("Old password is required."),
  newPassword: yup
    .string()
    .min(6, "At least 6 characters required")
    .matches(/[A-Z]/, "At least one uppercase is required")
    .matches(/[a-z]/, "At least one lowercase is required")
    .matches(/[0-9]/, "At least one number is required")
    .matches(/[@!#%&*]/, "At least one special character is required")
    .required("New password is required."),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Password does not matched")
    .required("Confirm password is required."),
});