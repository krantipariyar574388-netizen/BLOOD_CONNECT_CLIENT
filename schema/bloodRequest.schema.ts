import * as yup from "yup";
import { BLOOD_GROUP_OPTIONS } from "@/constants/bloodGroup";
import { URGENCY_OPTIONS } from "@/constants/urgency";

export const bloodRequestSchema = yup.object({
  patient: yup.string().required("Patient name is required."),

  bloodGroup: yup
    .string()
    .oneOf(BLOOD_GROUP_OPTIONS.map((o) => o.value), "Invalid blood group")
    .required("Blood group is required."),

  units: yup
    .number()
    .typeError("Units must be a number")
    .min(1, "At least 1 unit is required")
    .required("Units required is required."),

  hospital: yup.string().required("Hospital name is required."),

  district: yup.string().required("District is required."),

  phone: yup
    .string()
    .matches(/^\d+$/, {
      message: "phone must contain only numbers",
      excludeEmptyString: true,
    })
    .test("test-length", "phone must contain 10 digits", (value) => {
      if (value && value.trim().length === 10) return true;
    })
    .required("Contact phone number is required."),

  requiredDate: yup.string().required("Required date is required."),

  urgency: yup
    .string()
    .oneOf(URGENCY_OPTIONS.map((o) => o.value), "Invalid urgency")
    .required("Urgency is required."),

  medicalDocument: yup
    .mixed<FileList>()
    .test(
      "required",
      "Medical document / prescription is required",
      (value) => !!value && value.length > 0
    )
    .test(
      "fileSize",
      "File must be smaller than 5MB",
      (value) =>
        !value || value.length === 0 || value[0].size <= 5 * 1024 * 1024
    ),
});