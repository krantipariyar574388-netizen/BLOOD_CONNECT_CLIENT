import * as yup from "yup";

export const notificationItemSchema = yup.object({
  _id: yup.string().required(),
  recipient: yup.string().required(),
  type: yup
    .string()
    .oneOf(["new_request", "request_fulfilled", "request_cancelled"])
    .required(),
  message: yup.string().required(),
  isRead: yup.boolean().required(),
  bloodRequest: yup
    .object({
      _id: yup.string().required(),
      patient: yup.string().optional(),
      hospital: yup.string().optional(),
      bloodGroup: yup.string().optional(),
      status: yup.string().optional(),
    })
    .nullable()
    .optional(),
  createdAt: yup.string().required(),
});