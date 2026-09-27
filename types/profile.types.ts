import { updateProfileSchema, changePasswordSchema } from "@/schema/profile.schema";
import * as yup from "yup";

export type TUpdateProfile = yup.InferType<typeof updateProfileSchema>;
export type TChangePassword = yup.InferType<typeof changePasswordSchema>;