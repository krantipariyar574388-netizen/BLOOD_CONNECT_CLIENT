import { userSchema } from "@/schema/user.schema";
import * as yup from "yup";

export type TUser = yup.InferType<typeof userSchema>;