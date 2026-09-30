import * as yup from "yup";

export const adminUserItemSchema = yup.object({
  _id: yup.string().required(),
  fullName: yup.string().required(),
  email: yup.string().required(),
  phone: yup.string().required(),
  bloodGroup: yup.string().required(),
  district: yup.string().required(),
  role: yup.string().oneOf(["donor", "requester", "admin"]).required(),
  isAvailable: yup.boolean().required(),
  isBanned: yup.boolean().required(),
  createdAt: yup.string().required(),
});

export const adminStatsSchema = yup.object({
  totalUsers: yup.number().required(),
  totalDonors: yup.number().required(),
  totalRequesters: yup.number().required(),
  pendingRequests: yup.number().required(),
  fulfilledRequests: yup.number().required(),
});