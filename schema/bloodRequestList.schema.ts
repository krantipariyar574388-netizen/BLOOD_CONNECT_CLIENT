import * as yup from "yup";

export const bloodRequestItemSchema = yup.object({
  _id: yup.string().required(),
  patient: yup.string().required(),
  bloodGroup: yup.string().required(),
  units: yup.number().required(),
  hospital: yup.string().required(),
  district: yup.string().required(),
  phone: yup.string().required(),
  requiredDate: yup.string().required(),
  urgency: yup
    .string()
    .oneOf(["low", "medium", "high", "critical"])
    .required(),
  status: yup
    .string()
    .oneOf(["Pending", "Fulfilled", "Cancelled"])
    .required(),

  requester: yup.object({
    _id: yup.string().required(),
    name: yup.string().optional(),
    email: yup.string().optional(),
    phone: yup.string().optional(),
  }),

  createdAt: yup.string().required(),
});