import * as yup from "yup";

export const userSchema = yup.object({
  _id: yup.string().required(),
  fullName: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  bloodGroup: yup.string().required(),
  district: yup.string().required(),
  role: yup
    .string()
    .oneOf(["donor", "requester", "admin"])
    .required(),
  isAvailable: yup.boolean().required(),
  lastDonationDate: yup.string().nullable().defined(),

  profile_image: yup
    .object({
      path: yup.string().required(),
      public_id: yup.string().required(),
    })
    .optional(),
});