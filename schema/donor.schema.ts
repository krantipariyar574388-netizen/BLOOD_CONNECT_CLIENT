import * as yup from "yup";

export const donorItemSchema = yup.object({
  _id: yup.string().required(),
  fullName: yup.string().required(),
  bloodGroup: yup.string().required(),
  district: yup.string().required(),
  phone: yup.string().required(),
  isAvailable: yup.boolean().required(),
  lastDonationDate: yup.string().nullable().defined(),
});